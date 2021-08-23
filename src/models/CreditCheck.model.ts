/* eslint-disable camelcase */
import { VerificationDocument } from './Document.model';

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

export interface CreditCheckManulRunResponse {
  _id: string;
  documents: VerificationDocument[];
}
