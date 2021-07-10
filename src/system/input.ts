// Import
import Clock from './clock';
import Component from '../structs/component';
import Graphics from './graphics';
import Kernel from './kernel';

/* ------------------------ division ------------------------ */

// Input class
class Input extends Component {
  // Constructor
  private _mousePosition: Position;
  private _mouseAnchor: Position;
  private _mouseButton: number;
  private _mouseWheel: number;

  private _keyboardMap: List<boolean>;
  private _keyboardSet: string[];

  public constructor(parent: Kernel) {
    // Super
    super(parent, 'input');

    // Mouse properties
    this._mousePosition = { x: -1, y: -1 };
    this._mouseAnchor = { x: -1, y: -1 };
    this._mouseButton = 0;
    this._mouseWheel = 0;

    // Keyboard properties
    this._keyboardMap = {};
    this._keyboardSet = [];

    /* ------------------------ division ------------------------ */

    // Find components
    let clock: Clock = this.find('clock') as Clock;
    let graphics: Graphics = this.find('graphics') as Graphics;

    /* ------------------------ division ------------------------ */

    // Mouse movement event
    graphics.canvas!.onmousemove = (e: MouseEvent) => {
      this._mousePosition.x = e.offsetX;
      this._mousePosition.y = e.offsetY;
    };

    // Mouse button event
    graphics.canvas!.onmousedown = (e: MouseEvent) => {
      this._mouseAnchor = Object.assign({}, this._mousePosition);
      this._mouseButton = e.button + 1;
    };
    graphics.canvas!.onmouseup = (e: MouseEvent) => {
      this._mouseAnchor = Object.assign({}, this._mousePosition);
      this._mouseButton = 0;
    };

    // Mouse wheel event
    let wt: NodeJS.Timeout;
    graphics.canvas!.onscroll = (e: Event) => {
      clearTimeout(wt);
      this._mouseWheel = Math.sign((e as WheelEvent).deltaY);
      wt = setTimeout(() => { this._mouseWheel = 0; }, clock.period);
    };

    /* ------------------------ division ------------------------ */

    // Keyboard key event
    let kf = () => {
      this._keyboardSet = [];
      for (var key in this._keyboardMap) {
        if (this._keyboardMap[key]) {
          this._keyboardSet.push(key);
        }
      }
    };
    graphics.canvas!.onkeydown = (e: KeyboardEvent) => {
      e.preventDefault();
      this._keyboardMap[e.code] = true;
      kf();
    }
    graphics.canvas!.onkeydown = (e: KeyboardEvent) => {
      e.preventDefault();
      this._keyboardMap[e.code] = false;
      kf();
    }
  }
}

/* ------------------------ division ------------------------ */

// Export
export default Input;
