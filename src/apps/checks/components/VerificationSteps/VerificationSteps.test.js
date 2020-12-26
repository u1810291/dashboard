import { accessibleItems, addItem, removeItem, replaceItem } from './VerificationSteps';

describe('helpers', () => {
  test('removeItem', () => {
    expect(removeItem([1, 2, 3, 4], 2)).toEqual([1, 2, 4]);
  });

  test('replaceItem', () => {
    expect(replaceItem([1, 2, 3, 4], 2, 'new')).toEqual([1, 2, 'new', 4]);
  });

  test('addItem', () => {
    expect(addItem([1, 2, 3, 4], 'new')).toEqual([1, 2, 3, 4, 'new']);
  });

  test('accessibleItems', () => {
    const mandatory = ['a'];
    const available = ['b', 'c', 'd', 'e', 'f'];
    const steps = [['b', 'c'], ['d']];
    expect(accessibleItems(available, mandatory, steps, 0)).toEqual([
      'b',
      'c',
      'e',
      'f',
    ]);
    expect(accessibleItems(available, mandatory, steps, 1)).toEqual([
      'd',
      'e',
      'f',
    ]);
    expect(accessibleItems(available, mandatory, steps)).toEqual(['e', 'f']);
  });
});
