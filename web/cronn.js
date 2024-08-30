// scripts/monitoring-cron.js
const cron = require('node-cron');
const axios = require('axios');


// Schedule the task to run every 5 minutes
cron.schedule('*/5 * * * *', async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/monitor?url=https://example.com');
    console.log('Monitoring result:', response.data);
  } catch (error) {
    console.error('Error during monitoring:', error.message);
  }
});

console.log('Cron job started. Monitoring every 5 minutes...');
