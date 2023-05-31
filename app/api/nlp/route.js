require('dotenv').config()

export const GET = async (request, { params }) => {
    const { Configuration, OpenAIApi } = require("openai");

    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    try {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            "messages": [
                {
                    "role": "user", "content": "hello"
                }
            ]
        });
        console.log(completion.data)
        return new Response(completion.data, {status: 200})
    } catch (error) {
        return new Response("Failed to make completion request.", {status: 500})
    }




}


