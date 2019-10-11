import React from 'react';
import { Items, Click } from 'components';
import { ReactComponent as Icon } from 'assets/copy-icon.v1.svg';
import copyToClipboard from './copy-to-clipboard';

export default function CopyToClipbboard({
  children,
  text,
  disabled,
  ...itemsProps
}) {
  return (
    <Items
      autoColumns="max-content max-content"
      align="center"
      gap="1"
      {...itemsProps}
    >
      {children}
      {!disabled && (
        <Click
          shadow="0"
          hoverShadow={false}
          padding="0"
          onClick={() => copyToClipboard(text)}
        >
          <Icon />
        </Click>
      )}
    </Items>
  );
}
