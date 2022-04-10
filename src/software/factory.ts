// Import
import Assembly from './assembly';
import CPU from '../hardware/cpu';

// Types
type InterruptType = 'IRQ' | 'NMI';
type LogicType = 'AND' | 'EOR' | 'ORA';
type RegisterType = 'a' | 'x' | 'y' | 's';
type ShiftType = 'ASL' | 'LSR' | 'ROL' | 'ROR';

// Factory class
class Factory {
  // Combine low and high byte
  public static lh(l: number, h: number): number {
    return (h << 8) | l;
  }

  // Filter low byte
  public static lf(v: number): number {
    return v & 0x00ff;
  }

  // Filter high byte
  public static hf(v: number): number {
    return (v & 0xff00) >> 8;
  }

  // Single read
  public static sr(cpu: CPU): number {
    return cpu.read(cpu.pc++);
  }

  // Double read
  public static dr(cpu: CPU): number {
    return this.lh(this.sr(cpu), this.sr(cpu));
  }

  // Set carry flag
  public static cFlag(cpu: CPU, v: number): void {
    cpu.setFlag('c', this.hf(v) > 0);
  }

  // Set zero flag
  public static zFlag(cpu: CPU, v: number): void {
    cpu.setFlag('z', this.lf(v) === 0);
  }

  // Set overflow flag
  public static vFlag(cpu: CPU, v: number): void {
    cpu.setFlag('v', !!v);
  }

  // Set negative flag
  public static nFlag(cpu: CPU, v: number): void {
    cpu.setFlag('n', !!(v & 0x80));
  }

  // Branch function
  public static branch(cpu: CPU, f: string, s: boolean): number {
    if (!!cpu.getFlag(f) === s) {
      cpu.abs = cpu.pc + cpu.rel;
      cpu.cycles += this.hf(cpu.abs) !== this.hf(cpu.pc) ? 2 : 1;
      cpu.pc = cpu.abs;
    }
    return 0;
  }

  // Compare function
  public static compare(cpu: CPU, v: number): number {
    cpu.fetch();
    const t = v - cpu.temp;
    this.cFlag(cpu, t);
    this.zFlag(cpu, t);
    this.nFlag(cpu, t);
    return 0;
  }

  // Interrupt function
  public static interrupt(cpu: CPU, op: InterruptType): number {
    const t = op === 'IRQ' ? 0xfffe : 0xfffa;
    cpu.write(0x0080 + cpu.s--, this.hf(cpu.pc));
    cpu.write(0x0080 + cpu.s--, this.lf(cpu.pc));
    cpu.setFlag('b', false);
    cpu.setFlag('e', true);
    cpu.setFlag('i', true);
    cpu.write(0x0080 + cpu.s--, cpu.p);
    cpu.pc = this.lh(cpu.read(t), cpu.read(t + 1));
    return 0;
  }

  // Load function
  public static load(cpu: CPU, r: RegisterType): number {
    cpu.fetch();
    cpu[r] = cpu.temp;
    this.zFlag(cpu, cpu[r]);
    this.nFlag(cpu, cpu[r]);
    return 0;
  }

  // Logic function
  public static logic(cpu: CPU, op: LogicType): number {
    cpu.fetch();
    switch (op) {
      case 'AND': cpu.a &= cpu.temp; break;
      case 'EOR': cpu.a ^= cpu.temp; break;
      case 'ORA': cpu.a |= cpu.temp; break;
    }
    this.zFlag(cpu, cpu.a);
    this.nFlag(cpu, cpu.a);
    return 1;
  }

  // Shift function
  public static shift(cpu: CPU, op: ShiftType): number {
    cpu.fetch();
    let t = 0;
    switch (op) {
      case 'ASL': t = cpu.temp << 1; break;
      case 'LSR': t = cpu.temp >> 1; break;
      case 'ROL': t = (cpu.temp << 1) | cpu.getFlag('c'); break;
      case 'ROR': t = (cpu.temp >> 1) | (cpu.getFlag('c') << 7); break;
    }
    this.cFlag(cpu, t);
    this.zFlag(cpu, t);
    this.nFlag(cpu, t);
    if (cpu.instruction!.addrmode === Assembly.IMP) {
      cpu.a = this.lf(t);
    } else {
      cpu.write(cpu.abs, this.lf(t));
    }
    return 0;
  }

  // Store function
  public static store(cpu: CPU, r: RegisterType): number {
    cpu.write(cpu.abs, cpu[r]);
    return 0;
  }

  // Transfer function
  public static transfer(cpu: CPU, u: RegisterType, v: RegisterType): number {
    cpu[v] = cpu[u];
    this.zFlag(cpu, cpu[v]);
    this.nFlag(cpu, cpu[v]);
    return 0;
  }
}

// Export
export default Factory;
