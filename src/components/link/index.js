import React from 'react';
import Click from 'components/click';
import Text from 'components/text';

export default function Link({
  padding = '0',
  shadow = '0',
  hoverShadow = false,
  as = 'a',
  color = 'active',
  children,
  ...clickProps
}) {
  return (
    <Click
      padding={padding}
      shadow={shadow}
      hoverShadow={hoverShadow}
      as={as}
      {...clickProps}
    >
      <Text color={color}>{children}</Text>
    </Click>
  );
}
