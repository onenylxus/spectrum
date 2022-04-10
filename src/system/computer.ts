// Import
import APU from '../hardware/apu';
import Bus from '../hardware/bus';
import Component from '../structs/component';
import Controller from '../hardware/controller';
import CPU from '../hardware/cpu';
import Kernel from './kernel';
import PPU from '../hardware/cpu';
import RAM from '../hardware/ram';
import ROM from '../hardware/rom';

// Computer class
class Computer extends Component {
  public apu: APU;
  public bus: Bus;
  public ctrl1: Controller | null;
  public ctrl2: Controller | null;
  public cpu: CPU;
  public cpuram: RAM;
  public ppu: PPU;
  public ppuram: RAM;
  public rom: ROM | null;

  // Constructor
  public constructor(parent: Kernel) {
    // Super
    super(parent, 'computer');

    // Hardware
    this.apu = new APU(this);
    this.bus = new Bus(this);
    this.ctrl1 = new Controller(this, 1);
    this.ctrl2 = null;
    this.cpu = new CPU(this);
    this.cpuram = new RAM(this, 'cpu');
    this.ppu = new PPU(this);
    this.ppuram = new RAM(this, 'ppu');
    this.rom = null;

    // Initial reset
    this.reset();
  }

  // Reset function
  public reset() {
    this.bus.connect('cpu');
    this.bus.connect('cpuram');
  }
}

// Export
export default Computer;
