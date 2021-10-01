import { Box, IconButton, Tooltip, Typography } from '@material-ui/core';
import { PriorityHigh } from '@material-ui/icons';
import { useConfirmDelete } from 'apps/identity/components/DeleteModal/DeleteModal';
import { StatusLabel } from 'apps/identity/components/StatusLabel';
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
import { selectIdentityCollection } from 'state/identities/identities.selectors';
import { useStyles } from 'apps/VerificationList/components/VerificationTableRow/VerificationTableRow.styles';
import { verificationRemove } from 'state/verification/verification.actions';
import { CSSProperties } from '@material-ui/styles';
import { RoleRenderGuard } from 'apps/merchant/guards/RoleRenderGuard';
import { useQuery } from 'lib/url';

export function VerificationTableRow({ index, style, data: { paddingBottom = 0 } = {} }: {
  index: number;
  style: CSSProperties;
  data: {
    paddingBottom?: number;
  };
}) {
  const classes = useStyles();
  const intl = useIntl();
  const dispatch = useDispatch();
  const [deleting, setDeleting] = useState(null);
  const { asMerchantId } = useQuery();
  const [onMouseDownHandler, onMouseUpHandler] = useTableRightClickNoRedirect(Routes.identity.profile.root, { asMerchantId });
  const verificationCollection = useSelector(selectIdentityCollection);
  const verification = useMemo(() => verificationCollection?.value[index], [verificationCollection, index]);
  const confirmDelete = useConfirmDelete(
    intl.formatMessage({ id: 'verificationModal.delete' }),
    intl.formatMessage({ id: 'verificationModal.delete.confirm' }),
  );

  const handleRemove = useCallback((verificationId: string) => async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (deleting) {
      return;
    }
    try {
      setDeleting(verificationId);
      await confirmDelete();
      await dispatch(verificationRemove(verificationId));
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

  const handleMouseUp = useCallback((identityId: string, verificationId: string) => (event: React.MouseEvent) => onMouseUpHandler(event, `${identityId}${Routes.identity.verification.root}/${verificationId}`),
    [onMouseUpHandler]);

  const handleStopPropagation = useCallback((event: React.MouseEvent) => event?.stopPropagation(), []);

  if (!verification) {
    return (
      // @ts-ignore
      <Box style={style} p={1.4} pt={2.4} width="100%" align="center" className={classes.loader}>
        <IconLoad width={25} />
      </Box>
    );
  }

  return (
    <Box style={{ ...style, paddingBottom }}>
      <Box
        className={classes.root}
        style={{ height: `${parseFloat(style?.height?.toString()) - paddingBottom}px` }}
        key={verification.identityId}
        onMouseDown={onMouseDownHandler}
        onMouseUp={handleMouseUp(verification.identityId, verification._id)}
      >
        <Box className={classes.itemNameWrapper}>
          <Box mb={{ xs: 2, lg: 0 }} pr={{ xs: 3, lg: 0 }}>
            {!verification.fullName && verification.verificationStatus === IdentityStatuses.running ? (
              <SkeletonLoader animation="wave" variant="text" width={140} />)
              : !verification.fullName
                ? (
                  <Typography variant="subtitle2" className={classes.itemNameEmpty}>
                    {intl.formatMessage({ id: 'identity.nameNotFound' })}
                  </Typography>
                )
                : (
                  <Typography variant="subtitle2" className={classes.itemName}>{titleCase(verification.fullName)}</Typography>
                )}
            <Box className={classes.label}>{intl.formatMessage({ id: 'identity.field.fullName' })}</Box>
          </Box>
        </Box>
        <Box className={classes.itemData}>
          <Box mb={{ xs: 2, lg: 0 }}>
            {verification.flowId ? (
              <Box color="text.primary">
                {verification.flowName}
              </Box>
            ) : (
              <Box color="text.disabled">
                {intl.formatMessage({ id: 'statuses.deleted' })}
              </Box>
            )}
            <Box className={classes.label}>{intl.formatMessage({ id: 'identity.field.verificationFlow' })}</Box>
          </Box>
        </Box>
        <Box className={classes.itemData}>
          <Box mb={{ xs: 2, lg: 0 }}>
            {utcToLocalFormat(verification.sourceCreatedAt)}
            <Box className={classes.label}>{intl.formatMessage({ id: 'identity.field.dateCreated' })}</Box>
          </Box>
        </Box>
        <Box className={classes.itemStatusWrapper}>
          <Box className={classes.itemStatus}>
            <StatusLabel status={verification.verificationStatus} />
            <Box className={classes.label}>{intl.formatMessage({ id: 'identity.field.status' })}</Box>
          </Box>
          <Box className={classes.itemIcons}>
            <RoleRenderGuard roles={[CollaboratorRoles.ADMIN]}>
              <Box className={classes.iconDeleteWrapper}>
                <IconButton size="small" onMouseUp={handleRemove(verification._id)} tabIndex="-1" className={classes.iconButtonDelete}>
                  {verification.identityId === deleting ? <IconLoad /> : <FiTrash2 className="color-red" />}
                </IconButton>
              </Box>
            </RoleRenderGuard>
            <Box className={classes.iconReviewWrapper} onClick={handleStopPropagation}>
              {verification.verificationStatus === IdentityStatuses.reviewNeeded && (
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
