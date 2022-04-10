// Import
import Hardware from '../structs/hardware';
import Computer from '../system/computer';

// ROM class
class ROM extends Hardware {
  // Constructor
  public constructor(parent: Computer) {
    // Super
    super(parent, 'rom');
  }
}

// Export
export default ROM;
