// Import
import Computer from '../system/computer';
import Hardware from '../structs/hardware';

/* ------------------------ division ------------------------ */

// RAM class
class RAM extends Hardware {
  // Constructor
  public constructor(parent: Computer) {
    // Super
    super(parent, 'ram');
  }
}

/* ------------------------ division ------------------------ */

// Export
export default RAM;
