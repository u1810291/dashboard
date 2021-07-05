export enum IdentityProfileErrorTypes {
  IdentityNotFound = 'identityNotFound',
  RequestError = 'requestError',
}

export enum IdentityProfileReasonCodes {
  GdprDepersonalize = 'gdprDepersonalize',
  ManualUpdate = 'manualUpdate',
  ManualDepersonalize = 'manualDepersonalize',
  CompleteVerification = 'completeVerification',
}

interface IdentityProfileBaseField {
  updatedBy?: string;
  verificationId?: string;
  updatedAt: string | Date;
  reasonCode: IdentityProfileReasonCodes;
  value?: string | null;
}

export interface Coordinates {
  longitude: number;
  latitude: number;
}

type IdentitySummaryLocationField = Omit<IdentityProfileBaseField, 'value'> & {
  value?: Coordinates;
};

export interface IdentitySummary {
  fullName: IdentityProfileBaseField;
  dateOfBirth: IdentityProfileBaseField;
  location: IdentitySummaryLocationField;
  selfiePhotoUrl: IdentityProfileBaseField;
}

export interface IdentityProfileResponse {
  alive: boolean;
  dateCreated: string;
  dateUpdated: string;
  flowId: string;
  summary: IdentitySummary;
  merchantId: string;
  status: string;
  user: string;
  _id: string;
}

export function getReasonToken(reasonCode: IdentityProfileReasonCodes) {
  if (!reasonCode) {
    return 'IdentityProfile.summary.field.manualDepersonalize';
  }
  return `IdentityProfile.summary.field.${reasonCode}`;
}
