import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import CSS from './StatusLabel.module.scss';

export default function StatusLabel({
  status,
  coloredText,
  ellipsis = false,
  className,
  bullet = false,
}) {
  return (
    <span
      className={
        classNames(
          className,
          coloredText && CSS.coloredText,
          CSS.status,
          status,
          { loading: ellipsis },
        )
      }
    >
      { bullet && <i /> }
      <FormattedMessage id={`statuses.${status}`} />
    </span>
  );
}

StatusLabel.propTypes = {
  bullet: PropTypes.bool,
  coloredText: PropTypes.bool.isRequired,
  ellipsis: PropTypes.bool,
  status: PropTypes.string.isRequired,
};

StatusLabel.defaultProps = {
  bullet: false,
  ellipsis: false,
};
