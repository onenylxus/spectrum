// Unsigned 16-bit integer class
class Uint16 {
  // Constructor
  private _value!: number;

  constructor(num: number = 0) {
    this.value = num;
  }

  /* ------------------------ division ------------------------ */

  // Get integer size
  public static get size(): number {
    return 2 ** 16;
  }

  /* ------------------------ division ------------------------ */

  // Get value
  public get value(): number {
    return this._value;
  }

  // Set value
  public set value(num: number) {
    num = Math.trunc(num);
    while (num < 0) { num += Uint16.size; }
    while (num >= Uint16.size) { num -= Uint16.size; }
    this._value = num;
  }
}

/* ------------------------ division ------------------------ */

// Export
export default Uint16;
