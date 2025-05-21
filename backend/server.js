import express from 'express';
import cors from 'cors';
import { exec } from 'child_process';
import path from 'path';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/generate', (req, res) => {
  console.log('Received POST /api/generate');
  console.log('Request body:', req.body);

  const { githubUrl, localPath } = req.body;

  let cmd = 'npx tsx backend/cli/index.ts';
  if (githubUrl) cmd += ` --github ${githubUrl}`;
  else if (localPath) cmd += ` --local "${localPath}"`;
  else return res.status(400).json({ error: 'Missing input' });

  console.log('Running command:', cmd);

  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      console.error('CLI Error:', stderr);
      return res.status(500).json({ error: stderr });
    }
    console.log('CLI Output:', stdout);
    return res.json({ readme: stdout });
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});


// node /backend/server.js
