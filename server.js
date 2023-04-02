const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/debug', async (req, res) => {
    const { language, code, error, function: codeFunction } = req.body;

    const messages = [
        { role: "system", content: "You are a helpful AI that can debug code and suggest fixes." },
        { role: "user", content: `Language: ${language}` },
        { role: "user", content: `Code: ${code}` },
        { role: "user", content: `Error: ${error}` },
        { role: "user", content: `Function: ${codeFunction}` },
        { role: "user", content: "Please provide a description of the error and suggest a fix." }
    ];

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-3.5-turbo",
            messages: messages ,
            temperature: 0.5,
        }, {
            headers: {
                'Authorization': `Bearer ${'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'}`,
                'Content-Type': 'application/json',
            }
        });

        const debugResult = response.data.choices[0].message.content.trim();
        res.json({ message: debugResult });

    } catch (error) {
        console.error("GPT-3 API Error:", error);
        res.status(500).send("Error processing the request.");
      }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
