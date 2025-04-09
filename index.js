const express = require('express');
const axios = require('axios');
const FormData = require('form-data');

const app = express();
const PORT = process.env.PORT || 3000;

const IMGBB_API_KEY = '9c8c59b5c6e0c5e814c1bf70dcd8935b';  // Your API key directly here

app.get('/', (req, res) => {
  res.send('Imgbb uploader API by Rakib');
});

app.get('/upload', async (req, res) => {
  const imageUrl = req.query.url;
  if (!imageUrl) return res.json({ error: 'Missing ?url=' });

  try {
    const form = new FormData();
    form.append('key', IMGBB_API_KEY);
    form.append('image', imageUrl);

    const response = await axios.post('https://api.imgbb.com/1/upload', form, {
      headers: form.getHeaders()
    });

    const data = response.data.data;

    res.json({
      status: 'success',
      image: data.url,
      display_url: data.display_url,
      delete_url: data.delete_url
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Upload failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});