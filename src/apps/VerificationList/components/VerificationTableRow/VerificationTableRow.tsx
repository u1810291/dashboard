import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import { useFormatMessage } from 'apps/intl';
import { SkeletonLoader, useConfirmDelete, notification } from 'apps/ui';
import { ReactComponent as IconLoad } from 'assets/icon-load.svg';
import { utcToLocalFormat } from 'lib/date';
import { titleCase } from 'lib/string';
import { CollaboratorRoles } from 'models/Collaborator.model';
import { Loadable } from 'models/Loadable.model';
import { Routes } from 'models/Router.model';
import { getIdentityStatusLabel, getStatusById, IdentityStatuses } from 'models/Status.model';
import { VerificationId } from 'models/Verification.model';
import { VerificationListItem } from 'models/VerificationOld.model';
import React, { useCallback, useMemo, useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectIdentityCollection } from 'state/identities/identities.selectors';
import { verificationRemove } from 'state/verification/verification.actions';
import { CSSProperties } from '@material-ui/styles';
import { RoleRenderGuard } from 'apps/merchant/guards/RoleRenderGuard';
import { useQuery } from 'lib/url';
import { useStyles } from './VerificationTableRow.styles';

export function VerificationTableRow({ index, style, data: { paddingBottom = 0 } = {} }: {
  index: number;
  style: CSSProperties;
  data: {
    paddingBottom?: number;
  };
}) {
  const classes = useStyles();
  const formatMessage = useFormatMessage();
  const dispatch = useDispatch();
  const [deleting, setDeleting] = useState<VerificationId>(null);
  const { asMerchantId } = useQuery();
  const verificationCollection = useSelector<any, Loadable<VerificationListItem[]>>(selectIdentityCollection);
  const verification = useMemo<VerificationListItem>(() => verificationCollection?.value[index], [verificationCollection, index]);
  const confirmDelete = useConfirmDelete(
    formatMessage('verificationModal.delete'),
    formatMessage('verificationModal.delete.confirm'),
  );
  const status = getStatusById(verification?.verificationStatus);

  const profileLink = useMemo<string>(() => {
    const baseLink = `${Routes.identity.profile.root}/${verification?.identityId}${Routes.identity.verification.root}/${verification?._id}`;
    if (asMerchantId) {
      return `${baseLink}?asMerchantId=${asMerchantId}`;
    }
    return baseLink;
  }, [verification, asMerchantId]);

  const handleRemove = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();
    if (deleting) {
      return;
    }
    try {
      setDeleting(verification?._id);
      await confirmDelete();
      await dispatch(verificationRemove(verification?._id));
    } catch (error) {
      if (!error) {
        // cancelled
        return;
      }
      console.error('identity remove error', error);
      notification.error(formatMessage('Error.common'));
      throw error;
    } finally {
      setDeleting(null);
    }
  }, [dispatch, deleting, confirmDelete, verification, formatMessage]);

  const handleStopPropagation = useCallback((event: React.MouseEvent) => event?.stopPropagation(), []);

  if (!verification || deleting) {
    return (
      // @ts-ignore
      <Box style={style} p={1.4} pt={2.4} width="100%" align="center" className={classes.loader}>
        <IconLoad width={25} />
      </Box>
    );
  }

  return (
    <Link to={profileLink} className={classes.link}>
      <Box style={{ ...style, paddingBottom }}>
        <Box
          className={classes.root}
          style={{ height: `${parseFloat(style?.height?.toString()) - paddingBottom}px` }}
          key={verification.identityId}
        >
          <Box className={classes.itemNameWrapper}>
            <Box mb={{ xs: 2, lg: 0 }} pr={{ xs: 3, lg: 0 }}>
              {!verification.fullName && verification.verificationStatus === IdentityStatuses.running ? (
                <SkeletonLoader animation="wave" variant="text" width={140} />)
                : !verification.fullName
                  ? (
                    <Typography variant="subtitle2" className={classes.itemNameEmpty}>
                      {formatMessage('identity.nameNotFound')}
                    </Typography>
                  )
                  : (
                    <Typography variant="subtitle2" className={classes.itemName}>{titleCase(verification.fullName)}</Typography>
                  )}
              <Box className={classes.label}>{formatMessage('identity.field.fullName')}</Box>
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
                  {formatMessage('statuses.deleted')}
                </Box>
              )}
              <Box className={classes.label}>{formatMessage('identity.field.verificationFlow')}</Box>
            </Box>
          </Box>
          <Box className={classes.itemData}>
            <Box mb={{ xs: 2, lg: 0 }}>
              {utcToLocalFormat(verification.sourceCreatedAt)}
              <Box className={classes.label}>{formatMessage('identity.field.dateCreated')}</Box>
            </Box>
          </Box>
          <Box className={classes.itemStatusWrapper}>
            <Box className={classes.itemStatus}>
              <Box component="span" color={status?.color || 'common.gray68'} className={status?.style}>
                {formatMessage(getIdentityStatusLabel(status?.id || IdentityStatuses.unknown))}
              </Box>
              <Box className={classes.label}>{formatMessage('identity.field.status')}</Box>
            </Box>
            <Box className={classes.itemIcons}>
              <RoleRenderGuard roles={[CollaboratorRoles.ADMIN]}>
                <Box className={classes.iconDeleteWrapper}>
                  <IconButton size="small" onClick={handleRemove} tabIndex="-1" className={classes.iconButtonDelete}>
                    {verification._id === deleting ? <IconLoad /> : <FiTrash2 className="color-red" />}
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
                  title={formatMessage('VerificationTable.reviewNeeded')}
                >
                  <IconButton size="small" className={classes.iconButtonReview}>
                    <PriorityHighIcon />
                  </IconButton>
                </Tooltip>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Link>
  );
}
