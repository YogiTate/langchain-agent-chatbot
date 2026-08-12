const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://127.0.0.1:8000";


export async function sendMessage(
  sessionId,
  prompt,
  provider = "ollama"
) {

  console.log("================================");
  console.log("AGENT API REQUEST");
  console.log("API URL:", API_URL);
  console.log("Provider:", provider);
  console.log("Session:", sessionId);
  console.log("Prompt:", prompt);
  console.log("================================");


  try {

    const response = await fetch(
      `${API_URL}/api/chat`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          session_id: sessionId,
          message: prompt,
          provider: provider,
        }),
      }
    );


    const responseText =
      await response.text();


    if (!response.ok) {

      console.error(
        "Backend HTTP Error:",
        response.status,
        responseText
      );

      throw new Error(
        `Backend error ${response.status}: ${responseText}`
      );
    }


    const data =
      JSON.parse(responseText);


    console.log(
      "AGENT RESPONSE:",
      data
    );


    return data;

  } catch (error) {

    console.error(
      "Agent request failed:",
      error
    );

    throw error;
  }
}