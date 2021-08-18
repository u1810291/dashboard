import { Box, Button, Checkbox, FormControl, FormControlLabel, Typography } from '@material-ui/core';
import { Modal } from 'apps/overlay';
import { DocumentListOrdered, DocumentTypes } from 'models/Document.model';
import React, { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { selectMerchantCustomDocumentsModel } from 'state/merchant/merchant.selectors';
import { useStyles } from './DocumentSelect.styles';

export function DocumentSelect({
  checked,
  onSubmit,
  unavailable,
  custom,
  variant = 'add',
}: {
  checked: (DocumentTypes | string)[];
  unavailable: (DocumentTypes | string)[];
  onSubmit: (checked: (DocumentTypes | string)[]) => void;
  variant: 'change' | 'add';
  custom?: boolean;
}) {
  const intl = useIntl();
  const classes = useStyles();
  const merchantCustomDocumentsModel = useSelector(selectMerchantCustomDocumentsModel);
  const getDocTypesPool = useCallback(() => (custom ? merchantCustomDocumentsModel.value.map((customDocument) => customDocument.type) : DocumentListOrdered), [custom, merchantCustomDocumentsModel]);
  const [availableDocumentTypes, setAvailableDocumentTypes] = useState<(DocumentTypes| string)[]>(getDocTypesPool());
  const [selectedDocuments, setSelectedDocuments] = useState<(DocumentTypes | string)[]>(checked || []);

  const handleCheck = useCallback((documentType: DocumentTypes | string) => () => {
    setSelectedDocuments((selected) => {
      if (selected.includes(documentType)) {
        return [...selected].filter((item) => documentType !== item);
      }

      return [...selected, documentType];
    });
  }, [setSelectedDocuments]);

  const handleSubmit = useCallback(() => {
    if (selectedDocuments?.length > 0) {
      onSubmit(selectedDocuments);
    }
  }, [selectedDocuments, onSubmit]);

  useEffect(() => {
    setAvailableDocumentTypes(getDocTypesPool().filter((doc) => checked?.includes(doc) || !unavailable?.includes(doc)));
  }, [checked, unavailable, custom, getDocTypesPool]);

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
                    checked={selectedDocuments.includes(documentType)}
                    onChange={handleCheck(documentType)}
                    color="primary"
                  />
              )}
                label={custom ? merchantCustomDocumentsModel.value.find((el) => el.type === documentType)?.name : intl.formatMessage({ id: `flow.documentTypeStep.${documentType}` })}
              />
              {documentIndex < availableDocumentTypes?.length - 1 && (<Typography>{intl.formatMessage({ id: 'DocumentVerification.settings.documentStep.or' })}</Typography>)}
            </React.Fragment>
          ))}
        </Box>
        <Box mt="auto" textAlign="right">
          <Button className={classes.button} variant="contained" color="primary" disabled={selectedDocuments?.length < 1} onClick={handleSubmit}>
            {intl.formatMessage({ id: variant === 'add' ? 'DocumentVerification.settings.button.add' : 'DocumentVerification.settings.button.save' })}
          </Button>
        </Box>
      </FormControl>
    </Modal>
  );
}
