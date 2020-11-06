import React, { useCallback } from 'react';
import { Grid, Paper, Box, Typography } from '@material-ui/core';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { get } from 'lodash';
import { StatusSelector } from '../StatusSelector/StatusSelector';
import { identityUpdate } from '../../../../state/identities/identities.actions';
import { useStyles } from './VerificationSummary.styles';
import { VerificationDocument } from '../VerificationDocument/VerificationDocument';
import { VerificationDateAndNumber } from '../VerificationDateAndNumber/VerificationDateAndNumber';
import { VerificationFlow } from '../VerificationFlow/VerificationFlow';
import { VerificationIpCheck } from '../VerificationIpCheck/VerificationIpCheck';
import { VerificationBioCheckSummary } from '../VerificationBioCheckSummary/VerificationBioCheckSummary';
import { VerificationDeviceCheck } from '../VerificationDeviceCheck/VerificationDeviceCheck';
import { getDevicePlatformType, PlatformTypes } from '../../../../models/DeviceCheck.model';
import { VerificationSource } from '../VerificationSource/VerificationSource';

export function VerificationSummary({ identity }) {
  const dispatch = useDispatch();
  const intl = useIntl();
  const classes = useStyles();

  const handleStatusChange = useCallback(async (status) => {
    await dispatch(identityUpdate(identity.id, { status }));
  }, [dispatch, identity]);

  const { ipCheck, biometric } = identity;

  const verificationFlowName = get(identity, '_embedded.verification.flow.name', null);
  const platformType = getDevicePlatformType(identity);

  return (
    <Paper>
      <Box p={2}>
        <Box mb={2}>
          <Typography className={classes.title} variant="subtitle2" gutterBottom>
            {intl.formatMessage({ id: 'identity.summary.title' })}
          </Typography>
        </Box>
        <Box mb={3}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={4}>
              <StatusSelector statusId={identity.status} identityId={identity.id} onSelect={handleStatusChange} />
            </Grid>
            <Grid item xs={12} lg={4}>
              <VerificationDateAndNumber date={identity.dateCreated} number={identity.id} />
            </Grid>
            <Grid item xs={12} lg={2}>
              {!!verificationFlowName && <VerificationFlow flowId={verificationFlowName} />}
              <VerificationSource platformType={platformType} />
            </Grid>
            {/* Next feature */}
            {/* <Grid item container xs={12} lg={2} alignItems="center" className={classes.button}> */}
            {/*  <FreshworksWidgetButton text={intl.formatMessage({ id: 'identity.summary.report' })} /> */}
            {/* </Grid> */}
          </Grid>
        </Box>
        <Grid container spacing={2}>
          {/* Biometrics Check */}
          <Grid item container xs={12} lg={4}>
            <VerificationBioCheckSummary identity={identity} biometric={biometric} />
          </Grid>

          {/* Documents Checks */}
          {identity.documents.map((doc, index) => (
            <Grid item xs={12} lg={4} key={doc.country + doc.type}>
              <VerificationDocument document={doc} documentIndex={index} />
            </Grid>
          ))}

          {/* Additional Checks */}
          {ipCheck && !ipCheck.error && ipCheck.data && (
            <Grid item xs={12} lg={4}>
              <VerificationIpCheck ipCheck={ipCheck} />
            </Grid>
          )}

          {platformType !== PlatformTypes.Api && (
            <Grid item xs={12} lg={4}>
              <VerificationDeviceCheck identity={identity} />
            </Grid>
          )}
        </Grid>
      </Box>
    </Paper>
  );
}
