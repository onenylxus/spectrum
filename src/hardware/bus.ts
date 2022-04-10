// Import
import Computer from '../system/computer';
import Hardware from '../structs/hardware';
import RAM from './ram';

// Bus class
class Bus extends Hardware {
  // Constructor
  public constructor(parent: Computer) {
    // Super
    super(parent, 'bus');
  }

  // Get CPU RAM
  private get cpuram(): RAM {
    return this.find('cpuram') as RAM;
  }

  // CPU read function
  public cpuRead(addr: number): number {
    if (addr >= 0x0000 && addr <= 0xffff) {
      return this.cpuram.read(addr)!;
    }
    return 0x00;
  }

  // CPU write function
  public cpuWrite(addr: number, value: number): void {
    if (addr >= 0x0000 && addr <= 0xffff) {
      this.cpuram.write(addr, value);
    }
  }
}

// Export
export default Bus;
