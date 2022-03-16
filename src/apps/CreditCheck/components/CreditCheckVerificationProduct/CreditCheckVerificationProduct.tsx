import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import classnames from 'classnames';
import { Alert, Warning, WarningTypes } from 'apps/ui';
import ReactJsonViewer from 'react-json-view';
import { Grid, Box, Typography, Button } from '@material-ui/core';
import { DocumentTypes } from 'models/Document.model';
import { creditCheckDisplayOptions } from 'models/CreditCheck.model';
import { creditCheckManualRun } from '../../state/CreditCheck.actions';
import { Speedometer } from '../Speedometer/Speedometer';
import { useStyles } from './CreditCheckVerificationProduct.styles';
import { useCreditCheck } from '../../hooks/creditCheck.hook';

export function CreditCheckVerificationProduct() {
  const intl = useIntl();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { creditDocumentStep, id, isShowManualCreditCheckButton, isCheckInProgress, isPostResultPhase } = useCreditCheck();
  const handleCreditCheckManualRun = useCallback(() => {
    dispatch(creditCheckManualRun(id, DocumentTypes.NationalId, creditDocumentStep.id));
  }, [dispatch, creditDocumentStep, id]);

  if (isShowManualCreditCheckButton) {
    return (
      <Box mt={2} className={classes.manualButtonWrap}>
        <Typography variant="h4" gutterBottom className={classes.colorGrey}>
          {intl.formatMessage({ id: 'CreditCheck.creditReport.title' })}
        </Typography>
        <Box mb={2} className={classes.colorGrey}>
          {intl.formatMessage({ id: 'CreditCheck.creditReport.subTitle' })}
        </Box>
        <Button
          color="primary"
          variant="contained"
          onClick={handleCreditCheckManualRun}
          size="large"
          className={classes.ultraLargeButton}
        >
          {intl.formatMessage({ id: 'CreditCheck.requestCreditReport' })}
        </Button>
      </Box>
    );
  }

  if (isCheckInProgress) {
    const messageType = isPostResultPhase ? 'running' : 'waiting';
    return (
      <Box mt={2} className={classes.manualButtonWrap}>
        <Warning
          type={WarningTypes.Notify}
          label={intl.formatMessage({ id: `CreditCheck.warning.${messageType}` })}
          filled
          isLabelColored
        />
      </Box>
    );
  }

  if (creditDocumentStep.error) {
    const { code: errorCode } = creditDocumentStep.error;

    return (
      <Box mt={2} className={classes.manualButtonWrap}>
        <Box mt={4} className={classes.labelError}>
          <Alert
            title={intl.formatMessage({
              id: `CreditCheck.check.${errorCode}.message`,
              defaultMessage: intl.formatMessage({ id: 'SecurityCheckStep.system.internalError.message' }),
            })}
          />
        </Box>
      </Box>
    );
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="subtitle2" className={classnames(classes.colorGrey, classes.marginBottom10)}>
          {intl.formatMessage({ id: 'CreditCheck.verification.summary' })}
        </Typography>
        <Grid container spacing={3}>
          <Grid item className={classes.speedometerWrap}>
            <Speedometer value={creditDocumentStep.data.creditScore} />
          </Grid>
          <Grid container item className={classes.summaryList}>
            {Object.entries(creditDocumentStep.data).map(([key, value]) => {
              if (creditCheckDisplayOptions[creditDocumentStep.id]?.[key]?.hidden) {
                return null;
              }

              return (
                <Box key={key} className={classes.summaryListItem}>
                  <Typography variant="body1" className={classes.summaryListItemValue}>
                    {value}
                  </Typography>
                  <Typography variant="body1" className={classes.colorGrey}>
                    {intl.formatMessage({ id: `identity.field.${key}` })}
                  </Typography>
                </Box>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container className={classes.marginBottom10} justify="space-between" alignItems="center">
          <Typography variant="subtitle2" className={classes.colorGrey}>
            {intl.formatMessage({ id: 'CreditCheck.verification.creditReport' })}
          </Typography>
          <Grid container item className={classes.downloadButtonsBox}>
            <Button
              className={classes.colorGrey}
              href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(creditDocumentStep.data))}`}
              download="credit_check.json"
            >
              {intl.formatMessage({ id: 'CreditCheck.verification.downloadJson' })}
            </Button>
          </Grid>
        </Grid>
        <ReactJsonViewer
          src={creditDocumentStep.data}
          collapsed
          displayDataTypes={false}
          displayObjectSize={false}
          enableClipboard={false}
        />
      </Grid>
    </Grid>
  );
}
