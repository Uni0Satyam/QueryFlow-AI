import 'dotenv/config';

const getResponse = async (message) => {
    const options = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.MODEL_API}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'liquid/lfm-2.5-1.2b-instruct:free',
            messages: [
                { role: 'user', content: message },
            ],
        }),
    }

    try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', options);
        const data = await response.json();
        if (!data.choices || !data.choices.length) {
            console.error("AI ERROR:", data);
        }
        return data.choices[0].message.content;
    } catch (err) {
        console.log(err);
    }
}

export default getResponse;