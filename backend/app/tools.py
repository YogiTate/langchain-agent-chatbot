from langchain_core.tools import tool


@tool
def calculator(expression: str) -> str:
    """
    Calculate a mathematical expression.
    """

    try:

        allowed = (
            "0123456789+-*/(). "
        )

        if not all(
            c in allowed
            for c in expression
        ):

            return (
                "Invalid mathematical expression."
            )


        result = eval(expression)

        return str(result)


    except Exception as error:

        return (
            f"Calculation failed: {str(error)}"
        )


TOOLS = [
    calculator
]


TOOLS_MAP = {
    tool.name: tool
    for tool in TOOLS
}