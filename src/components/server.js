const express = require('express');
const axios = require('axios');
const app = express();
const port = 3001;

app.use(express.json());

app.get('/sentences', async (req, res) => {
  try {
    const response = await axios.get('https://loripsum.net/api/1/short');
    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error('Error fetching sentences:', error);
    res.status(500).json({ error: 'Failed to fetch sentences' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
