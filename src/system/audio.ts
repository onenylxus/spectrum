// Import
import Tone from 'tone';
import Component from '../structs/component';
import Kernel from './kernel';

/* ------------------------ division ------------------------ */

// Audio class
class Audio extends Component {
  // Constructor
  public constructor(parent: Kernel) {
    // Super
    super(parent, 'audio');
  }

  /* ------------------------ division ------------------------ */

  // Play synth sound
  public play(freq: Tone.Unit.Frequency, time: Tone.Unit.Time) {
    const synth: Tone.Synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease(freq, time);
  }
}

/* ------------------------ division ------------------------ */

// Export
export default Audio;
