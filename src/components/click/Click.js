/** @jsx jsx */

import PropTypes from 'prop-types';
import { css, jsx } from '@emotion/core';
import { withRouter } from 'react-router-dom';

import Card, { shadowValue } from '../card';

function handleClick(onClick, history, event) {
  const href = event.currentTarget.getAttribute('href');
  if (!onClick && href.match(/^\//)) {
    event.preventDefault();
    history.push(href);
  } else {
    onClick(event);
  }
}

function Click({
  align,
  background,
  children,
  disabled,
  flow,
  gap,
  history,
  hoverShadow,
  inline,
  justifyContent,
  justifyItems,
  onClick,
  padding,
  shadow,
  tabIndex,
  ...props
}) {
  return (
    <Card
      inline={inline}
      shadow={shadow}
      disabled={disabled}
      justifyContent={justifyContent}
      justifyItems={justifyItems}
      tabIndex={tabIndex}
      onClick={disabled ? () => {} : (event) => handleClick(onClick, history, event)}
      padding={padding}
      background={disabled ? 'disabled' : background}
      flow={flow}
      gap={gap}
      align={align}
      onKeyPress={(event) => ['Enter', ' '].includes(event.key)
        && (event.preventDefault(), onClick(event))}
      role="button"
      css={css`
        font: inherit;
        border: 0;
        cursor: pointer;
        text-decoration: none;
        &:hover,
        &:active {
          ${hoverShadow
            && !disabled
            && css`
              box-shadow: ${shadowValue(parseInt(shadow, 10) + 1)};
            `}
        }
        &[disabled] {
          cursor: default;
          outline: 0;
        }
      `}
      {...props} // eslint-disable-line react/jsx-props-no-spreading
    >
      {children}
    </Card>
  );
}

export default withRouter(Click);

Click.propTypes = {
  align: PropTypes.string,
  background: PropTypes.string,
  disabled: PropTypes.bool,
  flow: PropTypes.string,
  gap: PropTypes.number,
  hoverShadow: PropTypes.bool,
  inline: PropTypes.bool,
  justifyContent: PropTypes.string,
  justifyItems: PropTypes.string,
  onClick: PropTypes.func,
  padding: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  shadow: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  tabIndex: PropTypes.number,
};

Click.defaultProps = {
  align: 'center',
  background: undefined,
  disabled: false,
  flow: 'column',
  gap: 1,
  hoverShadow: true,
  inline: true,
  justifyContent: 'center',
  justifyItems: 'center',
  onClick: () => {},
  padding: '1/2',
  shadow: 0,
  tabIndex: 0,
};
