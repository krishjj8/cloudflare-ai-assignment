export interface Env {
    AI: Ai;
}

export default {
    async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
        
        if (request.method === 'OPTIONS') {
            return handleOptions(request);
        }

        
        if (request.method !== 'POST') {
            return new Response('Expected a POST request', { status: 405 });
        }

      
        const { prompt } = await request.json();
        if (!prompt) {
            return new Response('Missing "prompt" in the request body', { status: 400 });
        }

        const messages = [
            { role: 'system', content: 'You are a friendly assistant.' },
            { role: 'user', content: prompt } 
        ];

      
        const aiResponse = await env.AI.run(
            "@cf/meta/llama-3.1-8b-instruct",
            {
                messages: messages
            }
        );
        
       
        return new Response(JSON.stringify(aiResponse), {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        });
    },
};


function handleOptions(request: Request) {
    const headers = request.headers;
    if (
        headers.get("Origin") !== null &&
        headers.get("Access-Control-Request-Method") !== null &&
        headers.get("Access-Control-Request-Headers") !== null
    ) {
        
        return new Response(null, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
            },
        });
    } else {
        return new Response(null, {
            headers: {
                Allow: "POST, OPTIONS",
            },
        });
    }
}
