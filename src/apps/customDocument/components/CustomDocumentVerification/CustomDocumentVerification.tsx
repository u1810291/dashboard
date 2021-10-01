import { Typography, Box, Paper, Grid } from '@material-ui/core';
import React, { useMemo, useCallback } from 'react';
import { useIntl } from 'react-intl';
import { FiFilePlus } from 'react-icons/fi';
import { BsDownload } from 'react-icons/bs';
import { CheckBarExpandable, CheckResultLogo, ZoomableImage } from 'apps/ui';
import { CheckStepDetails } from 'apps/checks';
import { DocumentReadingStep } from 'apps/documents/components/DocumentReadingStep/DocumentReadingStep';
import { DocumentTypes } from 'models/Document.model';
import { StepStatus } from 'models/Step.model';
import { downloadBlob } from 'lib/file';
import { getMedia } from 'apps/media';
import { useStyles } from './CustomDocumentVerification.styles';
import { CustomVerificationDocument } from '../../models/customDocument.model';

export function CustomDocumentVerification({ document, identity, onDocumentUpdate, isFlowBuilder }: {
  document: CustomVerificationDocument;
  identity: any;
  onDocumentUpdate: (normalizedData: any, documentType: DocumentTypes) => Promise<void>;
  isFlowBuilder?: boolean;
}) {
  const intl = useIntl();
  const classes = useStyles(isFlowBuilder);
  const status = useMemo(() => {
    if (document.documentReadingStep || document.customDocumentStep) {
      return document.documentStatus;
    }

    return StepStatus.Success;
  }, [document]);

  const handleDownloadPDF = useCallback(async () => {
    const request = await getMedia(document.pdf);
    const blob = await request.blob();
    downloadBlob(blob, document.name);
  }, [document]);

  return (
    <Paper>
      <Box p={2}>
        <Box mb={2}>
          <Typography className={classes.title} variant="subtitle2">
            {intl.formatMessage({ id: 'CustomDocuments.settings.title' })}
          </Typography>
          {!document.pdf && (
            <Typography variant="subtitle2" className={classes.header}>
              {document.name}
            </Typography>
          )}
        </Box>
        <Grid container className={classes.wrapper}>
          <Grid item xs={12} lg={4} className={classes.imagesWrapper}>
            {document.pdf ? (
              <div className={classes.borderBox}>
                <FiFilePlus className={classes.icon} />
                <Box>
                  <Typography variant="subtitle2">
                    {document.name}
                  </Typography>
                  <div tabIndex={0} role="button" className={classes.downloadButton} onClick={handleDownloadPDF} onKeyPress={() => { /* */ }}>
                    <Typography variant="body1" color="primary">
                      <BsDownload className={classes.uploadIcon} />
                      {intl.formatMessage({ id: 'CustomDocuments.result.downloadPDF' })}
                    </Typography>
                  </div>
                </Box>
              </div>
            ) : (
              <Grid container direction="column" alignItems="center" className={classes.images}>
                <Grid container justify="center">
                  {document.photos.map((photo, index) => (
                    <Grid item key={index} className={classes.image}>
                      <ZoomableImage src={photo} alt={document.type} />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            )}
          </Grid>
          <Grid item xs={12} lg={4} className={classes.itemWrapper}>
            {document.documentReadingStep && (
              <DocumentReadingStep
                documentType={document.type}
                step={document.documentReadingStep}
                fields={document.fields}
                isEditable={identity.isEditable}
                onReading={document.onReading}
                onDocumentUpdate={onDocumentUpdate}
                identityId={identity?.id}
              />
            )}
          </Grid>
          <Grid item xs={12} lg={4} className={classes.itemWrapper}>
            <Grid container>
              <Box mx={{ xs: 'auto', md: 0.7 }}>
                <CheckResultLogo status={status} />
              </Box>
              {(status !== StepStatus.Skipped) && (
                <Grid item container>
                  {document.documentReadingStep && document.documentFailedCheckSteps.map((step) => (
                    <CheckBarExpandable step={step} key={step.id}>
                      <CheckStepDetails step={step} />
                    </CheckBarExpandable>
                  ))}
                  {document.customDocumentStep && (
                    <CheckBarExpandable step={document.customDocumentStep} key={document.customDocumentStep.id}>
                      <CheckStepDetails step={document.customDocumentStep} />
                    </CheckBarExpandable>
                  )}
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
