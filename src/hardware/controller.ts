// Import
import Hardware from '../structs/hardware';
import Computer from '../system/computer';

// Types
type ButtonType = 'a' | 'b' | 'select' | 'start' | 'up' | 'down' | 'left' | 'right';

// Controller class
class Controller extends Hardware {
  private keybinds: Map<ButtonType, string>;

  // Constructor
  public constructor(parent: Computer, port: 1 | 2) {
    // Super
    super(parent, `ctrl${port}`);

    // Properties
    this.keybinds = new Map();

    // Initial clear
    this.clear();
  }

  // Clear keybinds
  public clear(): void {
    this.keybinds.set('a', '');
    this.keybinds.set('b', '');
    this.keybinds.set('select', '');
    this.keybinds.set('start', '');
    this.keybinds.set('up', '');
    this.keybinds.set('down', '');
    this.keybinds.set('left', '');
    this.keybinds.set('right', '');
  }
}

// Export
export default Controller;
