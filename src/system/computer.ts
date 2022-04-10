// Import
import Component from '../structs/component';
import Kernel from './kernel';

// Computer class
class Computer extends Component {
  // Constructor
  public constructor(parent: Kernel) {
    // Super
    super(parent, 'computer');
  }
}

// Export
export default Computer;
