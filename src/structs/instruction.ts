// Import
import Assembly from '../software/assembly';
import CPU from '../hardware/cpu';
import Matrix from '../assets/matrix.json';

// Instruction class
class Instruction {
  public addrmode: (cpu: CPU) => number;
  public operation: (cpu: CPU) => number;
  public cycles: number;

  // Constructor
  public constructor(opcode: number) {
    // Properties
    this.addrmode = Assembly[Matrix[opcode].addrmode as keyof typeof Assembly] as (cpu: CPU) => number;
    this.operation = Assembly[Matrix[opcode].operation as keyof typeof Assembly] as (cpu: CPU) => number;
    this.cycles = Matrix[opcode].cycles;
  }

  // Execute function
  public execute(cpu: CPU): number {
    return this.cycles + (this.addrmode(cpu) & this.operation(cpu));
  }
}

// Export
export default Instruction;
