import { Box, Button, IconButton, Typography } from '@material-ui/core';
import { useConfirm, useOverlay } from 'apps/overlay';
import { difference, without } from 'lodash';
import React, { useCallback, useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { LoadableAdapter } from 'lib/Loadable.adapter';
import { useIntl } from 'react-intl';
import { CustomDocumentResponse } from 'models/CustomDocument.model';
import { DocumentListOrdered, DocumentTypes, isCustomDocument } from 'models/Document.model';
import { IFlow } from 'models/Flow.model';
import { MerchantTags } from 'models/Merchant.model';
import { merchantCustomDocumentsLoad } from 'state/merchant/merchant.actions';
import { selectMerchantCustomDocumentsModel, selectMerchantModel, selectMerchantTags } from 'state/merchant/merchant.selectors';
import { VerificationStepsModal } from '../VerificationStepsModal/VerificationStepsModal';
import { useStyles } from './VerificationSteps.styles';
import { DenyUploadRequirement } from '../../../configuration/containers/DenyUploadRequirement/DenyUploadRequirement';

// TODO: use sync with flowbuilder types when product is ready
type CustomizableDocumentType = DocumentTypes | string;
type CustomizableVerificationSteps = CustomizableDocumentType[][];

export function removeItem(steps: CustomizableVerificationSteps, index: number): CustomizableVerificationSteps {
  const updatedSteps = [...steps];
  updatedSteps.splice(index, 1);
  return updatedSteps;
}

export function replaceItem(steps: CustomizableVerificationSteps, index: number, values: CustomizableDocumentType[]): CustomizableVerificationSteps {
  const updatedSteps = [...steps];
  updatedSteps[index] = values;
  return updatedSteps;
}

export function addItem(steps: CustomizableVerificationSteps, values: CustomizableDocumentType[]) {
  const updatedSteps = [...steps];
  updatedSteps.push(values);
  return updatedSteps;
}

export function addItemBefore(steps: CustomizableVerificationSteps, index: number, values: CustomizableDocumentType[]): CustomizableVerificationSteps {
  const updatedSteps = [...steps];
  updatedSteps.splice(index, 0, values);
  return updatedSteps;
}

export function accessibleItems(available: DocumentTypes[], steps: CustomizableVerificationSteps, index: number): string[] {
  return difference(available, ...without(steps, steps[index]));
}

export function accessibleCustomItems(available: CustomDocumentResponse[], selected: string[][]): CustomDocumentResponse[] {
  const alreadyUsed = selected.flatMap((item) => item);
  return available.filter(({ type }: CustomDocumentResponse) => !alreadyUsed.includes(type));
}

export function VerificationSteps({
  steps = [],
  onChange,
}: {
  steps: CustomizableVerificationSteps;
  onChange: ({ verificationSteps }: IFlow) => void;
}) {
  const intl = useIntl();
  const classes = useStyles();
  const dispatch = useDispatch();
  const merchantModel = useSelector(selectMerchantModel);
  const merchantCustomDocumentsModel = useSelector(selectMerchantCustomDocumentsModel);
  const tags: MerchantTags[] = useSelector(selectMerchantTags);
  const [createOverlay, closeOverlay] = useOverlay();
  const confirm = useConfirm(intl.formatMessage({ id: 'confirm_string' }));
  const [availableDocumentTypes] = useState<DocumentTypes[]>(DocumentListOrdered);

  const isCustomDocumentAvailable = useMemo(() => tags.includes(MerchantTags.CanUseCustomDocument), [tags]);

  const { regular, custom } = useMemo(() => steps.reduce((result, step) => {
    if (step.some((documentType) => isCustomDocument(documentType))) {
      result.custom.push(step);
    } else {
      result.regular.push(step);
    }

    return result;
  }, { regular: [], custom: [] }), [steps]);

  const customDocumentsMap = useMemo((): { [key: string]: string } => {
    if (!merchantCustomDocumentsModel?.value) {
      return {};
    }

    return merchantCustomDocumentsModel.value.reduce((result: { [key: string]: string }, customDocumentType: CustomDocumentResponse) => ({
      ...result,
      [customDocumentType.type]: customDocumentType.name,
    }), {});
  }, [merchantCustomDocumentsModel]);

  const avalibleCustomDocuments = useMemo(() => accessibleCustomItems(merchantCustomDocumentsModel?.value, custom), [merchantCustomDocumentsModel, custom]);

  const handleRemoveItem = useCallback(
    async (index) => {
      try {
        await confirm();
        onChange({ verificationSteps: removeItem(steps, index) });
      } catch (e) {
        // none, canceled
      }
    },
    [confirm, onChange, steps],
  );

  const onEditRegularDocument = useCallback(
    (index?: number) => () => {
      createOverlay(
        <VerificationStepsModal
          mode="regular"
          values={index !== undefined ? regular[index] : []}
          documents={accessibleItems(availableDocumentTypes, steps, index)}
          onSave={(values: string[]) => {
            closeOverlay();
            onChange({
              verificationSteps: index !== undefined ? replaceItem(steps, index, values) : addItemBefore(steps, regular.length, values),
            });
          }}
        />,
      );
    },
    [createOverlay, onChange, availableDocumentTypes, closeOverlay, steps, regular],
  );

  const onEditCustomDocument = useCallback(
    (index?: number) => () => {
      createOverlay(
        <VerificationStepsModal
          mode="custom"
          values={index !== undefined ? custom[index] : []}
          customDocuments={avalibleCustomDocuments}
          onSave={(values: string[]) => {
            closeOverlay();
            onChange({
              verificationSteps: index !== undefined ? replaceItem(steps, regular.length + index, values) : addItem(steps, values),
            });
          }}
        />,
      );
    },
    [createOverlay, custom, avalibleCustomDocuments, closeOverlay, onChange, steps, regular.length],
  );

  useEffect(() => {
    if (merchantModel.isLoaded && LoadableAdapter.isPristine(merchantCustomDocumentsModel) && !merchantCustomDocumentsModel.value?.length) {
      try {
        dispatch(merchantCustomDocumentsLoad());
      } catch (error) {
        console.error(error);
      }
    }
  }, [dispatch, merchantCustomDocumentsModel, merchantModel]);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {intl.formatMessage({ id: 'flow.documentTypeStep.title' })}
      </Typography>

      {/* regular documents */}
      {regular.map((step, index) => (
        <React.Fragment key={index}>
          <Box mt={2}>
            <Typography variant="h6" color="primary" gutterBottom>
              {intl.formatMessage({ id: 'flow.documentTypeStep.stepNo' })}
              {' - '}
              {index + 1}
            </Typography>
            <Box display="flex" mt={1}>
              {/* step list */}
              <Box flexGrow={1}>
                {step.sort().map((item: DocumentTypes) => (
                  <Box key={item} className={classes.value}>
                    <Typography variant="body1" gutterBottom>
                      {intl.formatMessage({ id: `flow.documentTypeStep.${item}` })}
                    </Typography>
                  </Box>
                ))}
              </Box>
              {/* actions */}
              <Box flexGrow={0} display="flex" ml={1} alignItems="center">
                <IconButton size="small" color="primary" onClick={onEditRegularDocument(index)}>
                  <FiEdit2 />
                </IconButton>
                <Box ml={1}>
                  <IconButton size="small" onClick={() => handleRemoveItem(index)}>
                    <FiTrash2 className="color-red" />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </Box>
        </React.Fragment>
      ))}

      {difference(availableDocumentTypes, ...steps).length > 0 && (
        <Box mt={2}>
          <Button
            variant="text"
            color="primary"
            onClick={onEditRegularDocument()}
            disabled={difference(availableDocumentTypes, ...steps).length === 0}
          >
            {intl.formatMessage({ id: 'flow.documentTypeStep.button.title' })}
          </Button>
        </Box>
      )}

      {/* custom documents */}
      {(isCustomDocumentAvailable || (custom.length > 0)) ? (
        <>
          <Typography variant="h6" color="primary">
            {intl.formatMessage({ id: 'CustomDocuments.settings.customDocuments' })}
          </Typography>

          {custom.map((step, index) => (
            <React.Fragment key={index}>
              <Box mt={2}>
                <Typography variant="h6" color="primary" gutterBottom>
                  {intl.formatMessage({ id: 'flow.documentTypeStep.stepNo' })}
                  {' - '}
                  {index + 1}
                </Typography>

                <Box display="flex" mt={1}>
                  {/* step list */}
                  <Box flexGrow={1}>
                    {step.sort().map((item: string) => (
                      <Box key={item} className={classes.value}>
                        <Typography variant="body1" gutterBottom>
                          {customDocumentsMap[item]}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                  {/* actions */}
                  <Box flexGrow={0} display="flex" ml={1} alignItems="center">
                    {isCustomDocumentAvailable && (
                      <IconButton size="small" color="primary" onClick={onEditCustomDocument(index)}>
                        <FiEdit2 />
                      </IconButton>
                    )}
                    <Box ml={1}>
                      <IconButton size="small" onClick={() => handleRemoveItem(index)}>
                        <FiTrash2 className="color-red" />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </React.Fragment>
          ))}

          {isCustomDocumentAvailable && (avalibleCustomDocuments.length > 0) && (
            <Box mt={2}>
              <Button variant="text" color="primary" onClick={onEditCustomDocument()}>
                {intl.formatMessage({ id: 'CustomDocuments.settings.addVerificationRequirement' })}
              </Button>
            </Box>
          )}
        </>
      ) : null}

      <Box mt={2} mr={6}>
        <DenyUploadRequirement />
      </Box>
    </Box>
  );
}
