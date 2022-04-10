// Import
import Computer from '../system/computer';
import Hardware from '../structs/hardware';

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
