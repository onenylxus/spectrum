// Import
import Component from '../structs/component';
import Kernel from './kernel';

// Input class
class Input extends Component {
  // Constructor
  public constructor(parent: Kernel) {
    // Super
    super(parent, 'input');
  }
}

// Export
export default Input;
