// Import
import Bus from './bus';
import Computer from '../system/computer';
import Flag from '../structs/flag';
import Hardware from '../structs/hardware';

// Constants
const cpuFlag = new Flag('cpu');

// CPU class
class CPU extends Hardware {
  public instruction: null;
  public cycles: number;

  // Constructor
  public constructor(parent: Computer) {
    // Super
    super(parent, 'cpu', true);

    // Properties
    this.instruction = null;
    this.cycles = 0;
  }

  // Register getters and setters
  public get a(): number {
    return this.cache!.read('u8', 0)!;
  }

  public set a(value: number) {
    this.cache!.write('u8', 0, value);
  }

  public get x(): number {
    return this.cache!.read('u8', 1)!;
  }

  public set x(value: number) {
    this.cache!.write('u8', 1, value);
  }

  public get y(): number {
    return this.cache!.read('u8', 2)!;
  }

  public set y(value: number) {
    this.cache!.write('u8', 2, value);
  }

  public get pc(): number {
    return this.cache!.read('u16', 0)!;
  }

  public set pc(value: number) {
    this.cache!.write('u16', 0, value);
  }

  public get s(): number {
    return this.cache!.read('u8', 3)!;
  }

  public set s(value: number) {
    this.cache!.write('u8', 3, value);
  }

  public get p(): number {
    return this.cache!.read('u8', 4)!;
  }

  public set p(value: number) {
    this.cache!.write('u8', 4, value);
  }

  // Temporary value getters and setters
  public get temp(): number {
    return this.cache!.read('u8', 5)!;
  }

  public set temp(value: number) {
    this.cache!.write('u8', 5, value);
  }

  public get abs(): number {
    return this.cache!.read('u16', 1)!;
  }

  public set abs(value: number) {
    this.cache!.write('u16', 1, value);
  }

  public get rel(): number {
    return this.cache!.read('u16', 2)!;
  }

  public set rel(value: number) {
    this.cache!.write('u16', 2, value);
  }

  // Get bus
  private get bus(): Bus {
    return this.find('bus') as Bus;
  }

  // Read function
  public read(addr: number): number {
    return this.bus.cpuRead(addr);
  }

  // Write function
  public write(addr: number, value: number): void {
    this.bus.cpuWrite(addr, value);
  }

  // Get CPU flag
  public static get flag(): Flag {
    return cpuFlag;
  }
}

// Export
export default CPU;
