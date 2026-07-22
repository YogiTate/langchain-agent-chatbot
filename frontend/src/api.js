import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const sendMessage = async (sessionId, message) => {
  const response = await apiClient.post("/api/chat", {
    sessionId: sessionId,
    prompt: message.trim(),
  });

  return response.data;
};