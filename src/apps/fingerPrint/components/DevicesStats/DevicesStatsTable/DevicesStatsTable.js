import { Box, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { BrowserIcons, getDeviceBrowserTypeByString } from 'models/DeviceCheck.model';
import React from 'react';
import { useStyles } from './DevicesStatsTable.styles';

export const DevicesStatsTable = ({ rows, headerName }) => {
  const classes = useStyles();
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell className={`${classes.tableCell} ${classes.tableCellHead}`}>
            {headerName}
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => {
          const Icon = BrowserIcons[getDeviceBrowserTypeByString(row.name)];
          return (
            <TableRow key={row.name}>
              <TableCell className={classes.tableCell}>
                {Icon && (<Icon className={classes.tableIcon} />)}
                {row.name}
              </TableCell>
              <TableCell className={classes.tableCell} align="right">
                <Box fontSize={12} fontWeight={700}>
                  {`${row.percentage}% (${row.count})`}
                </Box>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
