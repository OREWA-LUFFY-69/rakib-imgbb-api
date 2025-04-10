const express = require('express');
const axios = require('axios');
const FormData = require('form-data');
const app = express();
const PORT = process.env.PORT || 3000;

// API keys
const IMGBB_API_KEY = '9c8c59b5c6e0c5e814c1bf70dcd8935b';  // Your ImgBB API key
const IMGUR_CLIENT_ID = 'a4d992de24fc960';  // Your Imgur Client ID

// ImgBB Upload Endpoint
app.get('/upload/imgbb', async (req, res) => {
  const imageUrl = req.query.url;
  if (!imageUrl) return res.json({ error: 'Missing ?url=' });

  try {
    const form = new FormData();
    form.append('key', IMGBB_API_KEY);
    form.append('image', imageUrl);

    const response = await axios.post('https://api.imgbb.com/1/upload', form, {
      headers: form.getHeaders(),
    });

    const data = response.data.data;

    res.json({
      status: 'success',
      image: data.url,
      display_url: data.display_url,
      delete_url: data.delete_url,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Upload failed' });
  }
});

// Imgur Upload Endpoint
app.get('/upload/imgur', async (req, res) => {
  const videoUrl = req.query.url;
  if (!videoUrl) return res.json({ error: 'Missing ?url=' });

  try {
    const response = await axios.post(
      'https://api.imgur.com/3/upload',
      {
        image: videoUrl,
        type: 'url',
      },
      {
        headers: {
          Authorization: `Client-ID ${IMGUR_CLIENT_ID}`,
        },
      }
    );

    const data = response.data.data;

    res.json({
      status: 'success',
      image: data.link, // This is the link for the uploaded video or image
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Upload failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
