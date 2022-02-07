import { Box, Button, Card, CardContent, Grid, MenuItem, Paper, Select, Typography } from '@material-ui/core';
import React, { useMemo, useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { FiChevronDown } from 'react-icons/all';
import { downloadESignaturePDFDocument, ESignatureDocumentId, ESignatureFields, ESignatureStep } from 'models/ESignature.model';
import { CheckStepDetailsEntry } from 'apps/checks/components/CheckStepDetails/CheckStepDetailsEntry';
import { BoxBordered, CheckBarExpandable, ZoomableImage } from 'apps/ui';
import { useStyles } from './ESignature.styles';

export function ESignature({ step }: {
  step: ESignatureStep;
}) {
  const classes = useStyles();
  const intl = useIntl();
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [selectedDocumentImages, setSelectedDocumentImages] = useState([]);

  // TODO: @richvoronov refactor this
  const loadDocumentImages = useCallback(async (document) => {
    setSelectedDocumentImages(document.pdfDocument.documentImages);
  }, []);

  const handleSelect = useCallback(async (event) => {
    const id: ESignatureDocumentId = event.target.value;
    if (selectedDocument !== id) {
      const newDocument = step.data.readDetails.find((detail) => detail.documentId === id);
      setSelectedDocument(newDocument);
      await loadDocumentImages(newDocument);
    }
  }, [step, selectedDocument, loadDocumentImages]);

  const handleDownload = useCallback(async () => {
    await downloadESignaturePDFDocument(selectedDocument);
  }, [selectedDocument]);

  useEffect(() => {
    if (step?.data?.readDetails) {
      setSelectedDocument(step.data.readDetails[0]);
      loadDocumentImages(step.data.readDetails[0]);
    }
  }, [step, loadDocumentImages]);

  const isESignaturePdfDownloadButtonDisabled = useMemo(() => step?.error !== null || step?.data?.readDetails.some((detail) => detail.pdfDocument.documentImages.length === 0), [step]);

  if (!step) {
    return null;
  }

  return (
    <Paper>
      <Box p={2}>
        <Box mb={2}>
          <Typography className={classes.title} variant="subtitle2" gutterBottom>{intl.formatMessage({ id: 'ESignature.step.title' })}</Typography>
        </Box>
        {step.error && (
          <BoxBordered p={1} pt={2}>
            <CheckBarExpandable step={step} title="ESignature.step.title">
              <Card raised={false} className={classes.card}>
                <CardContent>
                  <Box>
                    {intl.formatMessage({
                      id: `Error.${step.error?.code}`,
                      defaultMessage: intl.formatMessage({ id: 'Error.common' }),
                    })}
                  </Box>
                </CardContent>
              </Card>
            </CheckBarExpandable>
          </BoxBordered>
        )}
        {step.data?.readDetails && (
          <Box mt={0.5}>
            <Grid container>
              <Grid item xs={12} lg={4}>
                <BoxBordered>
                  <Select
                    labelId="document-label"
                    id="document"
                    onChange={handleSelect}
                    IconComponent={FiChevronDown}
                    className={classes.select}
                    value={selectedDocument ? selectedDocument.documentId : null}
                  >
                    {step.data.readDetails.map((details) => (
                      <MenuItem key={details.documentId} value={details.documentId}>
                        {details.documentTemplate.originalDocument.originalFileName}
                      </MenuItem>
                    ))}
                  </Select>
                </BoxBordered>
                <BoxBordered>
                  <Grid>
                    {selectedDocument && (
                      <Grid container direction="column">
                        {ESignatureFields.map((fieldName) => selectedDocument[fieldName] && (
                          <Grid xs={6} item key={fieldName}>
                            <CheckStepDetailsEntry label={fieldName} value={selectedDocument[fieldName]} />
                          </Grid>
                        ))}
                      </Grid>
                    )}
                  </Grid>
                </BoxBordered>
              </Grid>
              <Grid item xs={12} lg={4}>
                <BoxBordered>
                  <Grid container justify="center" className={classes.wrapper}>
                    {selectedDocumentImages.map((url, index) => (
                      <Grid item key={index} className={classes.image}>
                        <ZoomableImage src={url} alt={url} />
                      </Grid>
                    ))}
                  </Grid>
                </BoxBordered>
              </Grid>
              <Grid item xs={12} lg={4}>
                <Button
                  variant="outlined"
                  onClick={handleDownload}
                  tabIndex={0}
                  className={classes.button}
                  disabled={isESignaturePdfDownloadButtonDisabled}
                >
                  {intl.formatMessage({ id: 'ESignature.step.button' })}
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </Paper>
  );
}
