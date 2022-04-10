// Import
import Computer from '../system/computer';
import Hardware from '../structs/hardware';

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
