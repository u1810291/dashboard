import { Box, Collapse, Grid, IconButton } from '@material-ui/core';
import { StatusBadge, VerificationItem } from 'apps/ui';
import classNames from 'classnames';
import { ProductIntegrationTypes } from 'models/Product.model';
import { Routes } from 'models/Router.model';
import { IdentityStatuses } from 'models/Status.model';
import { PassedVerificationsResponse } from 'models/Verification.model';
import React, { useCallback, useEffect, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { selectVerification } from 'apps/Verification';
import { useStyles } from './PassedFlowSelect.styles';

export interface PassedFlowSelectProps {
  flowName: string;
  platformType: ProductIntegrationTypes;
  // verifications?: Array<VerificationResponse>,
  verifications?: PassedVerificationsResponse[];
  badgeStatusId: IdentityStatuses;
  setIsSelected: () => void;
  isSelected: boolean;
  isOpened: boolean;
}

export function PassedFlowSelect({ flowName, setIsSelected, isSelected, isOpened, verifications, badgeStatusId }: PassedFlowSelectProps) {
  const classes = useStyles();
  const { identityId } = useParams();
  const [selectedVerification, setSelectedVerification] = useState<string | null>(null);
  const verification = useSelector(selectVerification);
  const handleCheckSelected = useCallback((id) => selectedVerification === id, [selectedVerification]);
  const isSingleVerification = verifications?.length === 1;
  const history = useHistory();

  const handleVerificationClick = useCallback((id) => () => {
    history.push(`${Routes.identity.profile.root}/${identityId}${Routes.identity.verification.root}/${id}`);
  }, [history, identityId]);

  const handleSelectFirstVerification = useCallback(() => {
    if (verifications[0]) {
      handleVerificationClick(verifications[0]?._id)();
    }
  }, [handleVerificationClick, verifications]);

  useEffect(() => {
    if (verification?._id) {
      setSelectedVerification(verification._id);
    }
  }, [verification]);

  return (
    <Box mb={2.5} className={classes.wrapper}>
      {badgeStatusId && (<StatusBadge statusId={badgeStatusId} />) }
      <Grid onClick={isSingleVerification ? handleSelectFirstVerification : setIsSelected} container alignItems="center" wrap="nowrap" className={classNames(classes.select, { [classes.selected]: isSelected })}>
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
        {verifications && !isSingleVerification && (
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
            {verifications.map(({ createdAt, _id: id, verificationStatusDetails }) => id && (
              <VerificationItem key={id} onClick={handleVerificationClick(id)} isSelected={handleCheckSelected(id)} date={createdAt} id={id} status={verificationStatusDetails?.value} />
            ))}
          </Box>
        </Collapse>
      )}
    </Box>
  );
}
