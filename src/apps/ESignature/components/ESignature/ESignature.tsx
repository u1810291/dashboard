import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import { FiDownload } from 'react-icons/fi';
import React, { useMemo, useCallback, useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useFormatMessage } from 'apps/intl';
import { downloadESignaturePDFDocument, ESignatureDocumentId, ESignatureFields, ESignatureStep } from 'models/ESignature.model';
import { CheckStepDetailsEntry } from 'apps/checks/components/CheckStepDetails/CheckStepDetailsEntry';
import { BoxBordered, CheckBarExpandable, ZoomableImage, IsDataGenerated, NoData, Select, ButtonStyled } from 'apps/ui';
import { useStyles } from './ESignature.styles';

export function ESignature({ step }: {
  step: ESignatureStep;
}) {
  const classes = useStyles();
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [selectedDocumentImages, setSelectedDocumentImages] = useState([]);
  const [isDocumentLoading, setIsDocumentLoading] = useState(false);
  const formatMessage = useFormatMessage();

  const loadDocumentImages = useCallback(async (document) => {
    setSelectedDocumentImages(document.pdfDocument.documentImages);
  }, []);

  const handleSelect = useCallback(async (event) => {
    const id: ESignatureDocumentId = event.target.value;

    if (selectedDocument !== id) {
      const newDocument = step.data.readDetails.find((detail) => detail.documentId === id);

      setIsDocumentLoading(true);
      setSelectedDocument(newDocument);
      await loadDocumentImages(newDocument);
      setIsDocumentLoading(false);
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
          <Typography className={classes.title} variant="subtitle2" gutterBottom>{formatMessage('ESignature.step.title')}</Typography>
        </Box>
        {step.error && (
          <BoxBordered p={1} pt={2}>
            <CheckBarExpandable step={step} title="ESignature.step.title">
              <Card raised={false} className={classes.card}>
                <CardContent>
                  <Box>
                    {formatMessage(`Error.${step.error?.code}`, { defaultMessage: formatMessage('Error.common') })}
                  </Box>
                </CardContent>
              </Card>
            </CheckBarExpandable>
          </BoxBordered>
        )}
        {step.data?.readDetails && (
          <Box mt={0.5}>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={5}>
                <BoxBordered mb={2}>
                  <Select
                    labelId="document-label"
                    id="document"
                    variant="outlined"
                    onChange={handleSelect}
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
                {selectedDocument && (
                  <BoxBordered>
                    <Grid>
                      <Grid container direction="column">
                        {ESignatureFields.map((fieldName) => selectedDocument[fieldName] && (
                          <Grid item key={fieldName}>
                            <CheckStepDetailsEntry label={fieldName} value={selectedDocument[fieldName]} />
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                  </BoxBordered>
                )}
              </Grid>
              <Grid item xs={12} lg={7}>
                <BoxBordered pt={0.5}>
                  {isDocumentLoading && (
                    <Grid container justify="center" alignItems="center">
                      <CircularProgress color="inherit" size={28} />
                    </Grid>
                  )}
                  {(!selectedDocument && selectedDocumentImages.length === 0) && (
                    <Box mt={2}>
                      <NoData />
                    </Box>
                  )}
                  {(selectedDocument && selectedDocumentImages.length === 0) && (
                    <Box mt={2}>
                      <IsDataGenerated text={formatMessage('ESignature.verification.documentIsGenerating')} />
                    </Box>
                  )}
                  {(selectedDocument && selectedDocumentImages.length !== 0) && (
                    <Grid container justify="center" className={classes.wrapper}>
                      {!isESignaturePdfDownloadButtonDisabled && (
                        <ButtonStyled
                          onClick={handleDownload}
                          tabIndex={0}
                          className={classes.button}
                        >
                          <FiDownload size={17} />
                          <Box display="inline-block" ml={1}>{formatMessage('ESignature.step.button')}</Box>
                        </ButtonStyled>
                      )}
                      <Box mt={5}>
                        {selectedDocumentImages.map((url, index) => (
                          <Grid item key={`${url}-${index}`} className={classes.image}>
                            <ZoomableImage src={url} alt={`document-${index}`} />
                          </Grid>
                        ))}
                      </Box>
                    </Grid>
                  )}
                </BoxBordered>
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </Paper>
  );
}
