import React, { useState } from 'react';
import './App.css';
import logo from './assets/logo.png';
import mascot from './assets/WRITEMECat.png';
import uploadIcon from './assets/uploadIcon.png';
import githubIcon from './assets/githubUploadIcon.png';
import copyIcon from './assets/copyIcon.png';
import downloadIcon from './assets/downloadIcon.png';
import generateBtn from './assets/generateButton.png';
import uploadBtn from './assets/uploadButton.png';

function App() {
  const [githubUrl, setGithubUrl] = useState('');
  const [localPath, setLocalPath] = useState('');
  const [readmeContent, setReadmeContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setErrorMessage('');
    setReadmeContent('');
    try {
      const response = await fetch('http://localhost:3001/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ githubUrl, localPath })
      });
      const data = await response.json();
      if (response.ok) {
        const cleanOutput = data.readme?.split(/#+\s/).length > 1
          ? '# ' + data.readme.split(/#+\s/).slice(1).join('# ')
          : data.readme;
        setReadmeContent(cleanOutput || 'No README content returned.');
      } else {
        console.error('Backend error:', data.error);
        setErrorMessage('ERROR: ' + (data.error || 'Failed to generate README.'));
      }
    } catch (error) {
      console.error('Frontend error:', error);
      setErrorMessage('ERROR: Network error. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="app">
      <div className="left-panel">
        <div className="input-group">
          <label>Local Upload</label>
          <div className="input-row">
            <img src={uploadIcon} alt="upload" className="icon" />
            <input
              type="text"
              placeholder="Upload or drag and drop local file"
              value={localPath}
              onChange={(e) => setLocalPath(e.target.value)}
            />
            <img
              src={uploadBtn}
              alt="upload-btn"
              className="button-image"
              onClick={handleSubmit}
            />
          </div>
        </div>
        <p className="or-text">or</p>
        <div className="input-group">
          <label>GitHub Upload</label>
          <div className="input-row">
            <img src={githubIcon} alt="github" className="icon" />
            <input
              type="text"
              placeholder="Paste GitHub project link here"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
            />
            <img
              src={generateBtn}
              alt="generate-btn"
              className="button-image"
              onClick={handleSubmit}
            />
          </div>
        </div>
        <div className="output-section">
          <label>WRITEME Output</label>
          <textbox readOnly value={readmeContent} />
        </div>
        <div className="footer">© 2025 Paul Shin. All rights reserved.</div>
      </div>

      <div className="right-panel">
        <div className="logo-wrapper">
          <img src={logo} alt="logo" className="logo" />
          <h2>WRITEME</h2>
        </div>
        <img src={mascot} alt="mascot" className="mascot" />
        <div className="action-buttons">
          <img
            src={copyIcon}
            alt="copy"
            className="button-icon"
            onClick={() => navigator.clipboard.writeText(readmeContent)}
          />
          <img
            src={downloadIcon}
            alt="download"
            className="button-icon"
            onClick={() => {
              const blob = new Blob([readmeContent], { type: 'text/markdown' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'README.md';
              a.click();
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;


