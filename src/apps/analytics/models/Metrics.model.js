import { appPalette } from 'apps/theme/app.palette';
import { DocumentTypes } from 'models/Document.model';

export const StubBarColor = appPalette.black7;
export const StubTickColor = appPalette.black7;

export const byDocumentTypes = [
  { id: DocumentTypes.Passport },
  { id: DocumentTypes.DrivingLicense },
  { id: DocumentTypes.NationalId },
  { id: DocumentTypes.ProofOfResidency },
];

export const byDateStub = [
  {
    label: 'Jan',
    value: 10,
  },
  {
    label: 'Feb',
    value: 23,
  },
  {
    label: 'Mar',
    value: 36,
  },
  {
    label: 'Apr',
    value: 50,
  },
  {
    label: 'Jun',
    value: 45,
  },
  {
    label: 'Jul',
    value: 40,
  },
  {
    label: 'Aug',
    value: 55,
  },
  {
    label: 'Sep',
    value: 70,
  },
  {
    label: 'Oct',
    value: 50,
  },
  {
    label: 'Nov',
    value: 30,
  },
  {
    label: 'Dec',
    value: 40,
  },
];

export const byCountryStub = [
  {
    label: 'Country 1',
    value: 98,
  },
  {
    label: 'Country 2',
    value: 32,
  },
  {
    label: 'Country 3',
    value: 22,
  },
  {
    label: 'Country 4',
    value: 14,
  },
  {
    label: 'Country 5',
    value: 1,
  },
];

export const byHourStub = [
  {
    label: '00 AM',
    value: 58,
  },
  {
    label: '01 AM',
    value: 39,
  },
  {
    label: '02 AM',
    value: 4,
  },
  {
    label: '03 AM',
    value: 1,
  },
  {
    label: '04 AM',
    value: 1,
  },
  {
    label: '05 AM',
    value: 3,
  },
  {
    label: '06 AM',
    value: 5,
  },
  {
    label: '07 AM',
    value: 20,
  },
  {
    label: '08 AM',
    value: 38,
  },
  {
    label: '09 AM',
    value: 69,
  },
  {
    label: '10 AM',
    value: 92,
  },
  {
    label: '11 AM',
    value: 93,
  },
  {
    label: '12 PM',
    value: 77,
  },
  {
    label: '13 PM',
    value: 81,
  },
  {
    label: '14 PM',
    value: 72,
  },
  {
    label: '15 PM',
    value: 47,
  },
  {
    label: '16 PM',
    value: 25,
  },
  {
    label: '17 PM',
    value: 80,
  },
  {
    label: '18 PM',
    value: 85,
  },
  {
    label: '19 PM',
    value: 67,
  },
  {
    label: '20 PM',
    value: 47,
  },
  {
    label: '21 PM',
    value: 65,
  },
  {
    label: '22 PM',
    value: 70,
  },
  {
    label: '23 PM',
    value: 61,
  },
];

export const byDateOfWeekStubValues = [48, 78, 103, 42, 105, 83, 58];

export const OTHER_COUNTRIES = 'otherCountries';

export const TabTypes = {
  byHours: 'byHours',
  byWeeks: 'byWeeks',
  byDays: 'byDays',
  byMonths: 'byMonths',
  byCountry: 'byCountry',
};

export const byPeriodTabs = [
  { id: TabTypes.byHours },
  { id: TabTypes.byDays },
  { id: TabTypes.byWeeks },
  { id: TabTypes.byMonths },
  { id: TabTypes.byCountry },
];

// TODO @snimshchikov make a hook
export function getCountry(list, id, intl) {
  if (!id) {
    return intl.formatMessage({ id: 'Countries.unknownCountry' });
  }
  if (id === OTHER_COUNTRIES) {
    return intl.formatMessage({ id: 'Countries.otherCountries' });
  }
  const country = list.find((item) => item.id === id);
  return country ? country.name : id;
}
