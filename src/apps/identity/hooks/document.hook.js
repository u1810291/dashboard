import { compact } from 'lodash';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { selectCountriesList } from 'state/countries/countries.selectors';

export function useDocumentTitle(document) {
  const intl = useIntl();
  const countries = useSelector(selectCountriesList);
  const found = countries.find(({ code }) => code === document.country);
  const countryName = found ? found.name : document.country;

  return intl.formatMessage({ id: 'DocumentStep.title' }, {
    document: intl.formatMessage({ id: `flow.documentTypeStep.${document.type}` }),
    country: compact([countryName, document.region]).join(', '),
  });
}
