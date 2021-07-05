import { Box, Button, Checkbox, FormControl, FormControlLabel, Typography } from '@material-ui/core';
import { Modal } from 'apps/overlay';
import { DocumentListOrdered, DocumentTypes } from 'models/Document.model';
import React, { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { getSelectedDocuments, SelectedDocuments } from '../../models/DocumentVerification.model';
import { useStyles } from './DocumentSelect.styles';

export interface DocumentSelectProps {
  checked: DocumentTypes[];
  unavailable: DocumentTypes[];
  onSubmit: (checked: DocumentTypes[]) => void;
  variant: 'change' | 'add';
}

export function DocumentSelect({ checked, onSubmit, unavailable, variant = 'add' }: DocumentSelectProps) {
  const intl = useIntl();
  const classes = useStyles();
  const [availableDocumentTypes, setAvailableDocumentTypes] = useState<DocumentTypes[]>(DocumentListOrdered);
  const [selectedDocuments, setSelectedDocuments] = useState<SelectedDocuments>(getSelectedDocuments(checked) ?? {} as SelectedDocuments);
  const selectedDocumentsList: DocumentTypes[] = Object.keys(selectedDocuments).map((key) => selectedDocuments[key] && key).filter(Boolean) as DocumentTypes[];

  const handleCheck = useCallback((documentType: DocumentTypes) => (_, isChecked: boolean) => {
    setSelectedDocuments((prevState) => {
      const newState = { ...prevState };
      newState[documentType] = isChecked;
      return newState;
    });
  }, []);

  const handleSubmit = useCallback(() => {
    if (selectedDocumentsList?.length > 0) {
      onSubmit(selectedDocumentsList);
    }
  }, [selectedDocumentsList, onSubmit]);

  useEffect(() => {
    setAvailableDocumentTypes(DocumentListOrdered.filter((doc) => checked?.includes(doc) || !unavailable?.includes(doc)));
  }, [checked, unavailable]);

  return (
    <Modal className={classes.modal}>
      <FormControl className={classes.control}>
        <Box mb={1} color="common.black90" fontWeight="bold" fontSize={18}>
          {intl.formatMessage({ id: variant === 'add' ? 'DocumentVerification.settings.title.addStep' : 'DocumentVerification.settings.title.changeStep' })}
        </Box>
        <Box mb={2} color="common.black75">
          {intl.formatMessage({ id: 'DocumentVerification.settings.description.addStep' })}
        </Box>
        <Box className={classes.wrapper}>
          {availableDocumentTypes.map((documentType, documentIndex) => (
            <React.Fragment key={documentType}>
              <FormControlLabel
                control={(
                  <Checkbox
                    checked={!!selectedDocuments[documentType]}
                    onChange={handleCheck(documentType)}
                    color="primary"
                  />
              )}
                label={intl.formatMessage({ id: `flow.documentTypeStep.${documentType}` })}
              />
              {documentIndex < availableDocumentTypes?.length - 1 && (<Typography>{intl.formatMessage({ id: 'DocumentVerification.settings.documentStep.or' })}</Typography>)}
            </React.Fragment>
          ))}
        </Box>
        <Box mt="auto" textAlign="right">
          <Button className={classes.button} variant="contained" color="primary" disabled={selectedDocumentsList?.length < 1} onClick={handleSubmit}>
            {intl.formatMessage({ id: variant === 'add' ? 'DocumentVerification.settings.button.add' : 'DocumentVerification.settings.button.save' })}
          </Button>
        </Box>
      </FormControl>
    </Modal>
  );
}
