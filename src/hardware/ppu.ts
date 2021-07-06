// Import
import Computer from '../system/computer';
import Hardware from '../structs/hardware';

/* ------------------------ division ------------------------ */

// PPU class
class PPU extends Hardware {
  // Constructor
  public constructor(parent: Computer) {
    // Super
    super(parent, 'ppu');
  }
}

/* ------------------------ division ------------------------ */

// Export
export default PPU;
