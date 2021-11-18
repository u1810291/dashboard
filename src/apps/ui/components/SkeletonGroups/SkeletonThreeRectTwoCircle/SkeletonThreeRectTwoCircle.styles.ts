import { createStyles } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => createStyles({
  skeletonWrap: {
    border: `1px solid ${theme.palette.common.black7}`,
    borderRadius: 3,
    padding: 20,
    height: 154,
  },
}));
