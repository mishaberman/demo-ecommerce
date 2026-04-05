const express = require('express');
const crypto = require('crypto');
const fetch = require('node-fetch');

const app = express();
app.use(express.json());

const PIXEL_ID = process.env.META_PIXEL_ID;
const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;

app.post('/api/meta-capi', async (req, res) => {
  const { eventName, eventData, userData, event_source_url, event_id } = req.body;

  const payload = {
    data: [{
      event_name: eventName,
      event_time: Math.floor(Date.now() / 1000),
      action_source: 'website',
      event_source_url: event_source_url,
      event_id: event_id,
      user_data: {
        client_ip_address: req.ip,
        client_user_agent: req.headers['user-agent'],
        fbc: req.cookies._fbc,
        fbp: req.cookies._fbp,
        em: userData.em ? crypto.createHash('sha256').update(userData.em).digest('hex') : undefined,
        ph: userData.ph ? crypto.createHash('sha256').update(userData.ph).digest('hex') : undefined,
        fn: userData.fn ? crypto.createHash('sha256').update(userData.fn).digest('hex') : undefined,
        ln: userData.ln ? crypto.createHash('sha256').update(userData.ln).digest('hex') : undefined,
      },
      custom_data: eventData,
    }],
    access_token: ACCESS_TOKEN,
  };

  try {
    const response = await fetch(`https://graph.facebook.com/v18.0/${PIXEL_ID}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const responseData = await response.json();
    res.status(response.status).json(responseData);
  } catch (error) {
    console.error('CAPI Error:', error);
    res.status(500).json({ error: 'Failed to send CAPI event' });
  }
});

app.listen(3001, () => {
  console.log('CAPI server listening on port 3001');
});
