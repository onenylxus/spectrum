// Import
import Hardware from '../structs/hardware';
import Computer from '../system/computer';

// PPU class
class PPU extends Hardware {
  // Constructor
  public constructor(parent: Computer) {
    // Super
    super(parent, 'ppu');
  }
}

// Export
export default PPU;
