// Import
import Component from '../structs/component';
import Kernel from './kernel';

// Audio class
class Audio extends Component {
  // Constructor
  public constructor(parent: Kernel) {
    // Super
    super(parent, 'audio');
  }
}

// Export
export default Audio;
