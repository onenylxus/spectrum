// Import
import Hardware from '../structs/hardware';
import Computer from '../system/computer';

// APU class
class APU extends Hardware {
  // Constructor
  public constructor(parent: Computer) {
    // Super
    super(parent, 'apu');
  }
}

// Export
export default APU;
