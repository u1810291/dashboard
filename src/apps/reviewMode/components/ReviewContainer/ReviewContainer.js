import { Box, Grid, Paper, Typography } from '@material-ui/core';
import { LivenessStep } from 'apps/biometrics';
import { IpCheck } from 'apps/checks/components/IpCheck/IpCheck';
import { Nom151Check } from 'apps/checks/components/Nom151Check/Nom151Check';
import { VerificationAdditionalChecks } from 'apps/checks/components/VerificationAdditionalChecks/VerificationAdditionalChecks';
import { DocumentStep } from 'apps/documents';
import { VerificationDeviceCheck } from 'apps/fingerPrint';
import { VerificationMetadata } from 'apps/identity/components/VerificationMetadata/VerificationMetadata';
import { useAFKListener } from 'apps/layout/hooks/AFKListener';
import { useOverlay } from 'apps/overlay';
import { ReviewModeTimeoutModal } from 'apps/reviewMode/components/ReviewModeTimeoutModal/ReviewModeTimeoutModal';
import { ReactComponent as IconLoad } from 'assets/icon-load-dark.svg';
import { getDevicePlatformType, PlatformTypes } from 'models/DeviceCheck.model';
import { getDownloadableFileName } from 'models/Identity.model';
import { Routes } from 'models/Router.model';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { reviewDocumentUpdate, reviewVerificationClear, verificationSkip } from '../../state/reviewMode.actions';
import { selectReviewVerificationId, selectReviewVerificationModelWithExtras, selectReviewVerificationWithExtras } from '../../state/reviewMode.selectors';

export function ReviewContainer() {
  const intl = useIntl();
  const dispatch = useDispatch();
  const history = useHistory();
  const verification = useSelector(selectReviewVerificationWithExtras);
  const verificationModel = useSelector(selectReviewVerificationModelWithExtras);
  const verificationId = useSelector(selectReviewVerificationId);
  const identity = useMemo(() => ({ id: verification?.identity, isEditable: true }), [verification]);
  const deviceFingerprint = useMemo(() => verification?.deviceFingerprint, [verification]);
  const downloadableFileName = useMemo(() => getDownloadableFileName(verification), [verification]);
  const platformType = useMemo(() => getDevicePlatformType(deviceFingerprint), [deviceFingerprint]);
  const isActive = useAFKListener(600);
  const [createOverlay, closeOverlay] = useOverlay();

  const handleAFKExit = useCallback(() => {
    dispatch(verificationSkip());
    const backPath = history?.location?.state?.from || Routes.list.root;
    closeOverlay();
    history.push(backPath);
    dispatch(reviewVerificationClear());
  }, [closeOverlay, dispatch, history]);

  const handleDocumentUpdate = useCallback(async (fields, documentType) => {
    await dispatch(reviewDocumentUpdate(verificationId, documentType, fields));
  }, [dispatch, verificationId]);

  useEffect(() => {
    if (!isActive) {
      createOverlay(<ReviewModeTimeoutModal onTimerEnd={handleAFKExit} timeoutSeconds={10} closeOverlay={closeOverlay} />);
    }
  }, [closeOverlay, createOverlay, handleAFKExit, isActive]);

  return (
    <>
      {verification && !verificationModel.isLoading && verificationModel.isLoaded ? (
        <Grid container spacing={2} direction="column" wrap="nowrap">

          {/* biometric */}
          <Grid item>
            <LivenessStep steps={verification?.biometric} downloadableFileName={downloadableFileName} />
          </Grid>

          {/* Documents */}
          {verification?.documents.map((doc, index) => (
            <React.Fragment key={doc.type}>
              {verification?.identity && (
              <Grid item>
                <DocumentStep
                  identity={identity}
                  document={doc}
                  documentIndex={index}
                  onDocumentUpdate={handleDocumentUpdate}
                  isScrollable
                />
              </Grid>
              )}
            </React.Fragment>
          ))}

          {/* IP check */}
          {verification?.ipCheck && !verification.ipCheck?.error && verification.ipCheck?.data && (
          <Grid item>
            <IpCheck data={verification.ipCheck.data} isChecking={verification.ipCheck.status < 200} />
          </Grid>
          )}

          {/* Additional checks */}
          <Grid item>
            <VerificationAdditionalChecks duplicateUserDetectionStep={verification.duplicateUserDetectionStep} ageCheck={verification.ageCheck} />
          </Grid>

          {/* Metadata */}
          {verification?.metadata && (
          <Grid item>
            <VerificationMetadata metadata={verification.metadata} />
          </Grid>
          )}

          {/* digitalSignature */}
          {verification?.digitalSignature && (
          <Grid item>
            <Nom151Check data={verification.digitalSignature} />
          </Grid>
          )}

          {deviceFingerprint && platformType !== PlatformTypes.Api && (
            <Grid item>
              <Paper>
                <Box p={2}>
                  <Box mb={2} color="common.black50">
                    <Typography variant="subtitle2">
                      {intl.formatMessage({ id: 'ReviewMode.header.deviceFingerprint' })}
                    </Typography>
                  </Box>
                  <Box width={{ lg: '33%' }}>
                    <Paper>
                      <Box py={2}>
                        <VerificationDeviceCheck deviceFingerprint={deviceFingerprint} />
                      </Box>
                    </Paper>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          )}

        </Grid>
      ) : (
        <Box m="auto">
          <Grid container direction="column" alignItems="center">
            <IconLoad width={22} />
            <Box my={2} color="common.black75">
              <Typography variant="h4">{intl.formatMessage({ id: 'ReviewMode.noVerifications' })}</Typography>
            </Box>
          </Grid>
        </Box>
      )}
    </>
  );
}
