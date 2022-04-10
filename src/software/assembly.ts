// Import
import CPU from '../hardware/cpu';
import Factory from './factory';

// Assembly class
class Assembly {
  // Absolute
  public static ABS(cpu: CPU): number {
    cpu.abs = Factory.dr(cpu);
    return 0;
  }

  // Absolute, offset X
  public static ABX(cpu: CPU): number {
    const d = Factory.dr(cpu);
    cpu.abs = d + cpu.x;
    return Factory.hf(cpu.abs) !== Factory.hf(d) ? 1 : 0;
  }

  // Absolute, offset Y
  public static ABY(cpu: CPU): number {
    const d = Factory.dr(cpu);
    cpu.abs = d + cpu.y;
    return Factory.hf(cpu.abs) !== Factory.hf(d) ? 1 : 0;
  }

  // Immediate
  public static IMM(cpu: CPU): number {
    cpu.abs = cpu.pc++;
    return 0;
  }

  // Implied
  public static IMP(cpu: CPU): number {
    cpu.temp = cpu.a;
    return 0;
  }

  // Indirect
  public static IND(cpu: CPU): number {
    const d = Factory.dr(cpu);
    const v = Factory.lf(d) === 0xff ? Factory.hf(d) << 8 : d + 0x0001;
    cpu.abs = Factory.lh(cpu.read(d), cpu.read(v));
    return 0;
  }

  // Indirect, offset X
  public static IZX(cpu: CPU): number {
    const r = Factory.sr(cpu) + cpu.x;
    cpu.abs = Factory.lh(cpu.read(Factory.lf(r)), cpu.read(Factory.lf(r + 0x01)));
    return 0;
  }

  // Indirect, offset Y
  public static IZY(cpu: CPU): number {
    const r = Factory.sr(cpu);
    cpu.abs = Factory.lh(cpu.read(Factory.lf(r)), cpu.read(Factory.lf(r + 0x01)) + cpu.y);
    return Factory.hf(cpu.abs) !== Factory.hf(cpu.read(Factory.lf(r + 0x01))) ? 1 : 0;
  }

  // Relative
  public static REL(cpu: CPU): number {
    const d = Factory.dr(cpu);
    cpu.rel = d & 0x80 ? Factory.hf(cpu.rel) << 8 : d;
    return 0;
  }

  // Zero page
  public static ZPG(cpu: CPU): number {
    cpu.abs = Factory.dr(cpu);
    return 0;
  }

  // Zero page, offset X
  public static ZPX(cpu: CPU): number {
    cpu.abs = Factory.lf(Factory.dr(cpu) + cpu.x);
    return 0;
  }

  // Zero page, offset Y
  public static ZPY(cpu: CPU): number {
    cpu.abs = Factory.lf(Factory.dr(cpu) + cpu.y);
    return 0;
  }

  // Addition
  public static ADC(cpu: CPU): number {
    cpu.fetch();
    const t = cpu.a + cpu.temp + cpu.getFlag('c');
    Factory.cFlag(cpu, t);
    Factory.zFlag(cpu, t);
    Factory.vFlag(cpu, ~(cpu.a & cpu.temp) & (cpu.a ^ t) & 0x80);
    Factory.nFlag(cpu, t);
    cpu.a = Factory.lf(t);
    return 1;
  }

  // Logic AND
  public static AND(cpu: CPU): number {
    return Factory.logic(cpu, 'AND');
  }

  // Arithmetic shift left
  public static ASL(cpu: CPU): number {
    return Factory.shift(cpu, 'ASL');
  }

  // Branch, carry clear
  public static BCC(cpu: CPU): number {
    return Factory.branch(cpu, 'c', false);
  }

  // Branch, carry set
  public static BCS(cpu: CPU): number {
    return Factory.branch(cpu, 'c', true);
  }

  // Branch, equal
  public static BEQ(cpu: CPU): number {
    return Factory.branch(cpu, 'z', true);
  }

  // Bit test
  public static BIT(cpu: CPU): number {
    cpu.fetch();
    const t = cpu.a & cpu.temp;
    Factory.zFlag(cpu, t);
    Factory.nFlag(cpu, cpu.temp);
    Factory.vFlag(cpu, cpu.temp & 0x40);
    return 0;
  }

  // Branch, negative
  public static BMI(cpu: CPU): number {
    return Factory.branch(cpu, 'n', true);
  }

  // Branch, not equal
  public static BNE(cpu: CPU): number {
    return Factory.branch(cpu, 'z', false);
  }

  // Branch, positive
  public static BPL(cpu: CPU): number {
    return Factory.branch(cpu, 'n', false);
  }

  // Break
  public static BRK(cpu: CPU): number {
    cpu.setFlag('i', true);
    cpu.setFlag('b', true);
    cpu.write(0x0100 + cpu.s--, Factory.hf(++cpu.pc));
    cpu.write(0x0100 + cpu.s--, Factory.lf(cpu.pc));
    cpu.write(0x0100 + cpu.s--, cpu.p);
    cpu.pc = Factory.lh(cpu.read(0xfffe), cpu.read(0xffff));
    cpu.setFlag('b', false);
    return 0;
  }

  // Branch, overflow clear
  public static BVC(cpu: CPU): number {
    return Factory.branch(cpu, 'v', false);
  }

  // Branch, overflow set
  public static BVS(cpu: CPU): number {
    return Factory.branch(cpu, 'v', true);
  }

  // Clear, carry
  public static CLC(cpu: CPU): number {
    cpu.setFlag('c', false);
    return 0;
  }

  // Clear, decimal
  public static CLD(cpu: CPU): number {
    cpu.setFlag('d', false);
    return 0;
  }

  // Clear, interrupt
  public static CLI(cpu: CPU): number {
    cpu.setFlag('i', false);
    return 0;
  }

  // Clear, overflow
  public static CLV(cpu: CPU): number {
    cpu.setFlag('v', false);
    return 0;
  }

  // Compare, with A
  public static CMP(cpu: CPU): number {
    return Factory.compare(cpu, cpu.a);
  }

  // Compare, with X
  public static CPX(cpu: CPU): number {
    return Factory.compare(cpu, cpu.x);
  }

  // Compare, with Y
  public static CPY(cpu: CPU): number {
    return Factory.compare(cpu, cpu.y);
  }

  // Decrement
  public static DEC(cpu: CPU): number {
    cpu.fetch();
    cpu.write(cpu.abs, --cpu.temp);
    Factory.zFlag(cpu, cpu.temp);
    Factory.nFlag(cpu, cpu.temp);
    return 0;
  }

  // Decrement, with X
  public static DEX(cpu: CPU): number {
    Factory.zFlag(cpu, --cpu.x);
    Factory.nFlag(cpu, cpu.x);
    return 0;
  }

  // Decrement, with Y
  public static DEY(cpu: CPU): number {
    Factory.zFlag(cpu, --cpu.y);
    Factory.nFlag(cpu, cpu.y);
    return 0;
  }

  // Logic XOR
  public static EOR(cpu: CPU): number {
    return Factory.logic(cpu, 'EOR');
  }

  // Increment
  public static INC(cpu: CPU): number {
    cpu.fetch();
    cpu.write(cpu.abs, ++cpu.temp);
    return 0;
  }

  // Increment, with X
  public static INX(cpu: CPU): number {
    Factory.zFlag(cpu, ++cpu.x);
    Factory.nFlag(cpu, cpu.x);
    return 0;
  }

  // Increment, with Y
  public static INY(cpu: CPU): number {
    Factory.zFlag(cpu, ++cpu.y);
    Factory.nFlag(cpu, cpu.y);
    return 0;
  }

  // Jump, address
  public static JMP(cpu: CPU): number {
    cpu.pc = cpu.abs;
    return 0;
  }

  // Jump, subroutine
  public static JSR(cpu: CPU): number {
    cpu.write(0x0100 + cpu.s--, Factory.hf(--cpu.pc));
    cpu.write(0x0100 + cpu.s--, Factory.lf(cpu.pc));
    cpu.pc = cpu.abs;
    return 0;
  }

  // Load, with A
  public static LDA(cpu: CPU): number {
    return Factory.load(cpu, 'a');
  }

  // Load, with X
  public static LDX(cpu: CPU): number {
    return Factory.load(cpu, 'x');
  }

  // Load, with Y
  public static LDY(cpu: CPU): number {
    return Factory.load(cpu, 'y');
  }

  // Logical shift right
  public static LSR(cpu: CPU): number {
    return Factory.shift(cpu, 'LSR');
  }

  // No operation
  public static NOP(cpu: CPU): number {
    return 0;
  }

  // Logic OR
  public static ORA(cpu: CPU): number {
    return Factory.logic(cpu, 'ORA');
  }

  // Push, with A
  public static PHA(cpu: CPU): number {
    cpu.write(0x0100 + cpu.s--, cpu.a);
    return 0;
  }

  // Push, with P
  public static PHP(cpu: CPU): number {
    cpu.write(cpu.s--, cpu.p | 0x30);
    cpu.setFlag('b', false);
    cpu.setFlag('e', false);
    return 0;
  }

  // Pop, with A
  public static PLA(cpu: CPU): number {
    cpu.a = cpu.read(0x0100 + ++cpu.s);
    Factory.zFlag(cpu, cpu.a);
    Factory.nFlag(cpu, cpu.a);
    return 0;
  }

  // Pop, with P
  public static PLP(cpu: CPU): number {
    cpu.p = cpu.read(0x0100 + ++cpu.s);
    return 0;
  }

  // Rotate left
  public static ROL(cpu: CPU): number {
    return Factory.shift(cpu, 'ROL');
  }

  // Rotate right
  public static ROR(cpu: CPU): number {
    return Factory.shift(cpu, 'ROR');
  }

  // Return, interrupt
  public static RTI(cpu: CPU): number {
    cpu.p = cpu.read(0x0100 + ++cpu.s);
    cpu.setFlag('b', false);
    cpu.setFlag('e', false);
    cpu.pc = Factory.lh(cpu.read(0x0100 + ++cpu.s), cpu.read(0x0100 + ++cpu.s));
    return 0;
  }

  // Return, subroutine
  public static RTS(cpu: CPU): number {
    cpu.pc = Factory.lh(cpu.read(0x0100 + ++cpu.s), cpu.read(0x0100 + ++cpu.s));
    return 0;
  }

  // Subtraction
  public static SBC(cpu: CPU): number {
    cpu.fetch();
    const v = cpu.temp ^ 0xff;
    const t = cpu.a + v + cpu.getFlag('c');
    Factory.cFlag(cpu, t);
    Factory.zFlag(cpu, t);
    Factory.vFlag(cpu, (t ^ cpu.a) & (t ^ v) & 0x80);
    Factory.nFlag(cpu, t);
    cpu.a = Factory.lf(t);
    return 1;
  }

  // Set, carry
  public static SEC(cpu: CPU): number {
    cpu.setFlag('c', true);
    return 0;
  }

  // Set, decimal
  public static SED(cpu: CPU): number {
    cpu.setFlag('d', true);
    return 0;
  }

  // Set, interrupt
  public static SEI(cpu: CPU): number {
    cpu.setFlag('i', true);
    return 0;
  }

  // Store, with A
  public static STA(cpu: CPU): number {
    return Factory.store(cpu, 'a');
  }

  // Store, with X
  public static STX(cpu: CPU): number {
    return Factory.store(cpu, 'x');
  }

  // Store, with Y
  public static STY(cpu: CPU): number {
    return Factory.store(cpu, 'y');
  }

  // Transfer, from A to X
  public static TAX(cpu: CPU): number {
    return Factory.transfer(cpu, 'a', 'x');
  }

  // Transfer, from A to Y
  public static TAY(cpu: CPU): number {
    return Factory.transfer(cpu, 'a', 'y');
  }

  // Transfer, from S to X
  public static TSX(cpu: CPU): number {
    return Factory.transfer(cpu, 's', 'x');
  }

  // Transfer, from X to A
  public static TXA(cpu: CPU): number {
    return Factory.transfer(cpu, 'x', 'a');
  }

  // Transfer, from X to S
  public static TXS(cpu: CPU): number {
    return Factory.transfer(cpu, 'x', 's');
  }

  // Transfer, from Y to A
  public static TYA(cpu: CPU): number {
    return Factory.transfer(cpu, 'y', 'a');
  }
}

// Export
export default Assembly;
