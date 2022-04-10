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
  private apu: APU;
  private bus: Bus;
  private ctrl1: Controller | null;
  private ctrl2: Controller | null;
  private cpu: CPU;
  private cpuram: RAM;
  private ppu: PPU;
  private ppuram: RAM;
  private rom: ROM | null;

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
  }
}

// Export
export default Computer;
