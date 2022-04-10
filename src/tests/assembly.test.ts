// Import
import Assembly from '../software/assembly';
import List from '../assets/list.json';

/* ------------------------ division ------------------------ */

// Check addressing modes
describe('Check addressing modes', () => {
  List.addrmode.forEach((k) => {
    test(`${k}`, () => {
      expect(Assembly.hasOwnProperty(k)).toBeTruthy();
    });
  });
});

// Check operations
describe('Check operations', () => {
  List.operation.forEach((k) => {
    test(`${k}`, () => {
      expect(Assembly.hasOwnProperty(k)).toBeTruthy();
    });
  });
});
