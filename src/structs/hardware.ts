// Import
import Cache from './cache';
import Component from './component';
import Computer from '../system/computer';

// Types
type ComponentType = 'audio' | 'clock' | 'computer' | 'console' | 'graphics' | 'input';
type HardwareType = 'apu' | 'bus' | 'ctrl1' | 'ctrl2' | 'cpu' | 'cpuram' | 'ppu' | 'ppuram' | 'rom';

// Hardware class
class Hardware {
  public parent: Computer;
  public name: string;
  private connections: Map<string, Hardware>;
  protected cache: Cache;

  // Constructor
  public constructor(parent: Computer, name?: string) {
    // Properties
    this.parent = parent;
    this.name = !!name ? name : this.constructor.name.toLowerCase();
    this.connections = new Map();
    this.cache = new Cache();
  }

  // Connect hardware
  public connect(hdwr: HardwareType): void {
    if (!this.connections.has(hdwr) && this.parent[hdwr] !== null) {
      this.connections.set(hdwr, this.parent[hdwr]!);
      this.parent[hdwr]!.connections.set(this.name, this);
    }
  }

  // Disconnect hardware
  public disconnect(hdwr: HardwareType): void {
    if (this.connections.has(hdwr)) {
      this.find(hdwr)!.connections.delete(this.name);
      this.connections.delete(hdwr);
    }
  }

  // Find relative hardware
  public find(hdwr: HardwareType): Hardware | null {
    return this.connections.has(hdwr) ? this.connections.get(hdwr)! : null;
  }

  // Use relative component
  public use(comp: ComponentType): Component {
    return this.parent.find(comp);
  }
}

// Export
export default Hardware;
