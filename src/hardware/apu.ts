// Import
import Computer from '../system/computer';
import Hardware from '../structs/hardware';

/* ------------------------ division ------------------------ */

// APU class
class APU extends Hardware {
  // Constructor
  public constructor(parent: Computer) {
    // Super
    super(parent, 'apu');
  }
}

/* ------------------------ division ------------------------ */

// Export
export default APU;
