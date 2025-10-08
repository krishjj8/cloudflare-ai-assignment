# Cloudflare AI Chat Assignment

This is an AI-powered chat application built for the Cloudflare internship assignment. It uses Cloudflare Workers for the backend AI logic and Cloudflare Pages for the frontend user interface.

---

### **Live Demo**

**You can test the live application here:** [https://ai-chat-interface-1ev.pages.dev/](https://ai-chat-interface-1ev.pages.dev/)

---

### **Project Overview**

The application consists of two main parts:
1.  **A Cloudflare Worker (`/src/index.ts`)**: This serverless function receives a prompt from the user, forwards it to the Cloudflare Workers AI model (`@cf/meta/llama-3.1-8b-instruct`), and returns the response.
2.  **A Static Frontend (`/index.html`)**: A simple HTML page with vanilla JavaScript that provides a user interface. It makes a `POST` request to the Worker and displays the AI's response on the page.

### **Technologies Used**

* Cloudflare Workers
* Cloudflare Pages
* Cloudflare Workers AI
* TypeScript
* Wrangler CLI

### **How to Run Locally**

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the local development server:
    ```bash
    npm run start
    ```
