import { OrderKeyTypes } from 'models/Identity.model';

// BE has changed sortBy parameter
// TODO: @ggrigorev fix when FlowBuilder is released
export const VerificationTableSortByMap: Partial<Record<OrderKeyTypes, string>> = {
  [OrderKeyTypes.fullName]: 'summary.fullName.value',
  [OrderKeyTypes.dateCreated]: 'createdAt',
  [OrderKeyTypes.status]: 'verificationStatusDetails.value',
};
