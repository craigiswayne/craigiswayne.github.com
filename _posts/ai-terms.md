---
title: "AI Terms"
description: ""
image: "https://images.unsplash.com/photo-1713345248737-2698000f143d?w=800&q=80"
date: 2025-11-10T16:57:33+05:30
draft: false
params:
  author: Craig Wayne
tags:
  - AI
  - Terms
  - Glossary
---

## Model

## LLM (Large Language Model)
- type of model
- examples: 

| Model Family                             | Developer       | Key Features & Models                                                                                                        |
|------------------------------------------|-----------------|------------------------------------------------------------------------------------------------------------------------------|
| GPT (Generative Pre-trained Transformer) | OpenAI          | The models that launched the modern AI boom.                                                                                 |
|                                          |                 | Current Flagship: GPT-4o (o for omni, highly multimodal, integrates text, audio, and vision seamlessly).                     |
|                                          |                 | Previous Versions: GPT-4, GPT-3.5."                                                                                          |
| Gemini                                   | Google DeepMind | Highly advanced, multimodal models designed to integrate into Google's vast product ecosystem.                               |
|                                          |                 | Current Flagships: Gemini 2.5 Pro (most capable) and Gemini 2.5 Flash (optimized for speed and efficiency).                  |
| Claude                                   | Anthropic       | Known for their emphasis on AI safety and Constitutional AI. They excel at long-context comprehension and complex reasoning. |
|                                          |                 | Current Flagships: Claude 3/4 Opus (most capable), Claude 3/4 Sonnet (balanced), and Claude 3/4 Haiku (fastest).             |

---

## Model Variants / Model Tiers

The terms 2.5 Flash and 2.5 Pro are called Model Variants or Model Tiers within the Gemini family.

This naming scheme is common across the entire industry (like with Claude's Haiku, Sonnet, and Opus) and is used to clearly communicate the specific trade-offs between the models.


| Part        | Example          | Meaning/Classification                                                                                                                 |
|-------------|------------------|----------------------------------------------------------------------------------------------------------------------------------------|
| Gemini      | (Family Name)    | The Base Model Family. This is the core underlying architecture and intellectual property developed by Google DeepMind.                |
| 2.5         | (Version Number) | The Major Iteration/Generation. This indicates a significant architectural leap or update from the previous version (like 1.0 or 2.0). |
| Flash / Pro | (Variant Name)   | The Model Tier or Optimization. This is the most crucial part, indicating the model's primary use case and performance profile.        |

---

## Text-to-Video Generative AI Models

Key Characteristics of this Classification:
Generative: Their purpose is to create new, original content (video) that did not exist before.

Text-to-Video: They accept text input and produce video output, unlike Large Language Models (LLMs) which primarily accept and produce text.

Architectural Overlap: While they are distinct from LLMs, they often use the same fundamental Transformer architecture (or variations like the Diffusion Transformer) for processing the input text and ensuring long-range consistency in the generated output.


| Model         | Developer       | Primary Classification         | Key Technology                                                                                                                            |
|---------------|-----------------|--------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| Sora (Sora 2) | OpenAI          | Text-to-Video Generative Model | Uses a Diffusion Transformer architecture, which is an adaptation of the technology behind their DALL·E image models.                     |
| Veo 3         | Google DeepMind | Text-to-Video Generative Model | Uses a Latent Diffusion model, often distributed via the Gemini APIs, and is noted for its strong integration of native audio generation. |


---

## MCP (Model Context Protocol)
an open standard designed to standardize how Large Language Models (LLMs) and other AI systems interact with the outside world, specifically with external data sources, applications, and tools.

Think of MCP as the USB-C port for AI applications. Just as a USB-C cable provides a universal way to connect a computer to a charger, an external drive, or a monitor, the MCP provides a universal "plug-and-play" method for connecting an AI model to any source of context or capability it needs.

Before MCP, every time a developer wanted an LLM (like Claude or GPT) to access a specific database, a company's internal file system, or an external API (like a weather service), they had to write custom code ("glue code") for that single connection. This created an unmanageable mess of integrations. MCP fixes this by providing a common protocol.

---

## RAG (Retrieval-Augmented Generation)
- is a technique used to improve the accuracy and relevance of answers provided by LLMs.
- The Problem: Standard LLMs can only answer based on the data they were trained on, which is often outdated or lacks specific domain knowledge.
- The Solution: Before an LLM generates a response, the RAG system retrieves relevant information (like documents, company manuals, or knowledge base articles) from an external, up-to-date source. This retrieved context is then provided to the LLM as part of the prompt, allowing it to generate a more informed and accurate answer.

https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcSBD4HDHXBpm8cyiKOz-3SgIGFkqfGFtDjRMPaAhJyjMltcHLngXZLnrwGoIu39GCu4cOTHIW9p19oos1riCheFpIkfZzT9vYTbqvORJ28BxSqY6Rk


| Name         | Classification         | Description                                                                                                                                                                  |
|--------------|------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Anthropic    | AI Company             | Anthropic is an American AI safety and research company dedicated to building reliable, interpretable, and steerable AI systems.                                             |
| Claude       | LLM/AI Assistant       | A family of Large Language Models developed by Anthropic. The models (like Claude 3) are powerful competitors to GPT and Gemini.                                             |
| Gemini       | LLM/AI Assistant       | A family of highly capable Large Language Models developed by Google. It serves as a foundational model for many Google products.                                            |
| ChatGPT      | Interface/Application  | An application developed by OpenAI that provides a conversational interface to the underlying GPT (Generative Pre-trained Transformer) family of LLMs.                       |
| Hugging Face | AI Platform/Community  | A massive online platform and open-source community for machine learning. It hosts thousands of open-source models (including LLMs), datasets, and tools for AI development. |
| Cursor       | AI-Powered Code Editor | A software application (a code editor) that integrates various Large Language Models (like GPT-4) to help developers write, debug, and understand code more efficiently.     |

---

### Comparison of AI App Builders

|  | Bolt | Lovable | Figma | Vercel v0 | [Framer](https://www.framer.com/) |
|--|------|---------|-------|-----------|-----------------------------------|
| 

---

### Comparison of Workflow Automators (iPaaS)

|               | ActivePieces | n8n | Zapier | Make |
|---------------|--------------|-----|--------|------|
| Open Source   |
| Can Self Host | 

---

## Ollama
- run multiple LLMs, locally on your computer

---

### [n8n](https://n8n.io/)

---

### [ActivePieces](https://www.activepieces.com/)

It is best classified as a modern, Open-Source, AI-First iPaaS/Workflow Automation Platform.

1. Primary Classification: Open-Source Workflow Automation Platform (iPaaS)
* Classification: Integration Platform as a Service (iPaaS)
* Description: ActivePieces' core function is to allow users to build multistep automated workflows (called "Flows") by connecting different software applications and services. This places it directly in competition with market leaders like Zapier and Make.
* Key Differentiator: It is an open-source platform, meaning users can view, modify, and self-host the core code. This appeals strongly to developers, technical teams, and businesses with strict data privacy or customization needs.

2. The Modern AI Classification
* Classification: AI-First Automation Platform / AI Agent Orchestrator
* Description: ActivePieces is heavily marketed as "AI-first," meaning it is built to easily integrate advanced AI functionalities (like large language models) directly into the automation flows.
  * AI Agents: A significant feature is the ability to build and deploy AI Agents—autonomous programs that can think, plan, and act to achieve a goal by utilizing the platform's app integrations ("Pieces") as their tools.
  * Model Context Protocol (MCP): It is one of the platforms pioneering the use of protocols like MCP to enable external AI models (like Claude or Gemini) to securely and reliably interact with external apps connected to ActivePieces.

3. By Technical and Deployment Model
* Classification: Open-Core Low-Code Tool
* Open-Core Model: The fundamental automation builder is open-source (MIT license), while advanced features (like Enterprise collaboration, SSO, and dedicated cloud hosting) are offered as proprietary add-ons in their commercial cloud versions.
* No-Code/Low-Code: It uses a no-code visual drag-and-drop builder for general users, but it fully supports low-code steps by allowing developers to write custom JavaScript code and import NPM packages for maximum flexibility.
* Deployment: It offers both Cloud-hosted and Self-hosted (on-premise/Docker) options, giving users complete control over their data and infrastructure.

Classification Summary Table

| Classification Category | ActivePieces Classification               | Key Feature                                                                             |
|-------------------------|-------------------------------------------|-----------------------------------------------------------------------------------------|
| Primary Domain          | iPaaS (Integration Platform as a Service) | Connects 400+ apps using automated workflows ("Flows").                                 |
| AI Focus                | AI Agent Orchestrator                     | Enables building, deploying, and managing goal-oriented AI Agents.                      |
| Source Code Model       | Open-Core                                 | Core platform is open-source (MIT license); commercial plans offer enterprise features. |
| Development Style       | No-Code/Low-Code                          | Drag-and-drop builder for non-technical users, with custom code support for developers. |

---

### [Bolt](https://bolt.new/)
Browser-Based, AI-Powered, Full-Stack Development Environment.

1. Primary Classification: AI-Powered Development Agent
* Classification: Generative AI Development Tool / AI App Builder
* Core Function: It uses sophisticated Large Language Models (LLMs) to generate full-stack web applications (React, Tailwind CSS, Node.js) based on natural language prompts.
* Distinguishing Feature: often referred to as an AI Agent because the AI doesn't just suggest code; it can actually interact with and control the development environment (creating files, running the dev server, installing packages) directly within the browser, making the chat experience the core workflow.

2. Technical Environment Classification
* Classification: In-Browser IDE (Integrated Development Environment)
* Core Function: It runs a complete, real development environment (editor, file tree, terminal, and live preview) entirely within the user's browser tab.
* Key Technology: It is built by StackBlitz and leverages their proprietary WebContainers technology, which runs a Node.js environment compiled to WebAssembly locally in the browser, providing a zero-setup development experience.

3. Application Domain Classification
* Classification: Rapid Prototyping Platform / No-Code/Low-Code Bridge
* Description: It is excellent for quickly building and iterating on functional prototypes, MVPs (Minimum Viable Products), and demos. It serves both experienced developers (for speed) and non-coders (for accessibility).
* Ecosystem: It provides its own full infrastructure (known as Bolt Cloud) for hosting, databases, and user management, which simplifies the process of taking the generated app live with one-click deployment.

Classification Summary

| Aspect          | Bolt.new Classification                         |
|-----------------|-------------------------------------------------|
| Core Technology | Generative AI Agent (Code Generation LLM)       |
| User Experience | Conversational Development / Prompt-based       | 
| Environment     | In-Browser IDE (powered by WebContainers)       | 
| Output          | Full-Stack Web Application Source Code          | 
| Use Case        | Rapid Prototyping & AI-Assisted Web Development | 

Bolt.new distinguishes itself by tightly integrating the AI model with the actual in-browser runtime environment, 
creating a powerful, self-contained, and interactive development sandbox.

---

### [Lovable](https://lovable.dev/)

1. Primary Classification: AI-Powered Application Builder
* Classification: Generative Development Tool (or AI App Builder)
* Description: Its core purpose is to generate full-stack web applications (frontend, backend, and database logic) from a user's natural language description (text-to-app). It essentially automates the initial, tedious parts of the coding process.

2. Secondary Classifications

| Classification             | Explanation                                                                                                                                                                                                                |
|----------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| No-Code/Low-Code Platform  | It allows users with little to no coding experience to build functional applications simply by using text prompts, placing it in the broader No-Code/Low-Code space, though it generates real code.                        |
| Developer Tooling          | It is specifically designed to output developer-friendly, editable source code (React, Supabase, etc.) that can be synced to GitHub. This makes it a tool for developers to accelerate prototyping and remove boilerplate. |
| Full-Stack Generative AI   | It covers the entire software stack (not just the UI or text) by generating front-end code, handling backend logic, and integrating with databases/cloud services (like Supabase and its own Lovable Cloud).               |
| Conversational Development | The interface is a chat environment where you prompt the AI, ask for revisions, and debug issues, making it a highly interactive and iterative development experience.                                                     |

---

### [Supabase](https://supabase.com/)
