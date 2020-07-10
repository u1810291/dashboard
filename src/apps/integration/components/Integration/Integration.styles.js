import { Divider, withStyles } from '@material-ui/core';

export const SubDivider = withStyles(() => ({
  root: {
    marginTop: 30,
    marginBottom: 30,
  },
}))(Divider);
