import { IconButton, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createOverlay } from 'components/overlay';
import { CollaboratorOptions } from 'models/Collaborator.model';
import React, { useCallback, useState } from 'react';
import { FiLoader, FiTrash2 } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { DeleteModal } from '../DeleteModal/DeleteModal';
import { DeleteSuccessModal } from '../DeleteSuccessModal/DeleteSuccessModal';
import { TeamTablePlaceholder } from '../TeamTablePlaceholder/TeamTablePlaceholder';

export function TeamTable({ list, onInvite, onUpdate, onRemove }) {
  const intl = useIntl();
  const [deleting, setDeleting] = useState(null);

  const handleRemoveSubmit = useCallback(async (id) => {
    try {
      setDeleting(id);
      await onRemove(id);
      createOverlay(<DeleteSuccessModal />);
    } catch (error) {
      console.error(`can't remove collaborator: ${id}`, error);
    } finally {
      setDeleting(null);
    }
  }, [onRemove]);

  const handleRemove = useCallback(async (user) => {
    createOverlay(<DeleteModal onSubmit={handleRemoveSubmit} user={user} />);
  }, [handleRemoveSubmit]);

  const handleRoleChange = useCallback((id, role) => {
    onUpdate(id, { role });
  }, [onUpdate]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{intl.formatMessage({ id: 'teamTable.name' })}</TableCell>
            <TableCell>{intl.formatMessage({ id: 'teamTable.email' })}</TableCell>
            <TableCell>{intl.formatMessage({ id: 'teamTable.role' })}</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {(!list.isLoaded && list.isLoading) || (list.isLoaded && list.value.length === 0)
            ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  {list.isLoading
                    ? <CircularProgress color="primary" />
                    : <TeamTablePlaceholder onInvite={onInvite} />}
                </TableCell>
              </TableRow>
            )
            : list.value.map((item) => (
              <TableRow key={item.user.id}>
                <TableCell>
                  {`${item.user.firstName} ${item.user.lastName}`}
                </TableCell>
                <TableCell>
                  {item.user.email}
                </TableCell>
                <TableCell>
                  <Select
                    disableUnderline
                    onChange={(e) => handleRoleChange(item.user.id, e.target.value)}
                    value={item.role}
                  >
                    {CollaboratorOptions.map((role) => (
                      <MenuItem key={role.id} value={role.id}>
                        {intl.formatMessage({ id: role.label })}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    size="small"
                    onClick={() => handleRemove(item.user)}
                    tabIndex="-1"
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
