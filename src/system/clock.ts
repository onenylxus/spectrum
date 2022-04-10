// Import
import Component from '../structs/component';
import Kernel from './kernel';

// Clock class
class Clock extends Component {
  // Constructor
  public constructor(parent: Kernel) {
    // Super
    super(parent, 'clock');
  }
}

// Export
export default Clock;
