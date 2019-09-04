import PropTypes from 'prop-types';
import React from 'react';
import { injectIntl } from 'react-intl';
import fp from 'lodash/fp';
import classNames from 'classnames';
import { get } from 'lodash';

import { withI18nContext } from 'components/i18n-context';

import CSS from './Input.module.css';

function BaseInput(props) {
  const {
    field,
    form,
    label,
    placeholder,
    intl,
    i18nContext,
    hideLabel = false,
    renderer = () => {},
    className,
    error,
    ...inputOptions
  } = props;
  let i18nLabel; let
    i18nPlaceholder;
  let validationError;

  if (!hideLabel && !label && i18nContext && field) {
    i18nLabel = intl.formatMessage({
      id: [i18nContext, 'labels', field.name].filter((a) => a).join('.'),
    });
  }

  if (!placeholder && i18nContext && field) {
    i18nPlaceholder = intl.formatMessage({
      id: [i18nContext, 'placeholders', field.name].filter((a) => a).join('.'),
    });
  }

  if (error) {
    validationError = intl.formatMessage({ id: error });
  } else {
    validationError = form && field ? get(form.status, field.name) : null;
  }

  return (
    <div className={classNames(CSS.input, className)}>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      {!hideLabel && <label>{label || i18nLabel}</label>}
      {renderer({
        placeholder: placeholder || i18nPlaceholder,
        error: validationError,
        ...field,
        ...inputOptions,
      })}
      {validationError && <p className={CSS.error}>{validationError}</p>}
    </div>
  );
}

export default fp.flowRight(
  injectIntl,
  withI18nContext,
)(BaseInput);

BaseInput.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({}),
  ]),
  field: PropTypes.shape(),
  form: PropTypes.shape(),
  hideLabel: PropTypes.bool,
  i18nContext: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  renderer: PropTypes.func,
};

BaseInput.defaultProps = {
  error: undefined,
  field: {},
  form: {},
  hideLabel: false,
  label: '',
  placeholder: '',
  renderer: () => {},
};
