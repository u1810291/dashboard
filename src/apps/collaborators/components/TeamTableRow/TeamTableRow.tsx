import { Box, IconButton, TableCell, TableRow, Typography } from '@material-ui/core';
import { notification, UserRoundAvatar } from 'apps/ui';
import { selectUserId } from 'apps/user/state/user.selectors';
import { Collaborator, getCollaboratorOption, User } from 'models/Collaborator.model';
import { Routes } from 'models/Router.model';
import React, { useCallback, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ReactComponent as IconLoad } from 'assets/icon-load.svg';
import { selectOwnerId } from 'state/merchant/merchant.selectors';
import { FiLink } from 'react-icons/all';
import { useConfirm } from 'apps/overlay';
import { userBlock, userUnblock } from '../../state/collaborator.actions';
import { useStyles } from './TeamTableRow.styles';

export function TeamTableRow({ collaborator }: {
  collaborator: Collaborator;
}) {
  const classes = useStyles();
  const intl = useIntl();
  const history = useHistory();
  const dispatch = useDispatch();
  const [isBlocking, setIsBlocking] = useState<boolean>(false);
  const confirmBlock = useConfirm(
    intl.formatMessage({ id: 'teamTable.blockModal.title' }),
    intl.formatMessage({ id: 'teamTable.blockModal.subtitle' }),
  );
  const confirmUnblock = useConfirm(
    intl.formatMessage({ id: 'teamTable.unblockModal.title' }),
    intl.formatMessage({ id: 'teamTable.unblockModal.subtitle' }),
  );
  const ownerId = useSelector(selectOwnerId);
  const userId = useSelector(selectUserId);
  const isOwnerRow = collaborator?.user?.id === ownerId;
  const handleClickProfile = useCallback((id) => () => history.push(`${Routes.collaborators.agentProfile.root}/${id}`), [history]);

  const handleBlockUser = useCallback((user: User) => async () => {
    if (!user) {
      return;
    }
    try {
      setIsBlocking(true);
      if (user?.blocked?.blockedAt) {
        await confirmUnblock();
        await dispatch(userUnblock(user.id));
      } else {
        await confirmBlock();
        await dispatch(userBlock(user.id));
      }
    } catch (error) {
      if (error) {
        notification.error(intl.formatMessage({ id: 'Error.common' }));
      }
    } finally {
      setIsBlocking(false);
    }
  }, [intl, dispatch, confirmBlock, confirmUnblock]);

  if (!collaborator) {
    return null;
  }

  return (
    <TableRow>
      {/* Collaborator avatar */}
      <TableCell onClick={handleClickProfile(collaborator.user.id)} className={classes.firstNameCell}>
        <Box height={30} mt={{ xs: 0.5, md: 0 }}>
          <UserRoundAvatar uniqueId={collaborator.user.id} name={collaborator.user.firstName} />
        </Box>
      </TableCell>
      {/* Collaborator name */}
      <TableCell onClick={handleClickProfile(collaborator.user.id)} className={classes.fullNameCell}>
        <Box className={classes.fullName}>
          {!collaborator.user.firstName && !collaborator.user.lastName ? '－' : `${collaborator.user.firstName ?? ''} ${collaborator.user.lastName ?? ''}`}
          &nbsp;
          {ownerId === collaborator.user.id && `(${intl.formatMessage({ id: 'teamTable.roles.owner' })})`}
          <FiLink className={classes.linkIcon} />
        </Box>
        <Box className={classes.email}>
          {collaborator.user.email}
        </Box>
      </TableCell>
      {/* Collaborator role */}
      <TableCell align="right" className={classes.roleCell}>
        <Typography>
          {isOwnerRow
            ? intl.formatMessage({ id: 'teamTable.roles.owner' })
            : intl.formatMessage({ id: getCollaboratorOption(collaborator.role)?.label || 'Error.intl' })}
        </Typography>
      </TableCell>
      {/* Block unblock */}
      <TableCell align="right" className={classes.blockCell}>
        {!isOwnerRow && collaborator.user?.id !== userId && (
          <IconButton
            size="small"
            onClick={handleBlockUser(collaborator.user)}
            disabled={isBlocking}
          >
            {isBlocking ? <IconLoad width={17} /> : (
              collaborator?.user?.blocked?.blockedAt ? (
                <Box className={classes.blocked}>
                  {intl.formatMessage({ id: 'teamTable.unblock' })}
                </Box>
              ) : (
                <Box className={classes.unblocked}>
                  {intl.formatMessage({ id: 'teamTable.block' })}
                </Box>
              ))}
          </IconButton>
        )}
      </TableCell>
    </TableRow>
  );
}
