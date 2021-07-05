// Import
import React from 'react';
import Kernel from './system/kernel';

/* ------------------------ division ------------------------ */

// Application
const App: React.FC<{}> = () => {
  // Reference
  const canvasRef: React.RefObject<HTMLCanvasElement> = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    var Spectrum: Kernel = new Kernel();
    Spectrum.start();
  });

  // Return
  return (
    <div className="App">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

/* ------------------------ division ------------------------ */

// Export
export default App;
