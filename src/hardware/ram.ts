// Import
import Computer from '../system/computer';
import Hardware from '../structs/hardware';

// Types
type RAMType = 'cpu' | 'ppu';

// RAM class
class RAM extends Hardware {
  private data: Uint8Array;

  // Constructor
  public constructor(parent: Computer, type: RAMType) {
    // Super
    super(parent, `${type}ram`);

    // Properties
    this.data = new Uint8Array((type === 'cpu' ? 4 : 1) * 0x4000);

    // Initial clear
    this.clear();
  }

  // Clear data
  public clear(): void {
    this.data.fill(0x00);
  }

  // Read data
  public read(index: number): number | null {
    return index >= 0 && index < this.data.length ? this.data[index] : null;
  }

  // Write data
  public write(index: number, value: number): void {
    if (index >= 0 && index < this.data.length) {
      this.data[index] = value;
    }
  }
}

// Export
export default RAM;
