// Import
import Component from '../structs/component';
import Kernel from './kernel';

/* ------------------------ division ------------------------ */

// Graphics class
class Graphics extends Component {
  // Constructor
  private _canvas: HTMLCanvasElement | null;
  private _context?: CanvasRenderingContext2D | null;

  public constructor(parent: Kernel) {
    // Super
    super(parent, 'graphics');

    // Properties
    this._canvas = document.querySelector('canvas');
    this._context = this._canvas!.getContext('2d');
  }

  /* ------------------------ division ------------------------ */

  // Get canvas
  public get canvas(): HTMLCanvasElement | null {
    return this._canvas;
  }

  // Get window width
  public get width(): number {
    return this._canvas!.width;
  }

  // Get window height
  public get height(): number {
    return this._canvas!.height;
  }

  /* ------------------------ division ------------------------ */

  // Color preference
  public color(c: string = '#000000', a: number = 100): void {
    this._context!.fillStyle = this._context!.strokeStyle = /^#(?:[\da-f]{3}){1,2}$/.test(c) ? c : '#000000';
    this._context!.globalAlpha = a >= 0 && a <= 100 ? a / 100 : 1;
  }

  // Size preference
  public size(s: number = 1): void {
    this._context!.lineWidth = s > 0 ? s : 1;
  }

  // Font preference
  public font(f: string = '12px sans-serif'): void {
    this._context!.font = f;
  }

  // Align preference
  public align(a: CanvasTextAlign = 'start'): void {
    this._context!.textAlign = a;
  }

  // Reset preferences
  public reset(): void {
    this.color();
    this.size();
    this.font();
    this.align();
  }

  /* ------------------------ division ------------------------ */

  // Draw dot
  public dot(x: number, y: number): Path {
    return this.circ(x, y, 1);
  }

  // Draw line
  public line(x1: number, y1: number, x2: number, y2: number): void {
    return this.finish(() => {
      this._context!.moveTo(x1, y1);
      this._context!.lineTo(x2, y2);
    })!.stroke();
  }

  // Draw triangle
  public tri(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): Path {
    return this.poly(x1, y1, x2, y2, x3, y3);
  }

  // Draw rectangle
  public rect(x: number, y: number, w: number, h: number): Path {
    return {
      fill: () => this._context!.fillRect(x, y, w, h),
      stroke: () => this._context!.strokeRect(x, y, w, h),
    };
  }

  // Draw quadrilateral
  public quad(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number): Path {
    return this.poly(x1, y1, x2, y2, x3, y3, x4, y4);
  }

  // Draw polygon
  public poly(...p: number[]): Path {
    if (p.length < 6 || p.length % 2 === 1) {
      return {
        fill: () => null,
        stroke: () => null,
      };
    }

    return this.finish(() => {
      this._context!.moveTo(p[0], p[1]);
      for (var i = p.length / 2 - 1; i >= 0; i--) {
        this._context!.lineTo(p[i * 2], p[i * 2 + 1]);
      }
    });
  }

  // Draw arc
  public arc(x: number, y: number, r: number, s: number, t: number): Path {
    return this.finish(() => {
      this._context!.arc(x, y, r, s, t);
    });
  }

  // Draw circle
  public circ(x: number, y: number, r: number): Path {
    return this.arc(x, y, r, 0, 2 * Math.PI);
  }

  // Clear function
  public clear(): void {
    // Resize window
    this._canvas!.width = window.innerWidth;
    this._canvas!.height = window.innerHeight;

    // Draw background
    this.reset();
    this.rect(0, 0, this.width, this.height)!.fill();
  }

  /* ------------------------ division ------------------------ */

  // Finish function
  finish(f: () => void): Path {
    return {
      fill: () => {
        this._context!.beginPath();
        (f)();
        this._context!.fill();
      },
      stroke: () => {
        this._context!.beginPath();
        (f)();
        this._context!.stroke();
      }
    }
  }
}

/* ------------------------ division ------------------------ */

// Export
export default Graphics;
