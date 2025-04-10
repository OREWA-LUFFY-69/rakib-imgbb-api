const express = require('express');
const axios = require('axios');
const FormData = require('form-data');

const app = express();
const PORT = process.env.PORT || 3000;

const IMGUR_CLIENT_ID = 'a4d992de24fc960';  // Replace with your Imgur Client ID

app.get('/', (req, res) => {
  res.send('Imgur uploader API by Rakib');
});

app.get('/upload', async (req, res) => {
  const mediaUrl = req.query.url;
  if (!mediaUrl) return res.json({ error: 'Missing ?url=' });

  try {
    const response = await axios.post(
      'https://api.imgur.com/3/upload',
      {
        image: mediaUrl,
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
      image: data.link,  // Link for the uploaded image or video
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Upload failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
