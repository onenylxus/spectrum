// Import
import APU from '../hardware/apu';
import Bus from '../hardware/bus';
import Cartridge from '../hardware/cartridge';
import Component from '../structs/component';
import Controller from '../hardware/controller';
import CPU from '../hardware/cpu';
import Kernel from './kernel';
import PPU from '../hardware/ppu';
import RAM from '../hardware/ram';

/* ------------------------ division ------------------------ */

// Computer class
class Computer extends Component {
  // Constructor
  public apu: APU;
  public bus: Bus;
  public cpu: CPU;
  public ppu: PPU;
  public ram: RAM;

  public cartridge: Cartridge | null;
  public controllerA: Controller;
  public controllerB: Controller | null;

  public ticks: number;

  public constructor(parent: Kernel) {
    // Super
    super(parent, 'computer');

    // Internal hardware
    this.apu = new APU(this);
    this.bus = new Bus(this);
    this.cpu = new CPU(this);
    this.ppu = new PPU(this);
    this.ram = new RAM(this);

    // External hardware
    this.cartridge = null;
    this.controllerA = new Controller(this);
    this.controllerB = null;

    // Properties
    this.ticks = 0;
  }

  /* ------------------------ division ------------------------ */

  // Reset function
  public reset(): void {
    // Connect internal hardware
    this.bus.connect('apu');
    this.bus.connect('cpu');
    this.bus.connect('ppu');
    this.bus.connect('ram');

    // Reset ticks
    this.ticks = 0;
  }
}

/* ------------------------ division ------------------------ */

// Export
export default Computer;
