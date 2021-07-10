// List interface
interface List<T> {
  [index: string]: T,
};

// Position interface
interface Position {
  x: number,
  y: number
};

// Path interface
interface Path {
  fill(): void,
  stroke(): void,
};

/* ------------------------ division ------------------------ */

// Component option
type ComponentOption = 'audio' | 'clock' | 'computer' | 'graphics' | 'input';

// Hardware option
type HardwareOption = 'apu' | 'bus' | 'cartridge' | 'controllerA' | 'controllerB' | 'cpu' | 'ppu' | 'ram';
