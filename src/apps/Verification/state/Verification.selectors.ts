import { selectLoadableValue, selectModelValue } from 'lib/loadable.selectors';
import { Loadable } from 'models/Loadable.model';
import { ProductTypes } from 'models/Product.model';
import { DocumentStepTypes, getStepExtra, IStep } from 'models/Step.model';
import { getVerificationExtras, groupVerificationsByFlow, PassedVerificationByFlow, VerificationListItem, VerificationWithExtras, VerificationResponse } from 'models/Verification.model';
import { createSelector } from 'reselect';
import { selectCountriesList } from 'state/countries/countries.selectors';
import { selectIdentityModel } from 'state/identities/identities.selectors';
import { CreditCheckStep, DataForCreditCheck } from 'models/CreditCheck.model';
import { VERIFICATION_STORE_KEY, VerificationSliceTypes, VerificationStore } from './Verification.store';

export const verificationStore = (state): VerificationStore => state[VERIFICATION_STORE_KEY];

export const selectVerificationModel = createSelector(
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

export const selectVerificationModelWithExtras = createSelector(
  selectIdentityModel,
  selectCountriesList,
  selectLoadableValue((value, countries) => getVerificationExtras(value?._embedded?.verification, countries)),
);

export const selectReviewVerificationWithExtras = createSelector<any, any, VerificationWithExtras>(
  selectVerificationModelWithExtras,
  selectModelValue(),
);

export const selectNewVerificationModelWithExtras = createSelector(
  selectVerificationModel,
  selectCountriesList,
  selectLoadableValue((verification, countries) => getVerificationExtras(verification, countries)),
);

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

export const selectVerificationStepsExtra = createSelector(
  selectNewVerificationWithExtras,
  (verification): IStep[] => verification.steps.map((step) => getStepExtra(step, verification)),
);

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
