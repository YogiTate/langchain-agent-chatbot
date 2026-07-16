import json

from langchain_ollama import ChatOllama
from langchain_core.messages import (
    HumanMessage,
    ToolMessage,
    SystemMessage
)

from app.tools import TOOLS, TOOLS_MAP
from app.database import get_history, save_messages


llm = ChatOllama(
    model="qwen2.5:1.5b",
    temperature=0
)

model = llm.bind_tools(TOOLS)


SYSTEM_PROMPT = """
You are an AI Agent.

You answer clearly and concisely.

If mathematical calculations are required,
always use the calculator tool.
"""


async def run_agent(session_id: str, user_input: str):

    trace = []

    history = get_history(session_id)

    trace.append({
        "stage": "memory",
        "detail": f"{len(history)} messages loaded"
    })

    messages = [
        SystemMessage(content=SYSTEM_PROMPT),
        *history,
        HumanMessage(content=user_input)
    ]

    trace.append({
        "stage": "llm",
        "detail": "Sending prompt to Ollama"
    })

    response = model.invoke(messages)

    # -----------------------------------------
    # TOOL EXECUTION
    # -----------------------------------------

    if response.tool_calls:

        tool_messages = []

        for tool_call in response.tool_calls:

            tool_name = tool_call["name"]
            tool_args = tool_call["args"]

            trace.append({
                "stage": "tool_request",
                "detail": f"{tool_name} -> {json.dumps(tool_args)}"
            })

            tool = TOOLS_MAP[tool_name]

            result = tool.invoke(tool_args)

            trace.append({
                "stage": "tool_result",
                "detail": str(result)
            })

            tool_messages.append(
                ToolMessage(
                    content=str(result),
                    tool_call_id=tool_call["id"]
                )
            )

        final_messages = (
            messages
            + [response]
            + tool_messages
        )

        final_response = model.invoke(final_messages)

        answer = final_response.content

        save_messages(
            session_id,
            [
                HumanMessage(content=user_input),
                response,
                *tool_messages,
                final_response
            ]
        )

    else:
        answer = response.content

        save_messages(
            session_id,
            [
                HumanMessage(content=user_input),
                response
            ]
        )

    trace.append({
        "stage": "completed",
        "detail": "Response returned to frontend"
    })

    return {
        "reply": answer,
        "trace": trace
    }