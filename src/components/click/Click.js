/** @jsx jsx */

import { css, jsx } from '@emotion/core'
import { withRouter } from 'react-router-dom'
import Card, { shadowValue } from '../card'

function handleClick(onClick, history, event) {
  const href = event.currentTarget.getAttribute('href')
  if (!onClick && href.match(/^\//)) {
    event.preventDefault()
    history.push(href)
  } else {
    onClick(event)
  }
}

function Click({
  children,
  gap = 1,
  inline = true,
  disabled,
  shadow = 0,
  tabIndex = 0,
  hoverShadow = true,
  padding = '1/2',
  background,
  onClick,
  justifyContent = 'center',
  justifyItems = 'center',
  flow = 'column',
  align = 'center',
  history,
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
      onClick={disabled ? () => {} : handleClick.bind(null, onClick, history)}
      padding={padding}
      background={disabled ? 'disabled' : background}
      flow={flow}
      gap={gap}
      align={align}
      onKeyPress={event =>
        ['Enter', ' '].includes(event.key) &&
        (event.preventDefault(), onClick(event))
      }
      role="button"
      css={css`
        font: inherit;
        border: 0;
        cursor: pointer;
        text-decoration: none;
        &:hover,
        &:active {
          ${hoverShadow &&
            !disabled &&
            css`
              box-shadow: ${shadowValue(parseInt(shadow) + 1)};
            `}
        }
        &[disabled] {
          cursor: default;
          outline: 0;
        }
      `}
      {...props}
    >
      {children}
    </Card>
  )
}

export default withRouter(Click)
