import { Box, Grid, TableCell } from '@material-ui/core';
import { UserRoundAvatar } from 'apps/ui';
import { DateFormat, formatDate } from 'lib/date';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { findCollaboratorById } from 'models/Collaborator.model';
import { selectCollaboratorCollectionModel } from 'apps/collaborators/state/collaborator.selectors';
import { useStyles } from './VerificationHistoryMetadataCell.styles';

export function VerificationHistoryMetadataCell({ item, className, roundAvatar, header }) {
  const classes = useStyles();
  const { value: collaboratorList } = useSelector(selectCollaboratorCollectionModel);
  const collaborator = useMemo(() => findCollaboratorById(collaboratorList, item?.updatedBy?._id), [collaboratorList, item]);

  return (
    <TableCell className={className}>
      <Grid container alignItems="center" className={classes.avatarWrapper}>
        <Box width={40} height={40} mr={1} flexShrink={0}>
          {roundAvatar || (<UserRoundAvatar name={collaborator?.user?.userName} uniqueId={collaborator?.user?.id} />)}
        </Box>
        <Grid item>
          <Box>
            <Box mr={0.6} component="span" fontWeight="bold" color="common.black75" display="inline-block">
              {/* eslint-disable-next-line no-underscore-dangle */}
              {header || collaborator?.user?.userName || collaborator?.user?.email || item?.updatedBy?._email?.address}
            </Box>
            {/* Label for "userDeleted" and "reviewMode" */}
            {/* {item?.actionInfo?.label && (
            <Box component="span" fontWeight="bold" color="common.black50" display="inline-block">
              {`(${item?.actionInfo?.label})`}
            </Box>
            )} */}
          </Box>
          <Box color="common.black75">
            {formatDate(item?.updatedAt, DateFormat.DateTime)}
          </Box>
        </Grid>
      </Grid>
    </TableCell>
  );
}
