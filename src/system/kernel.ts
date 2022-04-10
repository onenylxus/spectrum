// Import
import Audio from './audio';
import Clock from './clock';
import Computer from './computer';
import Console from './console';
import Graphics from './graphics';
import Input from './input';

// Kernel class
class Kernel {
  public audio: Audio;
  public clock: Clock;
  public computer: Computer;
  public console: Console;
  public graphics: Graphics;
  public input: Input;
  public active: boolean;
  public ticks: number;

  // Constructor
  public constructor() {
    // Components
    this.audio = new Audio(this);
    this.clock = new Clock(this);
    this.computer = new Computer(this);
    this.console = new Console(this);
    this.graphics = new Graphics(this);
    this.input = new Input(this);

    // Properties
    this.active = false;
    this.ticks = 0;
  }

  // Start function
  public start(): void {
    console.log('Spectrum: Cartridge computer');
    this.toggle();
  }

  // Toggle function
  public toggle(): void {
    (this.active ? this.pause : this.resume).bind(this)();
  }

  // Pause function
  private pause(): void {
    this.active = false;
    cancelAnimationFrame(this.ticks);
  }

  // Resume function
  private resume(): void {
    this.active = true;
    this.update();
  }

  // Update function
  private update(): void {
    this.ticks = requestAnimationFrame(() => this.update());
  }
}

// Export
export default Kernel;
