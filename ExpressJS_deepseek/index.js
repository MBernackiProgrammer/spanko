const express = require('express');
// const fetch = require('node-fetch'); // jeśli Node < 18
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3003;

// Middleware do parsowania JSON
app.use(express.json());

// POST /sleep
app.post('/sleep', async (req, res) => {
  const { start, end, length } = req.body;

  // Walidacja
  if (!start || !end || !length) {
    return res.status(400).json({ error: 'Missing start, end or length in body' });
  }

  // Budujemy prompt
  const prompt = `You are a professional sleep analyst. A person reported a sleep session:
- Start time: ${start}
- End time: ${end}
- Duration: ${length} minutes

Please provide a short and helpful English summary of this sleep session. Mention if the hours are healthy, if improvements are needed, and any advice. Do not explain what the data is — just give a concise and friendly evaluation.`;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-chat-v3-0324:free',
        messages: [
          {
            role: 'system',
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      return res.status(response.status).json({ error: 'DeepSeek error', details: error });
    }

    const result = await response.json();
    const content = result?.choices?.[0]?.message?.content;

    return res.json({ analysis: content?.trim() ?? 'No response from AI' });
  } catch (err) {
    console.error('Request failed:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Sleep analysis API is running on port ${PORT}`);
});