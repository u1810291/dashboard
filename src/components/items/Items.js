/** @jsx jsx */
import styled from '@emotion/styled';
import { css } from '@emotion/core';

export const aligns = [
  'auto',
  'normal',
  'start',
  'end',
  'center',
  'stretch',
  'baseline',
  'first baseline',
  'last baseline',
];

export const justifies = [
  'start',
  'end',
  'center',
  'stretch',
  'normal',
  'space-around',
  'space-between',
  'space-evenly',
];

export const flows = ['column', 'row'];

export const gaps = [0, 1, 2, 3, 4];

const Items = styled.div(
  ({
    inline = false,
    align = 'start',
    flow = 'column',
    justifyContent = 'normal',
    templateColumns = 'none',
    templateRows = 'none',
    alignContent = 'normal',
    justifyItems = 'normal',
    autoRows = 'auto',
    autoColumns = 'auto',
    gap = 2,
  }) => css`
    display: ${inline ? 'inline-grid' : 'grid'};
    grid-auto-flow: ${flow};
    grid-gap: calc(0.5 * ${gap} * var(--mgi-spacing));
    grid-template-columns: ${templateColumns};
    grid-template-rows: ${templateRows};
    align-items: ${align};
    align-content: ${alignContent};
    justify-content: ${justifyContent};
    justify-items: ${justifyItems};
    grid-auto-rows: ${autoRows};
    grid-auto-columns: ${autoColumns};
    // border: 1px solid rgba(255, 0, 0, 0.2);
  `,
);

export default Items;
