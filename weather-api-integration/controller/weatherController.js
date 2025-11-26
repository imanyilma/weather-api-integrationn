const axios = require('axios');

const getWeather = async (req, res) => {
  const city = req.params.city;
  const api_key = process.env.OPENWEATHER_API_KEY || process.env.API_KEY;

  if (!api_key) {
    return res.status(500).json({ message: "API key not set in .env" });
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;

  try {
    const response = await axios.get(url);
    res.status(200).json(response.data); // Use .data, not .body
  } catch (error) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || error.message;
    res.status(status).json({ message: "Error fetching weather data", error: message });
  }
};

module.exports = getWeather;
