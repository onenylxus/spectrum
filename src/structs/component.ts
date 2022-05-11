// Import
import Kernel from '../system/kernel';

// Types
type ComponentType = 'audio' | 'clock' | 'computer' | 'console' | 'graphics' | 'input';

// Component class
class Component {
  public parent: Kernel | null;
  public name: string;

  // Constructor
  public constructor(parent: Kernel | null, name?: string) {
    // Properties
    this.parent = parent;
    this.name = !!name ? name : this.constructor.name.toLowerCase();
  }

  // Find relative component
  find(comp: ComponentType): Component | null {
    return !!this.parent ? this.parent[comp] : null;
  }
}

// Export
export default Component;
