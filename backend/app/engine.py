import json

from langchain_core.messages import (
    HumanMessage,
    ToolMessage,
    SystemMessage
)

from app.tools import TOOLS, TOOLS_MAP

from app.database import (
    get_history,
    save_messages
)

from app.providers import get_model


# =========================================================
# SYSTEM PROMPT
# =========================================================

SYSTEM_PROMPT = """
You are an AI Agent.

Answer clearly and concisely.

You can use available tools when required.

If mathematical calculations are required,
always use the calculator tool.

Do not perform calculations mentally when
the calculator tool is available.
"""


# =========================================================
# RUN AGENT
# =========================================================

async def run_agent(
    session_id: str,
    user_input: str,
    provider: str
):

    trace = []


    # =====================================================
    # MEMORY
    # =====================================================

    history = get_history(
        session_id
    )

    trace.append({
        "stage": "memory",
        "detail": (
            f"{len(history)} messages loaded"
        )
    })


    # =====================================================
    # PROVIDER
    # =====================================================

    trace.append({
        "stage": "provider",
        "detail": (
            f"Selected provider: {provider}"
        )
    })


    # =====================================================
    # CREATE MODEL
    # =====================================================

    try:

        llm = get_model(
            provider
        )

    except Exception as error:

        trace.append({
            "stage": "error",
            "detail": str(error)
        })

        raise


    # =====================================================
    # BIND TOOLS
    # =====================================================

    model = llm.bind_tools(
        TOOLS
    )


    # =====================================================
    # BUILD MESSAGES
    # =====================================================

    messages = [

        SystemMessage(
            content=SYSTEM_PROMPT
        ),

        *history,

        HumanMessage(
            content=user_input
        )
    ]


    # =====================================================
    # FIRST LLM CALL
    # =====================================================

    trace.append({
        "stage": "llm",
        "detail": (
            f"Sending prompt to {provider}"
        )
    })


    response = model.invoke(
        messages
    )


    # =====================================================
    # TOOL CALL
    # =====================================================

    if response.tool_calls:

        tool_messages = []


        for tool_call in response.tool_calls:

            tool_name = tool_call["name"]

            tool_args = tool_call["args"]


            # ---------------------------------------------
            # TRACE TOOL REQUEST
            # ---------------------------------------------

            trace.append({
                "stage": "tool_request",

                "detail": (
                    f"{tool_name} -> "
                    f"{json.dumps(tool_args)}"
                )
            })


            # ---------------------------------------------
            # FIND TOOL
            # ---------------------------------------------

            tool = TOOLS_MAP.get(
                tool_name
            )


            if tool is None:

                raise ValueError(
                    f"Unknown tool: {tool_name}"
                )


            # ---------------------------------------------
            # EXECUTE TOOL
            # ---------------------------------------------

            result = tool.invoke(
                tool_args
            )


            # ---------------------------------------------
            # TRACE RESULT
            # ---------------------------------------------

            trace.append({
                "stage": "tool_result",
                "detail": str(result)
            })


            # ---------------------------------------------
            # TOOL MESSAGE
            # ---------------------------------------------

            tool_messages.append(

                ToolMessage(
                    content=str(result),

                    tool_call_id=tool_call["id"]
                )
            )


        # =================================================
        # FINAL LLM CALL
        # =================================================

        final_messages = (

            messages

            + [response]

            + tool_messages
        )


        trace.append({
            "stage": "llm",
            "detail": (
                "Generating final response "
                "after tool execution"
            )
        })


        final_response = model.invoke(
            final_messages
        )


        answer = final_response.content


        # =================================================
        # SAVE
        # =================================================

        save_messages(

            session_id,

            [
                HumanMessage(
                    content=user_input
                ),

                response,

                *tool_messages,

                final_response
            ]
        )


    # =====================================================
    # NORMAL RESPONSE
    # =====================================================

    else:

        answer = response.content


        save_messages(

            session_id,

            [
                HumanMessage(
                    content=user_input
                ),

                response
            ]
        )


    # =====================================================
    # COMPLETED
    # =====================================================

    trace.append({
        "stage": "completed",
        "detail": (
            f"Response returned using {provider}"
        )
    })


    return {

        "reply": answer,

        "trace": trace,

        "provider": provider
    }