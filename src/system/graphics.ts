// Import
import Component from '../structs/component';
import Kernel from './kernel';

// Graphics class
class Graphics extends Component {
  // Constructor
  public constructor(parent: Kernel) {
    // Super
    super(parent, 'graphics');
  }
}

// Export
export default Graphics;
