const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://127.0.0.1:8000";


export async function sendMessage(
  sessionId,
  message,
  provider = "nvidia"
) {

  console.log("================================");
  console.log("AGENT API REQUEST");
  console.log("API URL:", API_URL);
  console.log("Provider:", provider);
  console.log("Session:", sessionId);
  console.log("Message:", message);
  console.log("================================");


  const response = await fetch(
    `${API_URL}/api/chat`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        session_id: sessionId,
        message: message,
        provider: provider,
      }),
    }
  );


  if (!response.ok) {

    const errorText =
      await response.text();

    console.error(
      "Backend error:",
      response.status,
      errorText
    );

    throw new Error(
      `Backend error ${response.status}: ${errorText}`
    );
  }


  return await response.json();
}