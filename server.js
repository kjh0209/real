const express = require("express");
const bodyParser = require('body-parser');
const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: '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'
});


const app = express();
const cors = require('cors');
app.use(cors());

app.use(bodyParser.json());

app.post('/getGptResponse', async (req, res) => {
    const userMessages = req.body.messages;
    const chatCompletion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: userMessages
    });

    const gptResponse = chatCompletion.choices[0].message.content;
    res.json({ response: gptResponse });
});


app.listen(3000, () => {
    console.log("Server running on port 3000");
});
