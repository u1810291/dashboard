import React from 'react';
import { Collaborator } from 'models/Collaborator.model';
import { Loadable } from 'models/Loadable.model';
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@material-ui/core';
import { PageLoader } from 'apps/layout';
import { QATags } from 'models/QA.model';
import { TeamTablePlaceholder } from '../TeamTablePlaceholder/TeamTablePlaceholder';
import { TeamTableRow } from '../TeamTableRow/TeamTableRow';
import { useStyles } from './TeamTable.styles';

export function TeamTable({ list }: {
  list: Loadable<Collaborator[]>;
}) {
  const classes = useStyles();

  return (
    <TableContainer className={classes.tableContainer}>
      <Table className={classes.table}>
        <TableBody data-qa={QATags.Collaborators.TeamTable}>
          {(!list.isLoaded && list.isLoading) || (list.isLoaded && list.value.length === 0)
            ? (
              <TableRow className={classes.tablePlaceholder}>
                <TableCell colSpan={3} align="center">
                  {list.isLoading
                    ? <PageLoader />
                    : <TeamTablePlaceholder />}
                </TableCell>
              </TableRow>
            )
            : list.value.map((collaborator) => (<TeamTableRow collaborator={collaborator} key={collaborator.user.id} />))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
