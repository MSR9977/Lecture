import { useState } from 'react';
import Lanyard from './components/Lanyard';
import './App.css';

function App() {
  const [cameraDistance, setCameraDistance] = useState(24);
  const [gravity, setGravity] = useState(-40);
  const [key, setKey] = useState(0);

  const handleReset = () => {
    setKey(prev => prev + 1);
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>🎫 Lanyard Card Demo</h1>
        <p className="subtitle">اسحب البطاقة وجرّب الفيزياء الواقعية!</p>
      </div>

      <div className="demo-container">
        <div className="canvas-wrapper">
          <Lanyard 
            key={key}
            position={[0, 0, cameraDistance]} 
            gravity={[0, gravity, 0]} 
          />
        </div>
      </div>

      <div className="controls">
        <h2>⚙️ التحكم / Controls</h2>
        
        <div className="control-group">
          <label htmlFor="camera-distance">
            <span>📷 Camera Distance</span>
            <span className="value">{cameraDistance}</span>
          </label>
          <input
            id="camera-distance"
            type="range"
            min="20"
            max="50"
            step="1"
            value={cameraDistance}
            onChange={(e) => {
              setCameraDistance(Number(e.target.value));
              handleReset();
            }}
          />
        </div>

        <div className="control-group">
          <label htmlFor="gravity">
            <span>🌍 Gravity</span>
            <span className="value">{Math.abs(gravity)}</span>
          </label>
          <input
            id="gravity"
            type="range"
            min="0"
            max="100"
            step="5"
            value={Math.abs(gravity)}
            onChange={(e) => setGravity(-Number(e.target.value))}
          />
        </div>

        <button className="reset-button" onClick={handleReset}>
          🔄 Reset / إعادة تعيين
        </button>
      </div>

      <div className="info-section">
        <div className="info-card">
          <div className="icon">🖱️</div>
          <h3>Drag & Drop</h3>
          <p>اسحب البطاقة في أي اتجاه</p>
        </div>
        <div className="info-card">
          <div className="icon">⚡</div>
          <h3>Physics Engine</h3>
          <p>محرك فيزياء واقعي مع Rapier</p>
        </div>
        <div className="info-card">
          <div className="icon">🎨</div>
          <h3>3D Graphics</h3>
          <p>رسومات ثلاثية الأبعاد مع Three.js</p>
        </div>
      </div>

      <footer className="footer">
        <p>Made with ❤️ by Mohammed Saud Al-Rumaihi</p>
        <p className="tech-stack">React • Three.js • React Three Fiber • Rapier Physics</p>
      </footer>
    </div>
  );
}

export default App;
