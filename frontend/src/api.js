const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:8000";


export async function sendMessage(
  sessionId,
  message,
  provider = "ollama"
) {

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

    throw new Error(
      `Backend error ${response.status}: ${errorText}`
    );

  }


  return await response.json();
}