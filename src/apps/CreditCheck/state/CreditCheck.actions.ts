import { productManagerService } from 'apps/Product';
import { ProductTypes } from 'models/Product.model';
import { createTypesSequence, TypesSequence } from 'state/store.utils';
import { CreditCheck } from 'apps/CreditCheck/services/CreditCheck.service';
import { verificationDocumentStepsUpdate } from 'apps/Verification/state/Verification.actions';
import { CreditCheckStep } from 'models/CreditCheck.model';
import { DocumentTypes } from 'models/Document.model';
import { StepIds, IStep } from 'models/Step.model';
import * as client from '../client/Credit.client';
import { selectMerchantTags } from '../../../state/merchant/merchant.selectors';
import { MerchantTags } from '../../../models/Merchant.model';

export const types: TypesSequence = {
  ...createTypesSequence('CREDIT_CHECK_MANUAL_RUN'),
};

export const creditCheckInit = () => (_, getState): ProductTypes | void => {
  const merchantTags = selectMerchantTags(getState());
  if (!merchantTags.includes(MerchantTags.CanUseCreditChecks)) {
    return null;
  }

  const creditCheck = new CreditCheck();
  productManagerService.register(creditCheck);
  return creditCheck.id;
};

export const creditCheckManualRun = (verificationId: string, documentType: DocumentTypes, stepId: StepIds) => async (dispatch) => {
  dispatch({ type: types.CREDIT_CHECK_MANUAL_RUN_REQUEST });
  try {
    const manualRunResponse = await client.creditCheckManualRun(verificationId, documentType, stepId);
    const step: IStep<CreditCheckStep> = manualRunResponse.data.documents.find((documentElm) => documentElm.type === documentType).steps.find((stepElm) => stepElm.id === stepId);

    dispatch({ type: types.CREDIT_CHECK_MANUAL_RUN_SUCCESS });
    dispatch(verificationDocumentStepsUpdate<CreditCheckStep>(documentType, step));
  } catch (error) {
    dispatch({ type: types.CREDIT_CHECK_MANUAL_RUN_FAILURE });
    throw error;
  }
};
