// Import
import Computer from '../system/computer';
import Hardware from '../structs/hardware';

/* ------------------------ division ------------------------ */

// Cartridge class
class Cartridge extends Hardware {
  // Constructor
  public constructor(parent: Computer) {
    // Super
    super(parent, 'cartridge');
  }
}

/* ------------------------ division ------------------------ */

// Export
export default Cartridge;
