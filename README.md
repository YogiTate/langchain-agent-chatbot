# 🤖 Agentic AI Chatbot

> A full-stack Agentic AI chatbot built with **LangChain, FastAPI,
> React, Ollama, and SQLite**, demonstrating conversational memory, tool
> calling, local LLM inference, and a modular agent architecture.

![Python](https://img.shields.io/badge/Python-3.12+-3776AB?logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?logo=fastapi&logoColor=white)
![LangChain](https://img.shields.io/badge/LangChain-Agentic%20AI-1C3C3C)
![React](https://img.shields.io/badge/React-Frontend-61DAFB?logo=react&logoColor=black)
![Ollama](https://img.shields.io/badge/Ollama-Local%20LLM-black)
![SQLite](https://img.shields.io/badge/SQLite-Memory%20Store-003B57?logo=sqlite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

## 📌 Overview

This project is a production-oriented **Agentic AI application
prototype** designed to demonstrate how an LLM can interact with tools,
maintain conversational state, and communicate with a modern web
application.

The system separates the **React presentation layer**, **FastAPI
application layer**, and **LangChain/LLM agent layer**, making the
architecture easier to extend with additional tools, agents, models,
APIs, and enterprise integrations.

### 🎯 Project Goals

-   Build an end-to-end Agentic AI application.
-   Understand LangChain's modern agent/tool-calling architecture.
-   Run LLM inference locally using Ollama.
-   Maintain conversation state using SQLite.
-   Expose AI capabilities through a FastAPI backend.
-   Provide a responsive React-based chat interface.
-   Create a modular foundation for future multi-agent and RAG
    capabilities.

------------------------------------------------------------------------

## ✨ Key Features

### 🧠 Agentic AI

-   LLM-powered conversational agent.
-   Tool-aware reasoning and execution.
-   Modular architecture for adding new tools.
-   System prompt/persona configuration.

### 🛠️ Tool Calling

The agent can invoke application-defined tools when required.

Example tools include:

-   🧮 Calculator
-   🕐 Current time utility
-   🔌 Extensible custom tools

The architecture is designed so additional APIs and business tools can
be added without redesigning the entire application.

### 💾 Conversational Memory

-   Conversation state persisted using SQLite.
-   Supports maintaining context across chat interactions.
-   Separates application state from the LLM inference layer.

### ⚡ Local LLM Inference

-   Uses **Ollama** to run compatible LLMs locally.
-   Reduces dependency on paid external inference APIs during
    development.
-   Model can be changed based on local hardware and requirements.

### 🌐 Full-Stack Architecture

-   React frontend for the user experience.
-   FastAPI backend for API and orchestration.
-   LangChain for agent/tool integration.
-   Ollama for local model inference.
-   SQLite for conversation persistence.

### 🔍 Observability

-   Structured application logging.
-   Agent/tool execution can be traced through backend logs.
-   Designed with future LangSmith/AgentOps-style observability in mind.

------------------------------------------------------------------------

## 🏗️ Architecture

``` text
┌──────────────────────────────┐
│          React UI            │
│        Chat Interface        │
└──────────────┬───────────────┘
               │ HTTP / REST
               ▼
┌──────────────────────────────┐
│        FastAPI Backend       │
│                              │
│  API Routes                  │
│  Request Validation          │
│  Conversation Management     │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│       LangChain Agent        │
│                              │
│  Prompt / State              │
│  Tool Calling                │
│  Agent Execution             │
└───────┬──────────┬───────────┘
        │          │
        │          └────────────────┐
        ▼                           ▼
┌───────────────┐           ┌────────────────┐
│    Ollama     │           │     Tools      │
│   Local LLM   │           │ Calculator     │
│               │           │ Time Utility   │
└───────────────┘           │ Custom APIs... │
                            └────────────────┘
        │
        ▼
┌──────────────────────────────┐
│           SQLite             │
│   Conversation / State Data  │
└──────────────────────────────┘
```

### 🔄 Request Flow

``` text
User
  ↓
React Chat Interface
  ↓
FastAPI API
  ↓
LangChain Agent
  ↓
LLM decides whether a tool is required
  ↓
Tool execution (if required)
  ↓
LLM generates final response
  ↓
Conversation state stored
  ↓
Response returned to React
```

------------------------------------------------------------------------

## 🧰 Tech Stack

  Layer                  Technology
  ---------------------- -----------------
  Frontend               React
  Backend                Python, FastAPI
  AI Orchestration       LangChain
  LLM Runtime            Ollama
  Agent Capability       Tool Calling
  Memory / Persistence   SQLite
  API Communication      REST / HTTP
  Development            Git, GitHub
  Future Deployment      Docker / Cloud

------------------------------------------------------------------------

## 📁 Project Structure

``` text
langchain-agent-chatbot/
│
├── backend/
│   ├── ...
│   └── ...
│
├── frontend/
│   ├── ...
│   └── ...
│
├── README.md
└── .gitignore
```

> The exact files may evolve as the application is expanded. The backend
> and frontend are intentionally separated to keep the system modular.

------------------------------------------------------------------------

# 🚀 Getting Started

## 1. Prerequisites

Install the following:

-   Python 3.12+
-   Node.js 18+
-   npm
-   Git
-   Ollama

Verify installations:

``` bash
python --version
node --version
npm --version
git --version
ollama --version
```

------------------------------------------------------------------------

## 2. Clone the Repository

``` bash
git clone https://github.com/YogiTate/langchain-agent-chatbot.git
cd langchain-agent-chatbot
```

------------------------------------------------------------------------

# 🧠 Backend Setup

Navigate to the backend:

``` bash
cd backend
```

Create a virtual environment:

### Windows

``` bash
python -m venv venv
venv\Scripts\activate
```

### macOS / Linux

``` bash
python3 -m venv venv
source venv/bin/activate
```

Install dependencies:

``` bash
pip install -r requirements.txt
```

Start the FastAPI server:

``` bash
uvicorn main:app --reload
```

The API should be available at:

``` text
http://localhost:8000
```

FastAPI documentation:

``` text
http://localhost:8000/docs
```

> If your backend entry file or startup command is different, update the
> command above to match the repository.

------------------------------------------------------------------------

# 🦙 Ollama Setup

Install Ollama and pull a compatible model.

Example:

``` bash
ollama pull <your-model>
```

Run Ollama:

``` bash
ollama serve
```

The application can then communicate with the local Ollama runtime.

> Replace `<your-model>` with the model configured in the backend.

------------------------------------------------------------------------

# ⚛️ Frontend Setup

Open another terminal:

``` bash
cd frontend
```

Install dependencies:

``` bash
npm install
```

Start the React application:

``` bash
npm start
```

The frontend will normally be available at:

``` text
http://localhost:3000
```

------------------------------------------------------------------------

# 🔌 API / Backend Responsibilities

The FastAPI backend is responsible for:

1.  Receiving chat requests from React.
2.  Managing conversation/session state.
3.  Passing user input to the LangChain agent.
4.  Providing tools that the agent can invoke.
5.  Communicating with Ollama.
6.  Persisting conversation state.
7.  Returning the final response to the frontend.
8.  Logging important execution events.

------------------------------------------------------------------------

# 🛠️ Example Tool-Calling Flow

A user might ask:

``` text
What is 125 × 48?
```

Instead of relying only on generated text, the agent can determine that
a calculator tool is appropriate:

``` text
User Request
     ↓
LangChain Agent
     ↓
Tool Selection
     ↓
Calculator Tool
     ↓
Tool Result
     ↓
LLM
     ↓
Final Answer
```

This demonstrates the core idea of **tool-augmented LLM applications**.

------------------------------------------------------------------------

# 🔐 Security & Configuration

Do not commit:

``` text
.env
venv/
node_modules/
__pycache__/
*.db
```

Use environment variables for application-specific configuration and
secrets.

Example:

``` env
OLLAMA_BASE_URL=http://localhost:11434
MODEL_NAME=<your-model>
```

> Never commit API keys, passwords, tokens, or production credentials to
> GitHub.

------------------------------------------------------------------------

# 📊 Current Status

  Component                   Status
  --------------------------- ----------------
  React Chat UI               ✅ Implemented
  FastAPI Backend             ✅ Implemented
  LangChain Integration       ✅ Implemented
  Ollama Integration          ✅ Implemented
  Tool Calling                ✅ Implemented
  SQLite Conversation State   ✅ Implemented
  Structured Logging          🔄 Improving
  Production Deployment       🔄 In Progress
  Live Demo                   🔄 In Progress
  Dockerization               🔄 Planned
  RAG Integration             🔄 Planned
  Multi-Agent Architecture    🔄 Planned

------------------------------------------------------------------------

# 🚀 Roadmap

### Phase 1 --- Core Agent

-   [x] LangChain integration
-   [x] LLM integration
-   [x] Tool calling
-   [x] Conversation state
-   [x] React + FastAPI integration

### Phase 2 --- Production Readiness

-   [ ] Dockerize frontend and backend
-   [ ] Add automated testing
-   [ ] Add improved logging and tracing
-   [ ] Add authentication
-   [ ] Add rate limiting
-   [ ] Deploy backend and frontend

### Phase 3 --- Advanced Agentic AI

-   [ ] LangGraph stateful workflows
-   [ ] Multi-agent orchestration
-   [ ] RAG pipeline
-   [ ] Vector database integration
-   [ ] MCP integration
-   [ ] Agent evaluation framework

### Phase 4 --- Enterprise AI

-   [ ] External API integrations
-   [ ] Role-based access control
-   [ ] Production monitoring
-   [ ] Model evaluation
-   [ ] Cost and latency optimization
-   [ ] Cloud deployment with Docker/Kubernetes

------------------------------------------------------------------------

# 🎓 What This Project Demonstrates

This project demonstrates practical experience with:

-   **Agentic AI architecture**
-   **LLM application development**
-   **LangChain**
-   **Tool calling**
-   **Prompt engineering**
-   **Conversational state**
-   **Local LLM inference**
-   **FastAPI**
-   **React**
-   **REST API integration**
-   **SQLite persistence**
-   **Modular software architecture**
-   **AI application observability**

The architecture is intentionally designed to evolve from a single-agent
chatbot into more advanced **RAG, multi-agent, MCP, and enterprise AI
workflows**.

------------------------------------------------------------------------

# 📸 Demo

> Live demo and application screenshots will be added after deployment.

**Live Application:** Coming soon

**Demo Video:** Coming soon

------------------------------------------------------------------------

# 👨‍💻 Author

### Bala Yogi A

Software Developer \| AI / Agentic AI Engineer

Interested in building practical AI systems using **LLMs, Agentic AI,
RAG, APIs, and modern software engineering practices**.

-   GitHub: https://github.com/YogiTate
-   Project: https://github.com/YogiTate/langchain-agent-chatbot

------------------------------------------------------------------------

# 📄 License

This project is licensed under the MIT License.
