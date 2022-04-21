/* eslint-disable camelcase */
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import { useFormatMessage } from 'apps/intl';
import { useStyles } from './BackgroundJsonViewer.styles';
import { BackgroundCheckRow, BackgroundCheckRowType } from '../BackgroundCheckRow/BackgroundCheckRow';
import { BackgroundCustomCell } from '../BackgroundCustomCell/BackgroundCustomCell';

type BackgroundJsonViewerTypes = Array<{
  numero_resultados: number;
  cedula_profesional: any[];
  resultados: Array<{
    entidad: string;
    expedientes: BackgroundCheckRowType;
  }
  >;
}>;

export function BackgroundJsonViewer({ data }: { data: BackgroundJsonViewerTypes }) {
  const classes = useStyles();
  const formatMessage = useFormatMessage();
  return (
    <>
      {data.map((row) => (
        <>
          {row.numero_resultados !== 0 && (
            <TableContainer component={Paper} className={classes.tableContainer}>
              <Table aria-label="collapsible table">
                <TableBody>
                  <TableRow className={classes.tableRow}>
                    <TableCell>
                      <Typography className={classes.count}>
                        {formatMessage('BackgroundCheck.verification.jsonView.failedChecks', { messageValues: { count: row.numero_resultados } })}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  {row.resultados.map((el) => (
                    <BackgroundCheckRow key={el?.entidad} value={el?.entidad} rowExpedientes={el?.expedientes} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          {row.cedula_profesional.length !== 0 && (
            <TableContainer component={Paper} className={classes.tableContainer}>
              <Table>
                <TableBody>
                  <TableRow className={classes.tableRow}>
                    <TableCell>
                      <Typography className={classes.count}>
                        {formatMessage('BackgroundCheck.verification.jsonView.passedChecks', { messageValues: { count: row.cedula_profesional.length } })}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  {row.cedula_profesional.map((el) => (
                    <TableRow className={classes.tableRow} key={el.entidad}>
                      <BackgroundCustomCell title="BackgroundCheck.verification.jsonView.entidad" value={el?.entidad} />
                      <BackgroundCustomCell title="BackgroundCheck.verification.jsonView.status" value={formatMessage('BackgroundCheck.verification.jsonView.noRecordsFound')} align="right" />
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </>
      ))}
    </>
  );
}
