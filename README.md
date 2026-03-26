# My Profile ChatBot
📌 Overview

This project is a chat-based assistant designed to answer questions about a professional profile, using a multi-layer AI architecture that combines semantic search, reranking, and generative AI.
The system is built to demonstrate how modern Retrieval-Augmented Generation (RAG) pipelines can be implemented in a secure and scalable way, suitable for enterprise environments such as SAP BTP.

🎯 Purpose

The goal of this project is to:
Provide accurate, context-aware answers about a professional profile
Demonstrate a production-style AI architecture beyond simple chatbots
Showcase integration between AI models, databases, and SAP technologies
Serve as a portfolio project for AI + SAP + backend architecture skills

🏗️ Architecture

The system follows a multi-layer intelligent retrieval and validation pipeline:

User (UI5 Chat Interface)
        ↓
SAP Approuter
        ↓
FastAPI Backend
        ↓
Layer 1: PostgreSQL + Embeddings + Cosine Similarity
        ↓
Layer 2: Cross-Encoder Reranking
        ↓
Layer 3: LLM Validation & Generation (Fallback)

⚙️ Technical Design

🔹 Data Layer (PostgreSQL)
Stores structured profile data
Acts as the first layer of knowledge retrieval
Contains preprocessed data for:
Feature extraction
Embedding storage

🔹 Layer 1 — Semantic Retrieval
Model: sentence-transformers/all-mpnet-base-v2
Purpose:
Convert user questions into embeddings
Compare against stored embeddings using cosine similarity
Output:
Top-N most relevant candidates from the database

🔹 Layer 2 — Reranking
Model: cross-encoder/ms-marco-MiniLM-L-6-v2
Purpose:
Improve precision of retrieved results
Re-evaluate top candidates from Layer 1
Output:
Best matching result with higher semantic accuracy

🔹 Layer 3 — LLM Validation & Generation
Model: meta-llama/Llama-3.1-8B-Instruct
This layer is triggered when:
No strong match is found in Layer 1
Or results are below a confidence threshold
Step 1 — Validation
The model evaluates whether the question is relevant to the profile
Step 2 — Answer Generation
If relevant:
The model generates a contextual answer based on the profile
If not:
The system avoids hallucinations and can return a controlled response

🧠 AI Strategy

This architecture combines:

Deterministic retrieval (database + embeddings)
Precision optimization (cross-encoder reranking)
Generative fallback (LLM)

Benefits:
Higher accuracy than pure LLM systems
Reduced hallucination risk
Better control over enterprise data
Scalable and modular design

💬 Request Flow
User submits a question via UI
Backend generates embedding of the question
PostgreSQL is queried using cosine similarity
Top results are reranked using cross-encoder
If confidence is high → return best match
If not → LLM:
Validates relevance
Generates answer if appropriate

🧩 Technologies Used
Backend
Python
FastAPI
PostgreSQL
Sentence Transformers
Cross-Encoders
LLM (LLaMA 3.1)
Frontend
SAP UI5 (Fiori)
MVC architecture
JSONModel binding
Platform
SAP BTP (Cloud Foundry)
SAP Approuter

🚀 Features
Chat-based UI
Semantic search with embeddings
Intelligent reranking
LLM-based fallback and validation
PostgreSQL-backed knowledge layer
Enterprise-ready architecture

🔐 Security & Design Considerations
Sensitive data remains inside controlled database
Embeddings stored internally (no external leakage)
LLM usage limited to controlled scenarios
Designed to be extended with:
Encryption (e.g., SAP HANA secure storage)
Authentication (XSUAA)
Private LLM deployment

📈 Future Improvements
Add vector database (pgvector / HANA vector engine)
Implement confidence scoring thresholds
Introduce response streaming
Add conversation memory
Optimize latency for real-time interaction
Integrate enterprise authentication

💡 Use Cases
AI-powered professional profile assistant
Internal knowledge assistant
Recruitment and HR screening tool
Consultant portfolio chatbot
Secure enterprise RAG system
