// Import
import Component from '../structs/component';
import Kernel from './kernel';

// Console class
class Console extends Component {
  // Constructor
  public constructor(parent: Kernel) {
    // Super
    super(parent, 'console');
  }
}

// Export
export default Console;
