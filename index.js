const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// Your Imgur Client ID
const IMGUR_CLIENT_ID = 'a4d992de24fc960'; // Replace with your own Imgur Client ID

// Imgur Upload Endpoint for Image or Video
app.get('/upload/imgur', async (req, res) => {
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
    
    // Send the media link and your name back to the user
    res.json({
      status: 'success',
      media_link: data.link, // Link for the uploaded image or video
      uploaded_by: 'Rakib Adil',  // Your name included
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Upload failed' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log('API created by Rakib Adil');  // Your name added here
});
