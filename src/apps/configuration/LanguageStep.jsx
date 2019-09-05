import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Select, { components } from 'react-select';

import icons from 'assets/language-icons';
import CSS from './LanguageStep.module.css';

// TODO: Split all these components

function LanguageLine({ language }) {
  return (
    <div className={CSS.languageLine}>
      <img src={icons[language]} alt="" />
      <FormattedMessage id={`flow.languageStep.${language}`} />
    </div>
  );
}

LanguageLine.propTypes = {
  language: PropTypes.string.isRequired,
};

function Option({ children, ...rest }) {
  const { data, ...props } = rest;
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <components.Option {...props}>
      <span data-role={`languageOption-${data.value}`}>
        <LanguageLine language={data.value} />
      </span>
    </components.Option>
  );
}

Option.propTypes = {
  data: PropTypes.shape({
    value: PropTypes.string,
  }).isRequired,
};

function SingleValue({ children, ...rest }) {
  const { data, ...props } = rest;
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <components.SingleValue {...props}>
      <span data-role="languageSingleValue">
        <LanguageLine language={data.value} />
      </span>
    </components.SingleValue>
  );
}

SingleValue.propTypes = {
  data: PropTypes.shape({
    value: PropTypes.string,
  }).isRequired,
};

export default function LanguageStep({ availableLanguages, onClick, style }) {
  const options = availableLanguages.map((code) => ({ value: code }));
  const handleChange = (value) => {
    onClick({ style: { ...style, language: value } });
  };
  return (
    <fieldset className="mgi-fieldset configure-flow-card">
      <legend>
        <h3>
          <FormattedMessage id="flow.languageStep.title" />
        </h3>
      </legend>
      <div className={CSS.flowCards}>
        <Select
          onChange={({ value }) => handleChange(value)}
          value={{ value: style.language }}
          options={options}
          components={{ SingleValue, Option }}
        />
      </div>
    </fieldset>
  );
}

LanguageStep.propTypes = {
  availableLanguages: PropTypes.arrayOf(PropTypes.string),
  onClick: PropTypes.func,
  style: PropTypes.shape({
    language: PropTypes.string,
  }),
};

LanguageStep.defaultProps = {
  availableLanguages: [],
  onClick: () => {},
  style: {},
};
