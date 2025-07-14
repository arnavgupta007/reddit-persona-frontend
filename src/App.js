import React, { useState } from 'react';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
   try {
  const response = await fetch('https://reddit-persona-backend.onrender.com/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url })
  });

      if (!response.ok) {
        const error = await response.json();
        alert('❌ ' + error.error);
        setLoading(false);
        return;
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = 'persona.txt';
      a.click();
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      alert('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      fontFamily: 'Segoe UI, sans-serif',
      backgroundColor: '#fff'
    }}>
      {/* Navbar */}
      <nav style={{
        width: '100%',
        backgroundColor: '#ff4500',
        padding: '16px 24px',
        color: '#fff',
        fontWeight: '600',
        fontSize: '18px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img
            src="https://www.redditstatic.com/desktop2x/img/favicon/android-icon-192x192.png"
            alt="Reddit Logo"
            style={{ width: '28px', height: '28px', borderRadius: '50%' }}
          />
          Reddit Persona Analyzer
        </div>
        <div style={{ fontSize: '14px', opacity: 0.8, whiteSpace: 'nowrap' }}>For Internship</div>
      </nav>

      <main style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px 20px',
        background: 'linear-gradient(145deg, #ff4500 0%, #ffffff 100%)',
        width: '100%'
      }}>
        <div style={{ maxWidth: '600px', width: '100%', textAlign: 'center' }}>
          <h1 style={{ color: '#ff4500', fontSize: '2.4rem', fontWeight: 700, marginBottom: '10px' }}>Reddit Persona Analyzer</h1>
          <p style={{ color: '#343a40', fontSize: '1.1rem', marginBottom: '30px' }}>
            Generate intelligent Reddit user personas powered by AI.
          </p>
          <input
            type="text"
            placeholder="Paste Reddit profile URL (e.g., https://www.reddit.com/user/spez/)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={{
              width: '100%',
              padding: '14px 18px',
              borderRadius: '8px',
              border: '2px solid #ff4500',
              fontSize: '16px',
              marginBottom: '20px',
              outline: 'none',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}
          />
          <br />
          <button
            onClick={handleAnalyze}
            disabled={loading || !url}
            style={{
              padding: '12px 30px',
              backgroundColor: '#ff4500',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: loading || !url ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.3s ease',
              boxShadow: '0 4px 12px rgba(255, 69, 0, 0.2)'
            }}
          >
            {loading ? 'Analyzing...' : 'Generate Persona Report'}
          </button>
        </div>
      </main>

      <footer style={{
        padding: '20px 0',
        borderTop: '1px solid rgba(255, 69, 0, 0.2)',
        fontSize: '14px',
        color: '#495057',
        textAlign: 'center',
        backgroundColor: '#fff',
        flexShrink: 0
      }}>
        <p style={{ margin: 0 }}>
          Made by <strong style={{ color: '#ff4500' }}>Arnav Gupta</strong> &nbsp;&middot;&nbsp; © {new Date().getFullYear()} All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
