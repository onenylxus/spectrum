// Import
import Audio from './audio';
import Clock from './clock';
import Computer from './computer';
import Graphics from './graphics';
import Input from './input';

/* ------------------------ division ------------------------ */

// Kernel class
class Kernel {
  // Constructor
  public audio: Audio;
  public clock: Clock;
  public computer: Computer;
  public graphics: Graphics;
  public input: Input;

  public active: boolean;
  public frames: number;

  public constructor() {
    // Components
    this.audio = new Audio(this);
    this.clock = new Clock(this);
    this.computer = new Computer(this);
    this.graphics = new Graphics(this);
    this.input = new Input(this);

    // Properties
    this.active = false;
    this.frames = 0;
  }

  /* ------------------------ division ------------------------ */

  // Start function
  public start(): void {
    console.log('Spectrum: Cartridge computer');
    this.resume();
  }

  // Pause function
  public pause(): void {
    this.active = false;
    cancelAnimationFrame(this.frames);
  }

  // Resume function
  public resume(): void {
    if (!this.active) {
      this.active = true;
      this.update();
    }
  }

  // Update function
  public update(): void {
    this.frames = requestAnimationFrame(() => this.update());
  }
}

/* ------------------------ division ------------------------ */

// Export
export default Kernel;
