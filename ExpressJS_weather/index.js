const express = require('express');
// const fetch = require('node-fetch'); // jeśli używasz Node <18
require('dotenv').config(); // Dla .env z JWT tokenem

const app = express();
const PORT = process.env.PORT || 3002;

app.get('/weather', async (req, res) => {
  const { x, y } = req.query;

  // Walidacja parametrów
  if (!x || !y) {
    return res.status(400).json({ error: 'Missing x or y parameter' });
  }

  // Składanie URL do WeatherKit
  const url = `https://weatherkit.apple.com/api/v1/weather/en/${x}/${y}?timezone=Europe/Madrid&countryCode=ES&dataSets=currentWeather,dailyForecast,weatherAlerts`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.WEATHERKIT_JWT_TOKEN}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json({ error: errorData });
    }

    const data = await response.json();
    return res.json(data);
  } catch (error) {
    console.error('Fetch error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});