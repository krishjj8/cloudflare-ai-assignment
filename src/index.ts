export interface Env {
    AI: Ai;
}

export default {
    async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
        // Handle OPTIONS requests for CORS preflight
        if (request.method === 'OPTIONS') {
            return handleOptions(request);
        }

        // Check if the request is a POST request
        if (request.method !== 'POST') {
            return new Response('Expected a POST request', { status: 405 });
        }

        // Get the user's prompt from the request body
        const { prompt } = await request.json();
        if (!prompt) {
            return new Response('Missing "prompt" in the request body', { status: 400 });
        }

        const messages = [
            { role: 'system', content: 'You are a friendly assistant.' },
            { role: 'user', content: prompt } // Use the prompt from the user
        ];

        const aiResponse = await env.AI.run(
            "@cf/meta/llama-3.1-8b-instruct",
            {
                messages: messages
            }
        );

        // Send the response back with CORS headers
        return new Response(JSON.stringify(aiResponse), {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        });
    },
};

// Helper function to handle CORS preflight requests
function handleOptions(request: Request) {
    const headers = request.headers;
    if (
        headers.get("Origin") !== null &&
        headers.get("Access-Control-Request-Method") !== null &&
        headers.get("Access-Control-Request-Headers") !== null
    ) {
        // Handle CORS preflight requests.
        return new Response(null, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
            },
        });
    } else {
        // Handle standard OPTIONS request.
        return new Response(null, {
            headers: {
                Allow: "POST, OPTIONS",
            },
        });
    }
}
