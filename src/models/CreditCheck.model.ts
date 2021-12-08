import { VerificationDocument } from './Document.model';
import { IStep } from './Step.model';
import { VerificationResponse } from './Verification.model';

export interface CreditCheckStep {
  age: number;
  stepExtra: [];
  creditScore: number;
  dateOfBirth: string;
  documentNumber: string;
  fullName: string;
  gender: string;
  taxpayerNumber: string;
}

export interface DataForCreditCheck {
  creditDocumentStep: IStep<CreditCheckStep>;
  verification: VerificationResponse;
  id: string;
}

export interface CreditCheckManulRunResponse {
  _id: string;
  documents: VerificationDocument[];
}
