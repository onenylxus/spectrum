// Import
import Assembly from '../software/assembly';
import Bus from './bus';
import Cache from '../structs/cache';
import Computer from '../system/computer';
import Factory from '../software/factory';
import Flag from '../structs/flag';
import Hardware from '../structs/hardware';
import Instruction from '../structs/instruction';

// Constants
const cpuFlag = new Flag('cpu');

// CPU class
class CPU extends Hardware {
  public cache: Cache;
  public instruction: Instruction | null;
  public cycles: number;

  // Constructor
  public constructor(parent: Computer) {
    // Super
    super(parent, 'cpu');

    // Properties
    this.cache = new Cache(6, 3);
    this.instruction = null;
    this.cycles = 0;
  }

  // Get accumulator
  public get a(): number {
    return this.cache!.read('u8', 0)!;
  }

  // Set accumulator
  public set a(value: number) {
    this.cache!.write('u8', 0, value);
  }

  // Get index X
  public get x(): number {
    return this.cache!.read('u8', 1)!;
  }

  // Set index X
  public set x(value: number) {
    this.cache!.write('u8', 1, value);
  }

  // Get index Y
  public get y(): number {
    return this.cache!.read('u8', 2)!;
  }

  // Set index Y
  public set y(value: number) {
    this.cache!.write('u8', 2, value);
  }

  // Get program counter
  public get pc(): number {
    return this.cache!.read('u16', 0)!;
  }

  // Set program counter
  public set pc(value: number) {
    this.cache!.write('u16', 0, value);
  }

  // Get stack pointer
  public get s(): number {
    return this.cache!.read('u8', 3)!;
  }

  // Set stack pointer
  public set s(value: number) {
    this.cache!.write('u8', 3, value);
  }

  // Get status pointer
  public get p(): number {
    return this.cache!.read('u8', 4)!;
  }

  // Set status pointer
  public set p(value: number) {
    this.cache!.write('u8', 4, value);
  }

  // Get temporary byte
  public get temp(): number {
    return this.cache!.read('u8', 5)!;
  }

  // Set temporary byte
  public set temp(value: number) {
    this.cache!.write('u8', 5, value);
  }

  // Get absolute address
  public get abs(): number {
    return this.cache!.read('u16', 1)!;
  }

  // Set absolute address
  public set abs(value: number) {
    this.cache!.write('u16', 1, value);
  }

  // Get relative address
  public get rel(): number {
    return this.cache!.read('u16', 2)!;
  }

  // Set relative address
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

  // Get flag function
  public getFlag(flag: string): number {
    return CPU.flag.get(this.p, flag);
  }

  // Set flag function
  public setFlag(flag: string, state: boolean): void {
    CPU.flag.set(this.p, flag, state);
  }

  // Reset function
  public reset(): void {
    // Reset registers
    this.a = 0x00;
    this.x = 0x00;
    this.y = 0x00;
    this.pc = Factory.lh(this.read(0xfffc), this.read(0xfffd));
    this.s = 0xfd;
    this.p = 0x20;

    // Reset temporary values
    this.temp = 0x00;
    this.abs = 0x0000;
    this.rel = 0x0000;

    // Reset properties
    this.instruction = null;
    this.cycles = 8;
  }

  // Clock function
  public clock(): void {
    // Update information
    if (this.cycles === 0) {
      this.instruction = new Instruction(this.read(this.pc++));
      this.cycles = this.instruction.execute(this);
    }

    // Decrement cycle
    this.cycles--;
  }

  // Fetch function
  public fetch(): void {
    if (this.instruction!.addrmode === Assembly.IMP) {
      this.temp = this.read(this.abs);
    }
  }

  // Interrupt request function
  public irq(): void {
    if (!this.getFlag('i')) {
      Factory.interrupt(this, 'IRQ');
      this.cycles = 7;
    }
  }

  // Nonmaskable interrupt function
  public nmi(): void {
    Factory.interrupt(this, 'NMI');
  }

  // Get CPU flag
  public static get flag(): Flag {
    return cpuFlag;
  }
}

// Export
export default CPU;
