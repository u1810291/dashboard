import { Box, Grid, IconButton, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableRow } from '@material-ui/core';
import { PageLoader } from 'apps/layout';
import { useOverlay } from 'apps/overlay';
import { notification } from 'apps/ui';
import { CollaboratorOptions } from 'models/Collaborator.model';
import React, { useCallback, useState } from 'react';
import { FiChevronDown, FiLoader, FiTrash2 } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { DeleteModal } from '../DeleteModal/DeleteModal';
import { TeamTablePlaceholder } from '../TeamTablePlaceholder/TeamTablePlaceholder';
import { useStyles } from './TeamTable.styles';
import { QATags } from '../../../../models/QA.model';

export function TeamTable({ list, onInvite, onUpdate, onRemove }) {
  const intl = useIntl();
  const classes = useStyles();
  const [deleting, setDeleting] = useState(null);
  const [createOverlay, closeOverlay] = useOverlay();

  const handleRemoveSubmit = useCallback(async (id) => {
    try {
      closeOverlay();
      setDeleting(id);
      await onRemove(id);

      notification.info(intl.formatMessage({ id: 'teamTable.deleteSuccess.description' }));
    } catch (error) {
      console.error(`can't remove collaborator: ${id}`, error);
    } finally {
      setDeleting(null);
    }
  }, [onRemove, intl, closeOverlay]);

  const handleRemove = useCallback(async (user) => {
    createOverlay(<DeleteModal onSubmit={handleRemoveSubmit} user={user} />);
  }, [handleRemoveSubmit, createOverlay]);

  const handleRoleChange = useCallback((id, role) => {
    onUpdate(id, { role });
  }, [onUpdate]);

  return (
    <TableContainer className={classes.tableContainer}>
      <Table className={classes.table}>
        <TableBody>
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
                  <Grid container alignItems="center" justify="center" className={classes.firstName}>
                    <Grid item>{`${item.user.firstName[0].toUpperCase()}`}</Grid>
                  </Grid>
                </TableCell>
                <TableCell className={classes.fullNameCell}>
                  <Box className={classes.fullName}>
                    {`${item.user.firstName} ${item.user.lastName}`}
                  </Box>
                  <Box className={classes.email}>
                    {item.user.email}
                  </Box>
                </TableCell>
                <TableCell align="right" className={classes.roleCell}>
                  <Select
                    disableUnderline
                    onChange={(e) => handleRoleChange(item.user.id, e.target.value)}
                    value={item.role}
                    IconComponent={FiChevronDown}
                  >
                    {CollaboratorOptions.map((role) => (
                      <MenuItem key={role.id} value={role.id}>
                        {intl.formatMessage({ id: role.label })}
                      </MenuItem>
                    ))}
                  </Select>
                  <IconButton
                    data-qa={QATags.Collaborators.DeleteMemberButton}
                    size="small"
                    onClick={() => handleRemove(item.user)}
                    tabIndex="-1"
                    className={classes.tableButton}
                  >
                    {item.user.id === deleting ? <FiLoader /> : <FiTrash2 className="color-red" />}
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
