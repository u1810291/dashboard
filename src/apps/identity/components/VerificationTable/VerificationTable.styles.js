import { TableRow, withStyles } from '@material-ui/core';

export const TableRowHovered = withStyles(() => ({
  root: {
    cursor: 'pointer',
  },
}))(TableRow);
