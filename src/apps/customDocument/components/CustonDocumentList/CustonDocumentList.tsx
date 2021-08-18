import { Grid, Button, Box } from '@material-ui/core';
import { useOverlay } from 'apps/overlay';
import { notification } from 'apps/ui';
import classnames from 'classnames';
import { LoadableAdapter } from 'lib/Loadable.adapter';
import { isNil } from 'lib/isNil';
import { CustomDocumentResponse } from 'models/CustomDocument.model';
import { ErrorMessages } from 'models/Error.model';
import { MerchantTags } from 'models/Merchant.model';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { merchantCustomDocumentsLoad } from 'state/merchant/merchant.actions';
import { selectMerchantCustomDocumentsModel, selectMerchantModel, selectMerchantTags } from 'state/merchant/merchant.selectors';
import { useStyles } from './CustonDocumentList.styles';
import { updateEditedCustomDocument, deleteCustomDocument, updateCustomDocumentModal, resetCustomDocumentModal, saveCustomDocument } from '../../state/customDocument.actions';
import { CustomDocumentWizard } from '../CustomDocumentWizard/CustomDocumentWizard';

// TODO: delete compatibilityMode when old dashboard is fully deprecated
export function CustonDocumentList({ compatibilityMode = false }: { compatibilityMode?: boolean}) {
  const dispatch = useDispatch();
  const intl = useIntl();
  const classes = useStyles();
  const [createOverlay, closeOverlay] = useOverlay();
  const merchantModel = useSelector(selectMerchantModel);
  const customDocuments = useSelector(selectMerchantCustomDocumentsModel);
  const tags = useSelector(selectMerchantTags);
  const isCustomDocumentAvailable = useMemo<boolean>(() => tags.includes(MerchantTags.CanUseCustomDocument), [tags]);

  const handleSaveDocument = useCallback(async (customDocumetUpdate: Partial<CustomDocumentResponse>) => {
    try {
      await dispatch(saveCustomDocument(customDocumetUpdate));
      closeOverlay();
    } catch (error) {
      console.error(error);
    }
  }, [dispatch, closeOverlay]);

  const handleEdit = useCallback((index: number | null, customDocument: CustomDocumentResponse | null) => () => {
    dispatch(updateEditedCustomDocument(index));
    if (isNil(index)) {
      dispatch(resetCustomDocumentModal());
    } else {
      dispatch(updateCustomDocumentModal(customDocument));
    }
    createOverlay(<CustomDocumentWizard onDone={handleSaveDocument} />, { sticky: true });
  }, [dispatch, createOverlay, handleSaveDocument]);

  const handleDelete = useCallback((index: number) => async () => {
    const customDocumentType = customDocuments.value[index].type;
    try {
      await dispatch(deleteCustomDocument(customDocumentType));
    } catch (error) {
      console.error(error);
      notification.error(intl.formatMessage({ id: error?.data?.code ? `CustomDocuments.settings.error.${error.data.code}` : ErrorMessages.ERROR_COMMON }, { flowName: error?.data?.flowName }));
    }
  }, [dispatch, intl, customDocuments]);

  useEffect(() => {
    if (merchantModel.isLoaded && LoadableAdapter.isPristine(customDocuments) && !customDocuments.value?.length) {
      try {
        dispatch(merchantCustomDocumentsLoad());
      } catch (error) {
        console.error(error);
      }
    }
  }, [dispatch, customDocuments, merchantModel]);

  return (
    <Box>
      <Box mt={2}>
        <Button
          className={classnames(classes.addButton, { [classes.addButtonFullWidth]: !compatibilityMode })}
          disabled={!isCustomDocumentAvailable}
          variant="contained"
          color="primary"
          size="large"
          onClick={handleEdit(null, null)}
        >
          {intl.formatMessage({ id: 'CustomDocuments.settings.customDocumentList.add' })}
        </Button>
      </Box>

      {isCustomDocumentAvailable && (
        <Grid item xs={12}>
          {customDocuments.isLoaded && customDocuments.value.map((customDocument: CustomDocumentResponse, index: number) => (
            <Box className={classes.tag} key={customDocument.name}>
              {customDocument.name}
              <Box className={classes.buttonsHolder}>
                <Button className={classes.editButton} onClick={handleEdit(index, customDocument)}>
                  <FiEdit2 />
                </Button>
                <Button className={classes.deleteButton} onClick={handleDelete(index)}>
                  <FiTrash2 />
                </Button>
              </Box>
            </Box>
          ))}
        </Grid>
      )}
    </Box>
  );
}
