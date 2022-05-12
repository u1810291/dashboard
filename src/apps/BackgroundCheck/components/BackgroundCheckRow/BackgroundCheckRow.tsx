import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import { useFormatMessage } from 'apps/intl';
import { useStyles } from './BackgroundCheckRow.styles';
import { BackgroundCustomCell } from '../BackgroundCustomCell/BackgroundCustomCell';
import { BackgroundCheckExpandableCell } from '../BackgroundCheckExpandableCell/BackgroundCheckExpandableCell';
import { BackgroundCheckExpandableCellTypes } from '../../models/BackgroundCheck.model';

export type BackgroundCheckRowType = Array<BackgroundCheckExpandableCellTypes>;

export function BackgroundCheckRow({ rowExpedientes, value }: { rowExpedientes: BackgroundCheckRowType; value: string }) {
  const classes = useStyles();
  const formatMessage = useFormatMessage();
  return (
    <>
      <TableRow className={classes.tableRow}>
        <BackgroundCustomCell title="BackgroundCheck.verification.jsonView.entidad" value={value} />
        <BackgroundCustomCell title="BackgroundCheck.verification.jsonView.status" value={formatMessage('BackgroundCheck.verification.jsonView.failed')} align="right" />
      </TableRow>
      {rowExpedientes.map((expediente) => (
        <BackgroundCheckExpandableCell key={expediente.juzgado} expediente={expediente} />
      ))}
    </>
  );
}
