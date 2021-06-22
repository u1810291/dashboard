import { Box, Collapse, Grid, IconButton } from '@material-ui/core';
import { StatusBadge } from 'apps/ui';
import { selectVerification } from 'apps/verification/state/verification.selectors';
import classNames from 'classnames';
import { ProductIntegrationTypes } from 'models/Product.model';
import { IdentityStatuses } from 'models/Status.model';
import { VerificationResponse } from 'models/Verification.model';
import React, { useCallback, useEffect, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { VerificationLink } from '../VerificationLink/VerificationLink';
import { useStyles } from './PassedFlowSelect.styles';

export interface PassedFlowSelectProps {
  flowName: string,
  platformType: ProductIntegrationTypes,
  verifications?: Array<VerificationResponse>,
  badgeStatusId: IdentityStatuses,
  setIsSelected: () => void
  isSelected: boolean,
  isOpened: boolean,
}

export function PassedFlowSelect({ flowName, platformType, setIsSelected, isSelected, isOpened, verifications, badgeStatusId }: PassedFlowSelectProps) {
  const classes = useStyles();
  const [selectedVerification, setSelectedVerification] = useState(null);
  const verification = useSelector(selectVerification);
  const handleCheckSelected = useCallback((id) => selectedVerification === id, [selectedVerification]);

  useEffect(() => {
    if (verification?._id) {
      setSelectedVerification(verification._id);
    }
  }, [verification]);

  return (
    <Box mb={2.5} className={classes.wrapper}>
      {badgeStatusId && (<StatusBadge statusId={badgeStatusId} />)}
      <Grid container alignItems="center" wrap="nowrap" className={classNames(classes.select, { [classes.selected]: isSelected })}>
        <Grid item>
          <Box mb={0.5} color="common.black90" fontSize={18}>
            {flowName}
          </Box>
          {/* Inputs field for next iteration */}
          {/* <Box color="common.black75">
            {intl.formatMessage({ id: 'IdentityProfile.label.userInputs' })}
            &nbsp;
            <Box component="span" fontWeight="bold">
              {inputs}
            </Box>
          </Box> */}
        </Grid>
        <Box ml="auto" color="common.black90" fontWeight="bold">
          {platformType}
        </Box>
        {verifications && (
          <Box ml={2}>
            <IconButton className={classNames(classes.button, { [classes.rotated]: isOpened })} onClick={setIsSelected}>
              <FiChevronDown />
            </IconButton>
          </Box>
        )}
      </Grid>
      {verifications && (
        <Collapse in={isOpened}>
          <Box py={1} className={classes.collapse}>
            {verifications.map(({ createdAt, _id: id, verificationStatus }) => id && (
              <VerificationLink onSelect={setSelectedVerification} isSelected={handleCheckSelected(id)} key={id} date={createdAt} id={id} status={verificationStatus} />
            ))}
          </Box>
        </Collapse>
      )}
    </Box>
  );
}
