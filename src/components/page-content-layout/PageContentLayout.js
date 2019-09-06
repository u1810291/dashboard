/** @jsx jsx */
import PropTypes from 'prop-types';
import { css, jsx } from '@emotion/core';
import { Items } from 'components';
import './PageContentLayout.module.scss';

const defaultStyle = (navigation, aside) => css`
grid-template-columns:
  var(--mgi-page-content-layout-menu-width)
  1fr
  var(--mgi-page-content-layout-aside-width);
> nav {
  grid-column-start: 1;
  grid-column-end: 2;
}
> main {
  grid-column-start: ${navigation ? 2 : 1};
  grid-column-end: ${aside ? 3 : 4};
}
> aside {
  grid-column-start: 3;
  grid-column-end: 4;
}
`;

export default function PageContentLayout({
  navigation = true,
  aside = true,
  // eslint-disable-next-line no-shadow
  css,
  children,
}) {
  return (
    <Items css={css || defaultStyle(navigation, aside)}>
      {children}
    </Items>
  );
}

PageContentLayout.propTypes = {
  aside: PropTypes.bool,
  css: PropTypes.shape({}),
  navigation: PropTypes.bool,
};

PageContentLayout.defaultProps = {
  aside: true,
  css: undefined,
  navigation: true,
};
