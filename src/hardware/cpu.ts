// Import
import Hardware from '../structs/hardware';
import Computer from '../system/computer';

// CPU class
class CPU extends Hardware {
  // Constructor
  public constructor(parent: Computer) {
    // Super
    super(parent, 'cpu');
  }
}

// Export
export default CPU;
