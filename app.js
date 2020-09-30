const express = require('express');
const m = require('medium-scrape');

const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listen to ${port}`));
app.get('/:user/:post', async (req, res) => {
  let { user, post } = req.params;
  try {
    let response = await m.get(`https://medium.com/${user}/${post}`);
    res.status(200).json({ ...{ ok: true }, ...response });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
});

app.get('*', (req, res) => {
  res.status(404).json({ ok: false, message: 'what?' });
});
