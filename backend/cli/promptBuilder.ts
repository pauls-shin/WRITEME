export function buildPrompt(summary: string): string {
  if (!summary.trim()) {
    return 'This project has no content to summarize. Please check the source files.';
  }

  return `


You are an expert technical writer creating professional README.md files for open source projects.

Given a project's source code and structure, write a clean, informative, and minimal README that includes:

1. **Project Title** – A clear and concise name for the project.
2. **Description** – What the project does, why it exists, and any relevant context or goals.
3. **Installation Instructions** – How to install or set up the project locally, including dependencies or prerequisites.
4. **Usage** – How to run the project with basic usage examples. Include command line usage if applicable.
5. **File Structure (optional)** – A brief breakdown of the main files and directories, only if the project has more than a few files.
6. **License** – Include license name (e.g., MIT) or write "No license specified" if not found.
7. **Contributing** – A short section stating if contributions are welcome and how to start.
8. **Contact / Author** – Author name ONLY, if available.

Use Markdown formatting.
Keep it clear and beginner-friendly.
Do not hallucinate missing details—only use what is inferred from the code or explicitly stated.

If the project is just a single file (like a main.cpp that prints Hello World), adjust the README to be very simple and focused on explaining what the file does and how to run it.




--- START OF PROJECT FILES ---
${summary}
--- END OF PROJECT FILES ---
`;
}

