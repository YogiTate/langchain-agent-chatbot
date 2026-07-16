from langchain_core.tools import tool


@tool
def calculator(expression: str) -> str:
    """
    Use this tool whenever mathematical calculations are required.
    Example:
    25 * 40
    100 / 4
    """

    try:
        allowed = "0123456789+-*/(). "

        if not all(c in allowed for c in expression):
            return "Invalid mathematical expression."

        result = eval(expression)

        return str(result)

    except Exception as e:
        return f"Calculation failed: {str(e)}"


TOOLS = [calculator]

TOOLS_MAP = {
    tool.name: tool
    for tool in TOOLS
}