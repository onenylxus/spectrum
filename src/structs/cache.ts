// Cache class
class Cache {
  private u8: Uint8Array;
  private u16: Uint16Array;

  // Constructor
  public constructor(u8size: number = 0x80, u16size: number = 0x40) {
    // Properties
    this.u8 = new Uint8Array(u8size);
    this.u16 = new Uint16Array(u16size);

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
        return index >= 0x00 && index < this.u8.length ? this.u8[index] : null;

      case 'u16':
        return index >= 0x00 && index < this.u16.length ? this.u16[index] : null;
    }
  }

  // Write cache
  public write(type: 'u8' | 'u16', index: number, value: number) {
    switch (type) {
      case 'u8':
        if (index >= 0x00 && index < this.u8.length) {
          this.u8[index] = value;
        }
        break;

      case 'u16':
        if (index >= 0x00 && index < this.u16.length) {
          this.u16[index] = value;
        }
        break;
    }
  }
}

// Export
export default Cache;
