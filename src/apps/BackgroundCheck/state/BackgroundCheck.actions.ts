import { productManagerService } from 'apps/Product';
import { ProductTypes } from 'models/Product.model';
import { createTypesSequence, TypesSequence } from 'state/store.utils';
import { verificationStepsUpdate } from 'apps/Verification/state/Verification.actions';
import { IBackgroundCheckStepData } from 'models/BackgroundCheck.model';
import { StepIds } from 'models/Step.model';
import { selectMerchantTags } from 'state/merchant/merchant.selectors';
import { VerificationPatternTypes } from 'models/VerificationPatterns.model';
import { MerchantTags } from 'models/Merchant.model';
import * as client from '../client/BackgroundCheck.client';
import { BackgroundCheck } from '../services/BackgroundCheck.service';

export const types: TypesSequence = {
  ...createTypesSequence('BACKGROUND_CHECK_MANUAL_RUN'),
};

export const backgroundCheckInit = () => (_, getState): ProductTypes | void => {
  const merchantTags = selectMerchantTags(getState());

  if (!merchantTags.includes(MerchantTags.CanUseBackgroundChecks)) {
    return null;
  }

  const backgroundCheck = new BackgroundCheck();
  productManagerService.register(backgroundCheck);
  return backgroundCheck.id;
};

export const backgroundCheckManualRun = (verificationId: string, stepType: VerificationPatternTypes, stepId: StepIds) => async (dispatch) => {
  dispatch({ type: types.BACKGROUND_CHECK_MANUAL_RUN_REQUEST });
  try {
    const manualRunResponse = await client.backgroundCheckManualRun(verificationId, stepId);
    const step = manualRunResponse.data.steps.find((responseStep) => responseStep.id === stepId);

    dispatch({ type: types.BACKGROUND_CHECK_MANUAL_RUN_SUCCESS });
    dispatch(verificationStepsUpdate<IBackgroundCheckStepData>(stepType, step));
  } catch (error) {
    dispatch({ type: types.BACKGROUND_CHECK_MANUAL_RUN_FAILURE });
    throw error;
  }
};
