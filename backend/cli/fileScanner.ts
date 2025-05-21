import * as fs from 'fs';
import * as path from 'path';

// Scanned file extenstions
const allowedExtensions = ['.js', '.ts', '.py', '.java', '.json', '.md', '.html', '.cpp', '.c', '.css', '.go', '.rb', '.sh', '.yaml', '.yml', '.txt'];

function isAllowed(file: string): boolean {
  return allowedExtensions.includes(path.extname(file));
}

export async function scanFiles(projectPath: string): Promise<string> {
  let summary = '';

  function walk(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.isFile() && isAllowed(entry.name)) {
        try {
          const content = fs.readFileSync(fullPath, 'utf-8');
          summary += `\n--- File: ${path.relative(projectPath, fullPath)} ---\n`;
          summary += content.slice(0, 1000); // LIMIT -- 1000 chars
          summary += '\n';
        } catch (e) {
          console.warn(`Skipped file: ${fullPath}`);
        }
      }
    }
  }

  walk(projectPath);
  return summary.trim();
}
