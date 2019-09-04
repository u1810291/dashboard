/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Items } from 'components';

export default function PageContentMenu({ children }) {
  return (
    <Items
      gap={0}
      flow="row"
      as="nav"
      css={css`
        > * {
          padding: calc(var(--mgi-spacing) * 0.5) var(--mgi-spacing);
          color: inherit;
          white-space: nowrap;
          background: transparent !important;
          justify-content: flex-start;
          border: 0;
        }

        > .active {
          font-weight: bold;
          color: var(--mgi-theme-palette-active);
          background: var(--mgi-theme-palette-lighterblue) !important;
          border-radius: 4px;
        }
      `}
    >
      {children}
    </Items>
  );
}
