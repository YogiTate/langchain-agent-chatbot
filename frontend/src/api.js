const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://127.0.0.1:8000";


export async function sendMessage(
  sessionId,
  prompt,
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
        sessionId: sessionId,
        prompt: prompt,
        provider: provider,
      }),
    }
  );


  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `Backend error ${response.status}: ${errorText}`
    );
  }


  return await response.json();
}