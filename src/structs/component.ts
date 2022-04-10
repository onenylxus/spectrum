// Import
import Kernel from '../system/kernel';

// Types
type ComponentType = 'audio' | 'clock' | 'computer' | 'console' | 'graphics' | 'input';

// Component class
class Component {
  public parent: Kernel;
  public name: string;

  // Constructor
  public constructor(parent: Kernel, name?: string) {
    // Properties
    this.parent = parent;
    this.name = !!name ? name : this.constructor.name.toLowerCase();
  }

  // Find relative component
  find(comp: ComponentType): Component {
    return this.parent[comp];
  }
}

// Export
export default Component;
