import axios from "axios";

const API_BASE = "http://127.0.0.1:8000";

const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

export const sendMessage = async (sessionId, message) => {
  try {
    const response = await apiClient.post("/chat", {
      session_id: sessionId,
      message: message.trim(),
    });

    return response.data;
  } catch (error) {
    console.error(
      "API Gateway error processing chat message:",
      error
    );

    throw new Error(
      error.response?.data?.detail ||
      "Connection failure to Agent Core service."
    );
  }
};