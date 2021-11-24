import { Box, Button, FormControlLabel, Grid, Radio, RadioGroup, Typography, Link } from '@material-ui/core';
import { PageLoader } from 'apps/layout';
import { BoxBordered, notification, Warning, WarningSize, WarningTypes } from 'apps/ui';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import Switch from '@material-ui/core/Switch';
import { merchantUpdateFlow } from 'state/merchant/merchant.actions';
import { isNil } from 'lib/isNil';
import { selectBiometricPattern, selectCurrentFlow } from 'state/merchant/merchant.selectors';
import { BiometricTypes } from 'models/Biometric.model';
import { VerificationPatternTypes } from 'models/VerificationPatterns.model';
import { ErrorMessages } from 'models/Error.model';
import { useStyles } from './ESignatureConfiguration.styles';
import { getESignatureType, ESignatureDocumentId, ESignatureTypes, getESignatureDocument } from '../../models/ESignature.model';
import { DocumentsList } from '../DocumentList/DocumentsList';
import { selectCanUseESignature, selectESignatureAcceptanceCriteria, selectESignatureDocuments, selectESignaturePattern } from '../../state/eSignature.selectors';
import { eSignatureDocumentUpload } from '../../state/eSignature.actions';

export function ESignatureConfiguration() {
  const intl = useIntl();
  const classes = useStyles();
  const dispatch = useDispatch();
  const fileInput = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [eSignatureType, setESignatureType] = useState(getESignatureType(useSelector(selectESignatureAcceptanceCriteria)));
  const [documents, setDocuments] = useState(useSelector(selectESignatureDocuments));
  const isESignatureEnabled = useSelector(selectESignaturePattern);
  const biometricPattern = useSelector(selectBiometricPattern);
  const flow = useSelector(selectCurrentFlow);
  const canUseESignature = useSelector(selectCanUseESignature);

  const handleUpload = useCallback(async ({ target: { files } }) => {
    if (!files.length) {
      return;
    }
    if (!canUseESignature) {
      return;
    }
    setIsLoading(true);
    const file = files[0];
    const form = new FormData();
    form.append('template-document', file);
    try {
      const newDocuments = await dispatch(eSignatureDocumentUpload(form));
      setDocuments(newDocuments);
    } catch (err) {
      notification.error(ErrorMessages.ERROR_COMMON);
    } finally {
      fileInput.current.value = null;
      setIsLoading(false);
    }
  }, [dispatch, canUseESignature]);

  const handleSave = useCallback(async () => {
    setIsLoading(true);
    try {
      await dispatch(merchantUpdateFlow({
        electronicSignature: {
          templates: {
            order: documents.order,
            list: documents.list.map((document) => getESignatureDocument(document)),
          },
          acceptanceCriteria: {
            isFullNameRequired: eSignatureType === ESignatureTypes.NameTyping || eSignatureType === ESignatureTypes.Document || eSignatureType === ESignatureTypes.FaceSignature,
            isDocumentsRequired: eSignatureType === ESignatureTypes.Document || eSignatureType === ESignatureTypes.FaceSignature,
            isFaceMatchRequired: eSignatureType === ESignatureTypes.FaceSignature,
          },
        },
      }));
    } catch (e: any) {
      console.error('error', e.message);
      notification.error(intl.formatMessage({ id: 'Error.common' }));
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, intl, eSignatureType, documents]);

  const handleUploadClick = useCallback(() => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  }, []);

  const handleESignatureToggle = useCallback(async ({ target: { checked } }) => {
    setIsLoading(true);
    try {
      await dispatch(merchantUpdateFlow({
        verificationPatterns: {
          [VerificationPatternTypes.ESignatureDocuments]: checked,
        },
      }));
    } catch (e: any) {
      console.error('error', e.message);
      notification.error(intl.formatMessage({ id: 'Error.common' }));
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, intl]);

  const handleESignatureTypeChange = useCallback(({ target: { value } }) => {
    setESignatureType(value);
  }, []);

  const handleChangeOrder = useCallback((newOrder: ESignatureDocumentId[]) => {
    setDocuments((prevState) => ({
      ...prevState,
      order: newOrder,
    }));
  }, []);

  const handleDocumentDelete = useCallback((id: ESignatureDocumentId) => {
    setDocuments((prevState) => ({
      order: prevState.order.filter((orderId) => orderId !== id),
      list: prevState.list.filter((document) => document.id !== id),
    }));
  }, []);

  const hasDocuments = useMemo(() => (
    !isNil(documents) && !isNil(documents.list) && documents.list.length !== 0
  ), [documents]);

  return (
    <Box className={classes.fullWidth}>
      <BoxBordered mt={2}>
        <Grid container spacing={1}>
          {!canUseESignature && (
            <Warning
              type={WarningTypes.Warning}
              size={WarningSize.Normal}
              label={intl.formatMessage({ id: 'ESignature.disabled' }, {
                email: (
                  <Link
                    className={classes.email}
                    color="primary"
                    href="mailto:sales@mati.io"
                    rel="noopener"
                  >
                    sales@mati.io
                  </Link>
                ),
              })}
              bordered
            />
          )}
          <Grid item xs={12} className={!canUseESignature && classes.disabledStep}>
            <Box className={classes.titleContainer}>
              <Box>
                <Typography variant="h4">
                  {intl.formatMessage({ id: 'ESignature.title' })}
                </Typography>
              </Box>
              <Box>
                <Switch
                  name="eSignature"
                  color="primary"
                  size="small"
                  checked={isESignatureEnabled}
                  onChange={handleESignatureToggle}
                  disabled={!canUseESignature || isLoading}
                />
              </Box>
            </Box>
          </Grid>
          <Grid item>
            <Typography variant="body1" color="textSecondary">
              {intl.formatMessage({ id: 'ESignature.description' })}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h5">
              {intl.formatMessage({ id: 'ESignature.method.title' })}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" color="textSecondary">
              {intl.formatMessage({ id: 'ESignature.method.description' })}
            </Typography>
          </Grid>
          <RadioGroup
            aria-label="age-check-configuration"
            name="age-check-configuration"
            value={eSignatureType}
            onChange={handleESignatureTypeChange}
          >
            <Grid container className={classes.radioGroup}>
              <Grid item className={classes.fullWidth}>
                <FormControlLabel
                  control={<Radio color="default" disabled={isLoading} />}
                  label={(
                    <Typography variant="h5" color="textSecondary">
                      {intl.formatMessage({ id: 'ESignature.method.nameTyping.title' })}
                    </Typography>
                  )}
                  value={ESignatureTypes.NameTyping}
                />
                <Box pl={3}>
                  <Typography variant="body2" color="textSecondary">
                    {intl.formatMessage({ id: 'ESignature.method.nameTyping.description' })}
                  </Typography>
                </Box>
              </Grid>
              <Grid item className={classes.fullWidth}>
                <FormControlLabel
                  control={<Radio color="default" disabled={!flow.verificationSteps.length || isLoading} />}
                  label={(
                    <Typography variant="h5" color="textSecondary">
                      {intl.formatMessage({ id: 'ESignature.method.document.title' })}
                    </Typography>
                  )}
                  value={ESignatureTypes.Document}
                />
                <Box pl={3}>
                  <Typography variant="body2" color="textSecondary">
                    {intl.formatMessage({ id: 'ESignature.method.document.description' })}
                  </Typography>
                  {!flow.verificationSteps.length && (
                    <Warning
                      type={WarningTypes.Warning}
                      size={WarningSize.Normal}
                      label={intl.formatMessage({ id: 'ESignature.method.document.warning' })}
                      bordered
                    />
                  )}
                </Box>
              </Grid>
              <Grid item className={classes.fullWidth}>
                <FormControlLabel
                  control={<Radio color="default" disabled={biometricPattern === BiometricTypes.none || isLoading} />}
                  label={(
                    <Typography variant="h5" color="textSecondary">
                      {intl.formatMessage({ id: 'ESignature.method.faceSignature.title' })}
                    </Typography>
                  )}
                  value={ESignatureTypes.FaceSignature}
                />
                <Box pl={3}>
                  <Typography variant="body2" color="textSecondary">
                    {intl.formatMessage({ id: 'ESignature.method.faceSignature.description' })}
                  </Typography>
                  {biometricPattern === BiometricTypes.none && (
                    <Warning
                      type={WarningTypes.Warning}
                      size={WarningSize.Normal}
                      label={intl.formatMessage({ id: 'ESignature.method.faceSignature.warning' })}
                      bordered
                    />
                  )}
                </Box>
              </Grid>
            </Grid>
          </RadioGroup>
        </Grid>
      </BoxBordered>
      <BoxBordered mt={2}>
        <Grid container spacing={1}>
          <Grid item>
            <Typography variant="h5">
              {intl.formatMessage({ id: 'ESignature.documents.title' })}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" color="textSecondary">
              {intl.formatMessage({ id: 'ESignature.documents.description' })}
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              startIcon={isLoading && <PageLoader size={14} />}
              onClick={handleUploadClick}
              disabled={isLoading}
            >
              {intl.formatMessage({ id: 'ESignature.documents.button.upload' })}
            </Button>
            <input
              ref={fileInput}
              type="file"
              value=""
              className={classes.hidden}
              onChange={handleUpload}
            />
          </Grid>
        </Grid>
        {hasDocuments && (
          <Grid item>
            <DocumentsList
              documents={documents}
              onChangeOrder={handleChangeOrder}
              onDocumentDelete={handleDocumentDelete}
            />
          </Grid>
        )}
      </BoxBordered>
      <Box mt={2}>
        <Button
          variant="contained"
          color="primary"
          startIcon={isLoading && <PageLoader size={14} />}
          onClick={handleSave}
          disabled={!canUseESignature || isLoading}
        >
          {intl.formatMessage({ id: 'ESignature.button.save' })}
        </Button>
      </Box>
    </Box>
  );
}
