// Import
import Component from '../structs/component';
import Kernel from './kernel';

/* ------------------------ division ------------------------ */

// Clock class
class Clock extends Component {
  // Constructor
  public constructor(parent: Kernel) {
    // Super
    super(parent, 'clock');
  }
}

/* ------------------------ division ------------------------ */

// Export
export default Clock;
