import { Box, Button, Table, TableBody, TableCell, TableContainer, TableRow } from '@material-ui/core';
import { PageLoader } from 'apps/layout';
import { UserRoundAvatar } from 'apps/ui/components/UserRoundAvatar/UserRoundAvatar';
import { QATags } from 'models/QA.model';
import { Routes } from 'models/Router.model';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { TeamTablePlaceholder } from '../TeamTablePlaceholder/TeamTablePlaceholder';
import { useStyles } from './TeamTable.styles';

export function TeamTable({ list, onInvite }) {
  const intl = useIntl();
  const classes = useStyles();
  const history = useHistory();

  const handleClickProfile = useCallback((id) => () => history.push(`${Routes.collaborators.agentProfile.root}/${id}`), [history]);

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
                    : <TeamTablePlaceholder onInvite={onInvite} />}
                </TableCell>
              </TableRow>
            )
            : list.value.map((item) => (
              <TableRow key={item.user.id}>
                <TableCell className={classes.firstNameCell}>
                  <Box height={30} mt={{ xs: 0.5, md: 0 }}>
                    <UserRoundAvatar uniqueId={item.user.id} name={item.user.firstName} />
                  </Box>
                </TableCell>
                <TableCell className={classes.fullNameCell}>
                  <Box className={classes.fullName}>
                    {`${item.user.firstName ?? ''} ${item.user.lastName ?? ''}`}
                  </Box>
                  <Box className={classes.email}>
                    {item.user.email}
                  </Box>
                </TableCell>
                <TableCell align="right" className={classes.roleCell}>
                  <Button
                    variant="outlined"
                    className={classes.profileButton}
                    onClick={handleClickProfile(item.user.id)}
                  >
                    {intl.formatMessage({ id: 'Settings.teamSettings.button.profile' })}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
