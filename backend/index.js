import express from 'express';
import cors from 'cors';
import { davinci } from './ask.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.post('/ask', async (req, res) => {
  try {
    const { prompt, key, gptVersion } = req.body;
    
    //console.log(req.body);
    if (!prompt || !key || !gptVersion) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const answer = await davinci(prompt, key, gptVersion);
    return res.status(200).json({ response: answer });
  } catch (error) {
    console.error('Error processing question:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(5001, () => {
  console.log('Server running on http://localhost:5001');
});
