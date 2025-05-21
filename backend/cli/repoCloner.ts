import simpleGit from 'simple-git';
import { randomUUID } from 'crypto';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

// GPT -- Workaround for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function cloneRepo(repoUrl: string): Promise<string | null> {
  const tempDir = path.join(__dirname, '..', 'temp', randomUUID());

  try {
    console.log(`Cloning repo from ${repoUrl}...`);
    await simpleGit().clone(repoUrl, tempDir);
    console.log('Clone successful!');
    return tempDir;
  } catch (err) {
    console.error('Failed to clone repo:', err);
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
    return null;
  }
}



