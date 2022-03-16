import { selectLoadableValue, selectModelValue } from 'lib/loadable.selectors';
import { Loadable } from 'models/Loadable.model';
import { ProductTypes } from 'models/Product.model';
import { DocumentStepTypes, getStepExtra, IStep } from 'models/Step.model';
import { IVerificationWorkflow } from 'models/Verification.model';
import { getVerificationExtras, groupVerificationsByFlow, PassedVerificationByFlow, VerificationListItem, VerificationWithExtras, VerificationResponse } from 'models/VerificationOld.model';
import { createSelector } from 'reselect';
import { selectCountriesList } from 'state/countries/countries.selectors';
import { ErrorType } from 'models/Error.model';
import { CreditCheckStep, DataForCreditCheck } from 'models/CreditCheck.model';
import { VERIFICATION_STORE_KEY, VerificationSliceTypes, VerificationStore } from './Verification.store';

export const verificationStore = (state): VerificationStore => state[VERIFICATION_STORE_KEY];

export const selectVerificationModel = createSelector<any, any, Loadable<IVerificationWorkflow>>(
  verificationStore,
  (store) => store[VerificationSliceTypes.Verification],
);

export const selectVerificationsCollectionModel = createSelector(
  verificationStore,
  (store): Loadable<any[]> => store[VerificationSliceTypes.PassedVerifications],
);

export const selectVerificationProductList = createSelector(
  verificationStore,
  (store): ProductTypes[] => store.productList || [],
);

export const selectNewVerificationModelWithExtras = createSelector(
  selectVerificationModel,
  selectCountriesList,
  selectLoadableValue((verification, countries) => getVerificationExtras(verification, countries)),
);

export const selectVerificationModelError = createSelector<any, any, ErrorType>(
  selectVerificationModel,
  (verification) => verification.error,
);

// TODO: @ggrigorev remove deprecated
/**
 * @deprecated
 * use selectVerification
 */
export const selectNewVerificationWithExtras = createSelector<any, any, VerificationWithExtras>(
  selectNewVerificationModelWithExtras,
  selectModelValue(),
);

export const selectVerification = createSelector<any, any, VerificationResponse | null>(
  selectVerificationModel,
  selectModelValue<VerificationResponse | null>(),
);

export const selectVerificationsGroupedByFlow = createSelector<any, Loadable<VerificationListItem[]>, PassedVerificationByFlow[]>(
  selectVerificationsCollectionModel,
  selectModelValue((verifications: VerificationListItem[]) => groupVerificationsByFlow(verifications)),
);

// TODO: @ggrigorev remove deprecated
/**
 * @deprecated
 */
export const selectVerificationStepsExtra = createSelector(
  selectNewVerificationWithExtras,
  (verification): IStep[] => verification.steps.map((step) => getStepExtra(step, verification)),
);

// TODO: @ggrigorev remove deprecated
/**
 * @deprecated
 */
export const selectVerificationDocumentsSteps = createSelector(
  selectNewVerificationWithExtras,
  (verification): IStep[] => [...verification.documents.reduce((acc, cur) => ([...acc, ...cur.steps]), [])],
);

export const selectCreditDocumentStep = createSelector(
  selectVerificationDocumentsSteps,
  (verificationDocumentsSteps: IStep[]): IStep<CreditCheckStep> => (
    verificationDocumentsSteps.find((step) => step.id === DocumentStepTypes.CreditArgentinianFidelitas || step.id === DocumentStepTypes.CreditBrazilianSerasa)
  ),
);

export const selectVerificationId = createSelector(
  selectVerification,
  (verification): string => (verification?._id || verification?.id),
);

export const selectDataForCreditCheck = createSelector(
  selectCreditDocumentStep,
  selectVerification,
  selectVerificationId,
  (creditDocumentStep, verification, id): DataForCreditCheck => ({
    creditDocumentStep,
    verification,
    id,
  }),
);
