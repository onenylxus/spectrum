// Cache class
class Cache {
  private u8: Uint8Array;
  private u16: Uint16Array;

  // Constructor
  public constructor() {
    // Properties
    this.u8 = new Uint8Array(0x80);
    this.u16 = new Uint16Array(0x40);

    // Initial clear
    this.clear();
  }

  // Clear cache
  public clear(): void {
    this.u8.fill(0x00);
    this.u16.fill(0x0000);
  }

  // Read cache
  public read(type: 'u8' | 'u16', index: number): number | null {
    switch (type) {
      case 'u8':
        return index >= 0x00 && index < 0x80 ? this.u8[index] : null;

      case 'u16':
        return index >= 0x00 && index < 0x40 ? this.u16[index] : null;
    }
  }

  // Write cache
  public write(type: 'u8' | 'u16', index: number, value: number) {
    switch (type) {
      case 'u8':
        if (index >= 0x00 && index < 0x80) {
          this.u8[index] = value;
        }
        break;

      case 'u16':
        if (index >= 0x00 && index < 0x40) {
          this.u16[index] = value;
        }
        break;
    }
  }
}

// Export
export default Cache;
