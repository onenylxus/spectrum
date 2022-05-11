// Import
import Flags from '../assets/flags.json';

// Types
type BitType = 0x01 | 0x02 | 0x04 | 0x08 | 0x10 | 0x20 | 0x40 | 0x80;
type FlagType = 'cpu';

// Constants
const values = [0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80];

// Flag class
class Flag {
  public name: string;
  private enum: Readonly<{ [index: string]: BitType }>;

  // Constructor
  constructor(name: FlagType) {
    // Properties
    this.name = name;
    this.enum = Object.freeze(values.reduce((a, c, i) => ({ ...a, [Flags[name][i]]: c }), {}));
  }

  // Get flag
  public get(value: number, flag: string): number {
    return value & this.enum[flag];
  }

  // Set flag
  public set(value: number, flag: string, state: boolean): number {
    return state ? value | this.enum[flag] : value & ~this.enum[flag];
  }
}

// Export
export default Flag;
