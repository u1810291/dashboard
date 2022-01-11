import { getFileContents } from 'lib/client/checks';
import { get } from 'lodash';
import { FilterRangesByLocal, FilterRangeTypes, initDateFilter } from './Filter.model';
import { ITEMS_PER_PAGE } from './Pagination.model';

export type IdentityId = string; // use only if you are sure that this is identity id, not verification id

export enum VerificationSummaryTitleTypes {
  document = 'document',
  additional = 'additional',
  biometric = 'biometric',
  device = 'device',
}

export enum OrderDirections {
  asc = 'asc',
  desc = 'desc',
}

export enum OrderDirectionsNum {
  asc = '-1',
  desc = '1',
}

export enum OrderKeyTypes {
  dateCreated = 'dateCreated',
  fullName = 'fullName',
  verificationFlow = 'verificationFlow',
  status = 'status',
}

export const tableColumnsData: {id: OrderKeyTypes; isSortable?: boolean}[] = [
  {
    id: OrderKeyTypes.fullName,
    isSortable: true,
  },
  {
    id: OrderKeyTypes.verificationFlow,
  },
  {
    id: OrderKeyTypes.dateCreated,
    isSortable: true,
  },
  {
    id: OrderKeyTypes.status,
    isSortable: true,
  },
];

export function getGoBackToListLink(location, listRoute: string) {
  return location.state?.from?.startsWith(listRoute)
    ? location.state.from
    : listRoute;
}

export function getDownloadableFileName(verification) {
  if (!verification) {
    return null;
  }
  const flowName = get(verification, 'flow.name', null);
  const { id, fullName: name } = verification;
  return `${flowName?.replaceAll(' ', '_').concat('_')}${name ? name.replaceAll(' ', '_') : id}`;
}

export async function getNom151FileContent(digitalSignatureData = {} as any): Promise<string> {
  let fileContent;
  try {
    const file = await getFileContents(digitalSignatureData.publicUrl);
    fileContent = file?.data || digitalSignatureData.publicUrl;
  } catch {
    fileContent = digitalSignatureData.publicUrl;
  }
  return fileContent;
}

export const verificationsFilterInitialState = {
  ...initDateFilter,
  search: '',
  status: [],
  flowIds: [],
  sortOrder: null,
  sortBy: null,
  offset: 0,
  limit: ITEMS_PER_PAGE,
};

export function getVerificationsFilterInitialState(registrationDate: string) {
  const period = FilterRangesByLocal[FilterRangeTypes.All].getDateRange(registrationDate);
  return {
    ...verificationsFilterInitialState,
    'dateCreated[start]': period.start,
    'dateCreated[end]': period.end,
  };
}

export const verificationsFilterStructure = {
  search: 'search',
  status: 'status',
  flowIds: 'flowIds',
  'dateCreated[start]': 'dateCreated[start]',
  'dateCreated[end]': 'dateCreated[end]',
  offset: 'offset',
  limit: 'limit',
  sortOrder: 'sortOrder',
  sortBy: 'sortBy',
  // For Customer Support
  asMerchantId: 'asMerchantId',
};

export const verificationsCleanFilter = {
  ...initDateFilter,
  status: [],
  flowIds: [],
  sortOrder: null,
  sortBy: null,
};
