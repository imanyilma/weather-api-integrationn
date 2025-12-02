const axios = require('axios');
require('dotenv').config();

(async () => {
  try {
    const k = process.env.API_KEY || '';
    console.log('API_KEY present:', !!k);
    console.log('API_KEY length:', k.length);
    const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${k}&units=metric`);
    console.log('status', res.status);
    console.log('keys', Object.keys(res.data).slice(0,6));
  } catch (e) {
    console.error('status', e.response?.status);
    console.error('data', e.response?.data);
  }
})();
