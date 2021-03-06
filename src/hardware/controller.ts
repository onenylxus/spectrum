// Import
import Computer from '../system/computer';
import Hardware from '../structs/hardware';

/* ------------------------ division ------------------------ */

// Controller class
class Controller extends Hardware {
  // Constructor
  public constructor(parent: Computer) {
    // Super
    super(parent, 'controller');
  }
}

/* ------------------------ division ------------------------ */

// Export
export default Controller;
