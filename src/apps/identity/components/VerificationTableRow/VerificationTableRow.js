import { Box, IconButton, Tooltip, Typography } from '@material-ui/core';
import { PriorityHigh } from '@material-ui/icons';
import { useRole } from 'apps/collaborators';
import { useConfirmDelete } from 'apps/identity/components/DeleteModal/DeleteModal';
import { StatusLabel } from 'apps/identity/components/StatusLabel';
import { VerificationFlowName } from 'apps/identity/components/VerificationFlowName/VerificationFlowName';
import { SkeletonLoader } from 'apps/ui';
import { useTableRightClickNoRedirect } from 'apps/ui/hooks/rightClickNoRedirect';
import { ReactComponent as IconLoad } from 'assets/icon-load.svg';
import { utcToLocalFormat } from 'lib/date';
import { titleCase } from 'lib/string';
import { CollaboratorRoles } from 'models/Collaborator.model';
import { Routes } from 'models/Router.model';
import { IdentityStatuses } from 'models/Status.model';
import React, { useCallback, useMemo, useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { identityRemove } from 'state/identities/identities.actions';
import { selectIdentityCollection } from 'state/identities/identities.selectors';
import { useStyles } from './VerificationTableRow.styles';

export function VerificationTableRow({ index, style, data: { paddingBottom = 0 } = {} }) {
  const classes = useStyles();
  const intl = useIntl();
  const dispatch = useDispatch();
  const [deleting, setDeleting] = useState(null);
  const [onMouseDownHandler, onMouseUpHandler] = useTableRightClickNoRedirect(Routes.list.root);
  const identityCollection = useSelector(selectIdentityCollection);
  const role = useRole();
  const identity = useMemo(() => identityCollection?.value[index], [identityCollection, index]);
  const confirmDelete = useConfirmDelete(
    intl.formatMessage({ id: 'verificationModal.delete' }),
    intl.formatMessage({ id: 'verificationModal.delete.confirm' }),
  );

  const handleRemove = useCallback((id) => async (e) => {
    e.stopPropagation();
    if (deleting) {
      return;
    }
    try {
      setDeleting(id);
      await confirmDelete();
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
  }, [dispatch, deleting, confirmDelete]);

  const handleMouseUp = useCallback((id) => (event) => onMouseUpHandler(event, id),
    [onMouseUpHandler]);

  const handleStopPropagation = useCallback((event) => event?.stopPropagation(), []);

  if (!identity) {
    return (
      <Box style={style} p={1.4} pt={2.4} width="100%" align="center" className={classes.loader}>
        <IconLoad width={25} />
      </Box>
    );
  }

  return (
    <Box style={{ ...style, paddingBottom }}>
      <Box
        className={classes.root}
        style={{ height: `${parseFloat(style.height) - paddingBottom}px` }}
        key={identity.id}
        onMouseDown={onMouseDownHandler}
        onMouseUp={handleMouseUp(identity.id)}
      >
        <Box className={classes.itemNameWrapper}>
          <Box mb={{ xs: 2, lg: 0 }} pr={{ xs: 3, lg: 0 }}>
            {!identity.fullName && identity.status === IdentityStatuses.running ? (
              <SkeletonLoader animation="wave" variant="text" width={140} />)
              : !identity.fullName
                ? (
                  <Typography variant="subtitle2" className={classes.itemNameEmpty}>
                    {intl.formatMessage({ id: 'identity.nameNotFound' })}
                  </Typography>
                )
                : (
                  <Typography variant="subtitle2" className={classes.itemName}>{titleCase(identity.fullName)}</Typography>
                )}
            <Box className={classes.label}>{intl.formatMessage({ id: 'identity.field.fullName' })}</Box>
          </Box>
        </Box>
        <Box className={classes.itemData}>
          <Box mb={{ xs: 2, lg: 0 }}>
            <VerificationFlowName flowId={identity.flowId} />
            <Box className={classes.label}>{intl.formatMessage({ id: 'identity.field.verificationFlow' })}</Box>
          </Box>
        </Box>
        <Box className={classes.itemData}>
          <Box mb={{ xs: 2, lg: 0 }}>
            {utcToLocalFormat(identity.dateCreated)}
            <Box className={classes.label}>{intl.formatMessage({ id: 'identity.field.dateCreated' })}</Box>
          </Box>
        </Box>
        <Box className={classes.itemStatusWrapper}>
          <Box className={classes.itemStatus}>
            <StatusLabel status={identity.status} />
            <Box className={classes.label}>{intl.formatMessage({ id: 'identity.field.status' })}</Box>
          </Box>
          <Box className={classes.itemIcons}>
            {role === CollaboratorRoles.ADMIN && (
              <Box className={classes.iconDeleteWrapper}>
                <IconButton size="small" onMouseUp={handleRemove(identity.id)} tabIndex="-1" className={classes.iconButtonDelete}>
                  {identity.id === deleting ? <IconLoad /> : <FiTrash2 className="color-red" />}
                </IconButton>
              </Box>
            )}
            <Box className={classes.iconReviewWrapper} onClick={handleStopPropagation}>
              {identity.status === IdentityStatuses.reviewNeeded && (
                <Tooltip
                  onMouseUp={handleStopPropagation}
                  enterTouchDelay={0}
                  placement="top"
                  arrow
                  classes={{ tooltip: classes.tooltip, arrow: classes.tooltipArrow }}
                  title={intl.formatMessage({ id: 'VerificationTable.reviewNeeded' })}
                >
                  <IconButton size="small" className={classes.iconButtonReview}>
                    <PriorityHigh />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
