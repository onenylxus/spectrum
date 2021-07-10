// Import
import Component from './component';
import Computer from '../system/computer';

/* ------------------------ division ------------------------ */

// Hardware class
class Hardware {
  // Constructor
  private _parent: Computer;
  public name: string;
  public connections: List<Hardware>;

  public constructor(parent: Computer, name?: string) {
    // Properties
    this._parent = parent;
    this.name = !!name ? name : this.constructor.name.toLowerCase();
    this.connections = {};
  }

  /* ------------------------ division ------------------------ */

  // Connect hardware
  public connect(hdwr: HardwareOption): void {
    if (!this.connections.hasOwnProperty(hdwr) && this._parent[hdwr] !== null) {
      this.connections[hdwr] = this._parent[hdwr]!;
      this._parent[hdwr]!.connections[this.name] = this;
    }
  }

  // Disconnect hardware
  public disconnect(hdwr: HardwareOption): void {
    if (this.connections.hasOwnProperty(hdwr)) {
      delete this.connections[hdwr].connections[this.name];
      delete this.connections[hdwr];
    }
  }

  // Find relative hardware
  public find(hdwr: HardwareOption): Hardware {
    return this.connections[hdwr];
  }

  // Use relative component
  public use(comp: ComponentOption): Component {
    return this._parent.find(comp);
  }
}

/* ------------------------ division ------------------------ */

// Export
export default Hardware;
