import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TableCell from '@material-ui/core/TableCell';
import { useFormatMessage } from 'apps/intl';
import { useStyles } from './BackgroundCustomCell.styles';

export function BackgroundCustomCell({ title, value, align }: { title: string; value: string; align?: string }) {
  const classes = useStyles();
  const formatMessage = useFormatMessage();
  return value.length !== 0 && (
    <TableCell align={align === 'right' ? 'right' : 'left'}>
      <Box>
        <Typography className={classes.name}>
          {value}
        </Typography>
        <Typography className={classes.colorGrey}>
          {formatMessage(title)}
        </Typography>
      </Box>
    </TableCell>
  );
}
