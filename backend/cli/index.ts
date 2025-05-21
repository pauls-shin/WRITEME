import { scanFiles } from './fileScanner';
import { buildPrompt } from './promptBuilder';
import { getReadmeFromAI } from './apiCaller';
import { writeReadme } from './readmeWriter';
import { cloneRepo } from './repoCloner';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config();

async function main() {
  const args = process.argv.slice(2);
  let projectPath = '';
  let cleanupPath: string | null = null;

  if (args[0] === '--local' && args[1]) {
    projectPath = path.resolve(args[1]);
  } else if (args[0] === '--github' && args[1]) {
    const clonedPath = await cloneRepo(args[1]);
    if (!clonedPath) {
      console.error('Failed to clone GitHub repo.');
      return;
    }
    projectPath = clonedPath;
    cleanupPath = clonedPath;
  } else {
    console.error('Invalid args. Use --local <path> or --github <url>');
    return;
  }

  const summary = await scanFiles(projectPath);
  const prompt = buildPrompt(summary);
  const readme = await getReadmeFromAI(prompt);

  await writeReadme(projectPath, readme);

  //Frontend output
  console.log(readme);


}

main();
