// Import
import Computer from '../system/computer';
import Hardware from '../structs/hardware';

/* ------------------------ division ------------------------ */

// Bus class
class Bus extends Hardware {
  // Constructor
  public constructor(parent: Computer) {
    // Super
    super(parent, 'bus');
  }
}

/* ------------------------ division ------------------------ */

// Export
export default Bus;
