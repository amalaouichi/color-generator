import React, { useState, useEffect } from 'react';
import { SketchPicker } from 'react-color';
import './App.css';

const App = () => {
  const [color, setColor] = useState('#FFFFFF');
  const [colorFormat, setColorFormat] = useState('hex');
  const [palette, setPalette] = useState([]);
  const [luminosity, setLuminosity] = useState(50);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const generateRandomColor = () => {
    let randomColor;
    if (colorFormat === 'hex') {
      randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    } else if (colorFormat === 'rgb') {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      randomColor = `rgb(${r}, ${g}, ${b})`;
    } else if (colorFormat === 'hsl') {
      const h = Math.floor(Math.random() * 360);
      const s = Math.floor(Math.random() * 100);
      const l = luminosity;
      randomColor = `hsl(${h}, ${s}%, ${l}%)`;
    }
    setColor(randomColor);
  };

  const generateRandomPalette = () => {
    const newPalette = Array.from({ length: 5 }, () => {
      return '#' + Math.floor(Math.random() * 16777215).toString(16);
    });
    setPalette(newPalette);
  };

  const copyToClipboard = (color) => {
    navigator.clipboard.writeText(color).then(() => {
      alert(`Couleur ${color} copiée dans le presse-papiers !`);
    });
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    localStorage.setItem('lastColor', color);
  }, [color]);

  useEffect(() => {
    const savedColor = localStorage.getItem('lastColor');
    if (savedColor) setColor(savedColor);
  }, []);

  return (
    <div className={`App ${isDarkMode ? 'dark' : 'light'}`}>
      <header className="App-header">
        <h1>Générateur de Couleurs</h1>

        <select onChange={(e) => setColorFormat(e.target.value)} value={colorFormat}>
          <option value="hex">Hex</option>
          <option value="rgb">RGB</option>
          <option value="hsl">HSL</option>
        </select>

        <div className="color-display" style={{ backgroundColor: color }}>
          <p>{color}</p>
        </div>
        <button onClick={generateRandomColor}>Générer une couleur</button>
        <button onClick={generateRandomPalette}>Générer une palette</button>
        <div className="palette">
          {palette.map((p, index) => (
            <div key={index} className="color-box" style={{ backgroundColor: p }}>
              <span>{p}</span>
              <button onClick={() => copyToClipboard(p)}>Copier</button>
            </div>
          ))}
        </div>
        {colorFormat === 'hsl' && (
          <div>
            <label>Luminosité: {luminosity}%</label>
            <input
              type="range"
              min="0"
              max="100"
              value={luminosity}
              onChange={(e) => setLuminosity(e.target.value)}
            />
          </div>
        )}
        <SketchPicker color={color} onChangeComplete={(newColor) => setColor(newColor.hex)} />
        <button onClick={toggleTheme}>Basculer thème</button>
      </header>
    </div>
  );
};

export default App;
