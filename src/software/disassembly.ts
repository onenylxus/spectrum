// Import
import Computer from '../system/computer';
import Matrix from '../assets/matrix.json';

// Disassembly class
class Disassembly {
  // Memory table function
  public static table(comp: Computer, page: number): string[][] {
    const ram = comp.cpuram, res = [];
    for (let j = 0; j < 16; j++) {
      const row = [];
      for (let i = 0; i < 16; i++) {
        row.push(ram.read(page << 8 + j << 4 + i)!);
      }
      res.push(row.map((v) => this.print(v)));
    }
    return res;
  }

  // Register function
  public static register(comp: Computer): string[] {
    const cpu = comp.cpu;
    return [cpu.a, cpu.x, cpu.y, cpu.pc & 0xff00, cpu.pc & 0x00ff, cpu.s, cpu.p].map((v) => this.print(v));
  }

  // Status function
  public static status(comp: Computer): boolean[] {
    const cpu = comp.cpu;
    return ['c', 'z', 'i', 'd', 'b', 'e', 'v', 'n'].map((f) => cpu.getFlag(f) > 0);
  }

  // Script function
  public static script(comp: Computer, start: number, end: number) {
    const cpu = comp.cpu, arr = [];
    let ptr = start;
    while (ptr <= end) {
      const line = [];
      line.push(ptr);
      line.push(cpu.read(ptr++));

      switch (Matrix[line[1]].addrmode) {
        case 'IMP':
          break;

        case 'IMM':
        case 'IZX':
        case 'IZY':
        case 'REL':
        case 'ZPG':
        case 'ZPX':
        case 'ZPY':
          line.push(cpu.read(ptr++));
          break;

        case 'ABS':
        case 'ABX':
        case 'ABY':
        case 'IND':
          line.push(cpu.read(ptr++));
          line.push(cpu.read(ptr++));
          break;

        default:
          throw new Error();
      }

      arr.push(line.map((v) => this.print(v)));
    }
    return arr;
  }

  // Print function
  private static print(value: number) {
    return value.toString(16).toUpperCase().padStart(2, '0');
  }
}

// Export
export default Disassembly;
