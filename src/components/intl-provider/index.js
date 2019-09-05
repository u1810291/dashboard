import PropTypes from 'prop-types';
import React from 'react';
import { get } from 'lodash';
import { IntlProvider } from 'react-intl';
import translations from 'translations';
import { useSelector } from 'react-redux';

const defaultLang = 'en';

const Intl = ({ language = defaultLang, children }) => {
  const currentLang = useSelector(
    (state) => get(state, 'merchant.configuration.dashboard.language'),
  ) || language;

  return (
    <IntlProvider locale={currentLang} messages={translations[currentLang]}>
      {children}
    </IntlProvider>
  );
};

Intl.propTypes = {
  language: PropTypes.string,
};

Intl.defaultProps = {
  language: defaultLang,
};

export default Intl;
