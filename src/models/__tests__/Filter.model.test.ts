import { allDatePickerRanges, identifyRange } from '../Filter.model';

describe('identifyRange', () => {
  describe('Returns the correct ID for the range', () => {
    test('identifies all ranges correctly', () => {
      const ficticiousRegistrationDate = '2012-12-21';
      allDatePickerRanges.forEach(({ id, getDateRange }) => {
        const range = getDateRange(ficticiousRegistrationDate);
        const resultId = identifyRange(range.start, range.end, ficticiousRegistrationDate, allDatePickerRanges);
        expect(resultId).toBe(id);
      });
    });
  });
});
