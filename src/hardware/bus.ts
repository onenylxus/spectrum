// Import
import Hardware from '../structs/hardware';
import Computer from '../system/computer';

// Bus class
class Bus extends Hardware {
  // Constructor
  public constructor(parent: Computer) {
    // Super
    super(parent, 'bus');
  }
}

// Export
export default Bus;
