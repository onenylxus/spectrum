// Import
import Component from '../structs/component';
import Kernel from './kernel';

/* ------------------------ division ------------------------ */

// Clock class
class Clock extends Component {
  // Constructor
  public limit: number;
  private _now: number;
  private _then: number;
  private _frames: number[];

  public constructor(parent: Kernel) {
    // Super
    super(parent, 'clock');

    // Properties
    this.limit = 60;
    this._now = Date.now();
    this._then = Date.now();
    this._frames = [];
  }

  /* ------------------------ division ------------------------ */

  // Get delta
  private get _delta(): number {
    return this._now - this._then;
  }

  // Get period
  public get period(): number {
    return Math.ceil(1000 / this.limit);
  }

  // Get frames per second
  public get fps(): number {
    return this._frames.length;
  }

  /* ------------------------ division ------------------------ */

  // Gate function
  public gate(): boolean {
    this._now = Date.now();
    this._frames = this._frames.filter((t) => this._now - t < 1000);
    if (this._delta >= this.period) {
      this._then = this._now - (this._delta % this.period);
      this._frames.push(this._now);
      return true;
    }
    return false;
  }
}

/* ------------------------ division ------------------------ */

// Export
export default Clock;
