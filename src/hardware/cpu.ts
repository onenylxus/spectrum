// Import
import Computer from '../system/computer';
import Hardware from '../structs/hardware';

/* ------------------------ division ------------------------ */

// CPU class
class CPU extends Hardware {
  // Constructor
  public constructor(parent: Computer) {
    // Super
    super(parent, 'cpu');
  }
}

/* ------------------------ division ------------------------ */

// Export
export default CPU;
