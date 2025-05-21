import * as fs from 'fs';
import * as path from 'path';

export async function writeReadme(projectPath: string, content: string): Promise<void> {
  const outputPath = path.join(projectPath, 'README.generated.md');
  fs.writeFileSync(outputPath, content, 'utf-8');
}
