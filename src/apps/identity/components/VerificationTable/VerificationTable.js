import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { Spinner } from 'apps/layout';
import confirm from 'components/confirm/Confirm';
import { StatusLabel } from 'fragments/verifications/status-label/StatusLabel';
import { formatDate } from 'lib/date';
import { titleCase } from 'lib/string';
import { getIdentityShortId } from 'models/Identity.model';
import React, { useCallback, useState } from 'react';
import { FiLoader, FiTrash2 } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { identityRemove } from 'state/identities/identities.actions';
import { selectIdentityCollection } from 'state/identities/identities.selectors';
import { ReactComponent as EmptyTableIcon } from './empty-table.svg';
import { TableRowHovered } from './VerificationTable.styles';

export function VerificationTable() {
  const intl = useIntl();
  const dispatch = useDispatch();
  const history = useHistory();
  const identityCollection = useSelector(selectIdentityCollection);
  const [deleting, setDeleting] = useState(null);

  const handleRowClick = useCallback((id) => {
    history.push(`/identities/${id}`);
  }, [history]);

  const handleRemove = useCallback(async (e, id) => {
    e.stopPropagation();
    if (deleting) {
      return;
    }
    try {
      setDeleting(id);
      await confirm(intl.formatMessage({ id: 'verificationModal.delete.confirm' }));
      await dispatch(identityRemove(id));
    } catch (error) {
      if (!error) {
        // cancelled
        return;
      }
      console.error('identity remove error', error);
    } finally {
      setDeleting(null);
    }
  }, [dispatch, intl, deleting]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{intl.formatMessage({ id: 'identity.field.id' })}</TableCell>
            <TableCell>{intl.formatMessage({ id: 'identity.field.status' })}</TableCell>
            <TableCell>{intl.formatMessage({ id: 'identity.field.fullName' })}</TableCell>
            <TableCell>{intl.formatMessage({ id: 'identity.field.date' })}</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {identityCollection.isLoading || (identityCollection.isLoaded && identityCollection.value.length === 0)
            ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  {identityCollection.isLoading
                    ? <Spinner />
                    : <EmptyTableIcon />}
                </TableCell>
              </TableRow>
            )
            : identityCollection.value.map((item) => (
              <TableRowHovered
                hover
                key={item.id}
                onClick={() => handleRowClick(item.id)}
              >
                <TableCell>
                  #
                  {getIdentityShortId(item.id)}
                </TableCell>
                <TableCell>
                  <StatusLabel status={item.status} />
                </TableCell>
                <TableCell>
                  {!item.fullName
                    ? (
                      <Box component="span" color="text.secondary">
                        {intl.formatMessage({ id: 'identity.nameNotFound' })}
                      </Box>
                    )
                    : titleCase(item.fullName)}
                </TableCell>
                <TableCell>
                  {formatDate(item.dateCreated)}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    size="small"
                    onClick={(e) => handleRemove(e, item.id)}
                    tabIndex="-1"
                  >
                    {item.id === deleting ? <FiLoader /> : <FiTrash2 className="color-red" />}
                  </IconButton>
                </TableCell>
              </TableRowHovered>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
