// List interface
interface List<T> {
  [index: string]: T,
};

/* ------------------------ division ------------------------ */

// Component option
type ComponentOption = 'audio' | 'clock' | 'computer' | 'graphics' | 'input';

// Hardware option
type HardwareOption = 'apu' | 'bus' | 'cpu' | 'ppu' | 'ram';
