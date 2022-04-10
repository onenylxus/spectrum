// Import
import Computer from '../system/computer';
import Hardware from '../structs/hardware';

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
