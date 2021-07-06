// Import
import Kernel from '../system/kernel';

/* ------------------------ division ------------------------ */

// Component class
class Component {
  // Constructor
  private parent: Kernel;
  public name: string;

  public constructor(parent: Kernel, name?: string) {
    // Properties
    this.parent = parent;
    this.name = !!name ? name : this.constructor.name.toLowerCase();
  }

  /* ------------------------ division ------------------------ */

  // Find relative component
  find(comp: ComponentOption): Component {
    return this.parent[comp];
  }
}

/* ------------------------ division ------------------------ */

// Export
export default Component;
