// Import
import React from 'react';
import Kernel from './system/kernel';

// Application
const App = () => {
  // Reference
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  // Use effect
  React.useEffect(() => {
    const Spectrum = new Kernel();
    Spectrum.start();
  });

  // Return
  return (
    <React.StrictMode>
      <div className="App">
        <canvas ref={canvasRef}></canvas>
      </div>
    </React.StrictMode>
  );
};

// Export
export default App;
