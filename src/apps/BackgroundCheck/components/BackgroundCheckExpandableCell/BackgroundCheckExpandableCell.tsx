import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useFormatMessage } from 'apps/intl';
import { useStyles, ChecksAccordionStyled, AgreementsAccordionStyled, ChecksAccordionSummaryStyled, AgreementsAccordionSummaryStyled } from './BackgroundCheckExpandableCell.styles';
import { BackgroundCustomCell } from '../BackgroundCustomCell/BackgroundCustomCell';
import { BackgroundCheckExpandableCellTypes } from '../../models/BackgroundCheck.model';

export function BackgroundCheckExpandableCell({ expediente }: { expediente: BackgroundCheckExpandableCellTypes }) {
  const classes = useStyles();
  const [openChecks, setOpenChecks] = useState<boolean>(false);
  const [openAgreements, setOpenAgreements] = useState<boolean>(false);
  const formatMessage = useFormatMessage();
  return (
    <TableRow className={classes.tableRow}>
      <TableCell colSpan={6}>
        <ChecksAccordionStyled>
          <ChecksAccordionSummaryStyled
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${expediente.juzgado}-content`}
            id={`${expediente.juzgado}-header`}
            onClick={() => setOpenChecks((value: boolean) => !value)}
          >
            <Typography>{expediente.juzgado}</Typography>
          </ChecksAccordionSummaryStyled>
        </ChecksAccordionStyled>
        <Collapse in={openChecks} timeout="auto" unmountOnExit>
          <Table size="small" aria-label="purchases">
            <TableBody>
              <TableRow className={classes.tableRow}>
                <BackgroundCustomCell title="BackgroundCheck.verification.jsonView.actor" value={expediente.actor} />
              </TableRow>
              <TableRow className={classes.tableRow}>
                <BackgroundCustomCell title="BackgroundCheck.verification.jsonView.defendant" value={expediente.demandado} />
              </TableRow>
              <TableRow className={classes.tableRow}>
                <BackgroundCustomCell title="BackgroundCheck.verification.jsonView.expediente" value={expediente.expediente} />
              </TableRow>
              <TableRow className={classes.tableRow}>
                <BackgroundCustomCell title="BackgroundCheck.verification.jsonView.tipo" value={expediente.tipo} />
              </TableRow>
              <TableRow className={classes.tableRow}>
                <BackgroundCustomCell title="BackgroundCheck.verification.jsonView.fuero" value={expediente.fuero} />
              </TableRow>
              <TableRow className={classes.tableRow}>
                <BackgroundCustomCell title="BackgroundCheck.verification.jsonView.fecha" value={expediente.fecha} />
              </TableRow>
              <TableRow>
                <TableCell>
                  <Box className={classes.tab}>
                    <AgreementsAccordionStyled>
                      <AgreementsAccordionSummaryStyled
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`${expediente.juzgado}-content`}
                        id={`${expediente.juzgado}-header`}
                        onClick={() => setOpenAgreements((value: boolean) => !value)}
                      >
                        <Typography>{formatMessage('BackgroundCheck.verification.jsonView.agreements')}</Typography>
                      </AgreementsAccordionSummaryStyled>
                    </AgreementsAccordionStyled>
                  </Box>
                  <Collapse in={openAgreements} timeout="auto" unmountOnExit>
                    {expediente.acuerdos?.map((rowData) => (
                      <Paper key={rowData.acuerdo} className={classes.paper}>
                        <TableBody>
                          <TableRow className={classes.tableRow}>
                            <BackgroundCustomCell title="BackgroundCheck.verification.jsonView.acuerdo" value={rowData.acuerdo} />
                          </TableRow>
                          <TableRow className={classes.tableRow}>
                            <BackgroundCustomCell title="BackgroundCheck.verification.jsonView.fecha2" value={rowData.fecha} />
                          </TableRow>
                        </TableBody>
                      </Paper>
                    ))}
                  </Collapse>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Collapse>
      </TableCell>
    </TableRow>
  );
}
