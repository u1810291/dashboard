import { Box, Collapse, Grid, IconButton } from '@material-ui/core';
import { StatusBadge, VerificationItem } from 'apps/ui';
import classNames from 'classnames';
import { Routes } from 'models/Router.model';
import { IdentityStatuses } from 'models/Status.model';
import { VerificationListItem } from 'models/VerificationOld.model';
import React, { useCallback, useEffect, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { selectVerification } from 'apps/Verification';
import { useStyles } from './PassedFlowSelect.styles';

export interface PassedFlowSelectProps {
  flowName: string;
  verifications?: VerificationListItem[];
  badgeStatusId: IdentityStatuses;
  setIsSelected: () => void;
  onSetActive: () => void;
  isSelected: boolean;
  isOpened: boolean;
}

export function PassedFlowSelect({ flowName, setIsSelected, isSelected, isOpened, verifications, badgeStatusId, onSetActive }: PassedFlowSelectProps) {
  const classes = useStyles();
  const { identityId } = useParams();
  const [selectedVerification, setSelectedVerification] = useState<string | null>(null);
  const verification = useSelector(selectVerification);
  const handleCheckSelected = useCallback((id) => selectedVerification === id, [selectedVerification]);
  const history = useHistory();

  const handleVerificationClick = useCallback((id) => () => {
    history.push(`${Routes.identity.profile.root}/${identityId}${Routes.identity.verification.root}/${id}`);
    setSelectedVerification(id);
    onSetActive();
  }, [history, identityId, onSetActive]);

  useEffect(() => {
    if (verification?._id) {
      setSelectedVerification(verification._id);
    }
  }, [verification]);

  return (
    <Box mb={2.5} className={classes.wrapper}>
      {badgeStatusId && (<StatusBadge statusId={badgeStatusId} />) }
      <Grid onClick={setIsSelected} container alignItems="center" wrap="nowrap" className={classNames(classes.select, { [classes.selected]: isSelected })}>
        <Grid item>
          <Box color="common.black90">
            {flowName}
          </Box>
          {/* Inputs field for next iteration */}
          {/* <Box mt={0.5} color="common.black75">
            {intl.formatMessage({ id: 'IdentityProfile.label.userInputs' })}
            &nbsp;
            <Box component="span" fontWeight="bold">
              {inputs}
            </Box>
          </Box> */}
        </Grid>
        {verifications && (
          <Box ml="auto" pl={2}>
            <IconButton className={classNames(classes.button, { [classes.rotated]: isOpened })}>
              <FiChevronDown />
            </IconButton>
          </Box>
        )}
      </Grid>
      {verifications && (
        <Collapse in={isOpened}>
          <Box py={1} className={classes.collapse}>
            {verifications.map(({ sourceCreatedAt, _id: id, verificationStatus }) => id && (
              <VerificationItem key={id} onClick={handleVerificationClick(id)} isSelected={handleCheckSelected(id)} date={sourceCreatedAt} id={id} status={verificationStatus} />
            ))}
          </Box>
        </Collapse>
      )}
    </Box>
  );
}
