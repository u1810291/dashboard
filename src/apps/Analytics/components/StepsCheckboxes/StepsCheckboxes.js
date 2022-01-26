import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, Checkbox } from '@material-ui/core';
import { ReactComponent as CheckboxOn } from 'assets/icon-checkbox-on.svg';
import { ReactComponent as CheckboxOff } from 'assets/icon-checkbox-off.svg';
import { useStyles, TableRowHovered } from './StepsCheckboxes.styles';

const MOCK_DATA = [
  'Get to know MetamMap',
  'Set up your profile',
  'Invite a teammate',
  'Complete profile authentication steps',
  'Build your first metamap',
];

export function StepsCheckboxes() {
  const classes = useStyles();

  return (
    <Box mb={2}>
      <Typography variant="h3"> Complete these steps to get started </Typography>
      <Table className={classes.table}>
        <TableBody>
          {MOCK_DATA.length > 0 && MOCK_DATA.map((item, idx) => (
            <TableRowHovered
              hover
              key={idx}
            >
              <TableCell>
                <Box mb={{ xs: 2, lg: 0 }} pr={{ xs: 3, lg: 0 }} color="common.black90">
                  <Box component="span">
                    <Checkbox color="primary" checkedIcon={<CheckboxOn />} icon={<CheckboxOff />} />
                    <Box component="span" className={classes.itemName}>{item}</Box>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Box mb={{ xs: 2, lg: 0 }}>
                  <Box component="span" className={classes.arrowContainer}>
                    <span className={classes.arrow} />
                  </Box>
                </Box>
              </TableCell>
            </TableRowHovered>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
