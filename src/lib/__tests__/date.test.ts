import { DateFormat, formatDate } from '../date';

describe('formatDate', () => {
  describe('Parsing invalid date strings', () => {
    test('returns the string that could not be parsed', () => {
      expect(formatDate('invalid yes')).toBe('invalid yes');
      expect(formatDate('Sep 32, 2021')).toBe('Sep 32, 2021');
    });
  });

  describe('Parsing valid date strings', () => {
    test('parses ISO8601 UTC correctly', () => {
      expect(formatDate('2021-09-20T08:13:44.093Z')).toBe('Sep 20, 2021');
    });

    test('parses ISO8601 with timezone offset correctly', () => {
      expect(formatDate('2021-09-20T12:42:18-05:00')).toBe('Sep 20, 2021');
    });

    test('parses year only correctly', () => {
      expect(formatDate('2021')).toBe('2021');
    });

    // Didn't work pre-DayJS swap... fix?
    test.skip('parses month and year correctly', () => {
      expect(formatDate('Sep, 2021')).toBe('Sep, 2021');
    });

    // Didn't work pre-DayJS swap... fix?
    test.skip('parses full date correctly', () => {
      expect(formatDate('Sep 1, 2021')).toBe('Sep 1, 2021');
    });

    // Didn't work pre-DayJS swap... fix?
    test.skip('parses full date correctly', () => {
      expect(formatDate('Sep 01, 2021')).toBe('Sep 1, 2021');
    });

    // Didn't work pre-DayJS swap... fix?
    test.skip('parses full date correctly', () => {
      expect(formatDate('Sep 12, 2021')).toBe('Sep 12, 2021');
    });

    test('parses short date correctly', () => {
      expect(formatDate('12/09/2021', DateFormat.DateFull)).toBe('Sep 12, 2021');
      expect(formatDate('1/09/2021', DateFormat.DateFull)).toBe('Sep 1, 2021');
      expect(formatDate('12/12/2021', DateFormat.DateFull)).toBe('Dec 12, 2021');
      expect(formatDate('12/1/2021', DateFormat.DateFull)).toBe('Dec 1, 2021');
      expect(formatDate('12/01/2021', DateFormat.DateFull)).toBe('Jan 12, 2021');
    });
  });

  describe('formatting valid dates', () => {
    describe('default formatting', () => {
      describe('input is valid date contains at least 8 digits (YYYYMMDD)', () => {
        test('formats to a full date', () => {
          expect(formatDate('1999-01-02T12:42:18-05:00')).toBe('Jan 2, 1999');
        });
      });
      describe('input is valid date contains between 6 and 8 digits (YYYYMM)', () => {
        test('formats to month-year', () => {
          expect(formatDate('199901')).toBe('Jan, 1999');
        });
      });
      describe('input is valid date contains four digits or less (YYYY)', () => {
        test('formats to year only', () => {
          expect(formatDate('1999')).toBe('1999');
        });
      });
    });

    describe('with a custom format', () => {
      test('formats to the passed in custom format', () => {
        expect(formatDate('1/09/2021', DateFormat.YearOnly)).toBe('2021');
        expect(formatDate('1/09/2021', DateFormat.MonthYear)).toBe('Sep, 2021');
        expect(formatDate('1/09/2021', DateFormat.MonthDate)).toBe('09/01');
        expect(formatDate('1/09/2021', DateFormat.DateFull)).toBe('Sep 1, 2021');
        expect(formatDate('1/09/2021', DateFormat.DateShort)).toBe('01/09/2021');
        expect(formatDate('1/09/2021', DateFormat.DateShortStroke)).toBe('2021-09-01');
        expect(formatDate('1/09/2021', DateFormat.HoursFull)).toBe('00 AM');
        expect(formatDate('1/09/2021', DateFormat.MonthShort)).toBe('01 Sep,2021');
        expect(formatDate('1/09/2021', DateFormat.MonthShortWithSpace)).toBe('01 Sep, 2021');
        expect(formatDate('1/09/2021', DateFormat.DayShortMonthShortWithSpace)).toBe('1 Sep, 2021');
        expect(formatDate('1/09/2021', DateFormat.DateTime)).toBe('01 Sep, 2021 00:00');
        // TODO: @pabloscdo do we really want to show dates in UTC? I think the locale is preferred...
        expect(formatDate('2021-09-01T12:42:18-05:00', DateFormat.DateTime)).toBe('01 Sep, 2021 17:42');
        expect(formatDate('2021-09-01T12:42:18Z', DateFormat.DateTime)).toBe('01 Sep, 2021 12:42');
        expect(formatDate('1/09/2021', DateFormat.DayMonthShort)).toBe('01 Sep');
      });
    });
  });
});
