import { downloadBlob } from 'lib/file';
import { MediaUploadFile } from 'models/Media.model';
import { getMedia } from 'apps/media';
import { IStep } from './Step.model';

export type ESignatureDocumentId = string;

export interface ESignatureDocumentsModel {
  order: ESignatureDocumentId[];
  list: ESignatureDocumentModel[];
}

export interface ESignatureDocumentModel {
  id: ESignatureDocumentId;
  originalDocument: MediaUploadFile;
  documentsImages: MediaUploadFile[];
}

export interface ESignaturePDFDocument {
  publicUrl: string;
  documentImages: string[];
}

export interface ESignatureReadDetails {
  readAt: string;
  signedAt: string;
  documentId: ESignatureDocumentId;
  pdfDocument: ESignaturePDFDocument;
  documentTemplate: {
    originalDocument: MediaUploadFile;
  };
  fullName: string;
}

export interface ESignatureStepData {
  readDetails: ESignatureReadDetails[];
}

export type ESignatureStep = IStep<ESignatureStepData>;

export interface ESignatureAcceptanceCriteria {
  isFullNameRequired: boolean;
  isDocumentsRequired: boolean;
  isFaceMatchRequired: boolean;
}

export enum ESignatureFieldEnum {
  ReadAt = 'readAt',
  SignedAt = 'signedAt',
  TransactionId = 'documentId',
}

export enum ESignatureEnum {
  NameTyping = 'name-typing',
  Document = 'document',
  FaceSignature = 'face-signature',
}

export const ESignatureFields = [
  ESignatureFieldEnum.ReadAt,
  ESignatureFieldEnum.SignedAt,
  ESignatureFieldEnum.TransactionId,
];

export function getESignatureType(criteria: ESignatureAcceptanceCriteria): ESignatureEnum {
  if (criteria?.isFaceMatchRequired) {
    return ESignatureEnum.FaceSignature;
  }
  if (criteria?.isDocumentsRequired) {
    return ESignatureEnum.Document;
  }
  return ESignatureEnum.NameTyping;
}

export async function getPdfImagesUrls(selectedDocument: ESignatureReadDetails): Promise<string[]> {
  return Promise.all(selectedDocument?.pdfDocument.documentImages.map(async (url) => {
    const response = await getMedia(url);
    const blob = await response.blob();
    return window.URL.createObjectURL(blob);
  }, []));
}

export async function downloadESignaturePDFDocument(eSignaturePDF: ESignatureReadDetails) {
  if (!eSignaturePDF) {
    return;
  }
  const response = await getMedia(eSignaturePDF.pdfDocument.publicUrl);
  const blob = await response.blob();
  downloadBlob(blob, `${eSignaturePDF.documentTemplate.originalDocument.originalFileName}.pdf`);
}

export async function downloadESignatureOriginalDocument(eSignatureDocument: ESignatureDocumentModel) {
  if (!eSignatureDocument) {
    return;
  }
  const response = await getMedia(eSignatureDocument.originalDocument.publicUrl);
  const blob = await response.blob();
  downloadBlob(blob, `${eSignatureDocument.originalDocument.originalFileName}.pdf`);
}

export function reorderESignatureIds(list: ESignatureDocumentId[], startIndex: number, endIndex: number): ESignatureDocumentId[] {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

export function getESignatureDocument(eSignatureDocument: ESignatureDocumentModel) {
  return {
    ...eSignatureDocument,
    originalDocument: {
      fileName: eSignatureDocument.originalDocument.fileName,
      folder: eSignatureDocument.originalDocument.folder,
      originalFileName: eSignatureDocument.originalDocument.originalFileName,
    },
  };
}

export enum ESignatureCheckSettingsEnum {
    ESignatureEnabled = 'eSignatureEnabled',
    SignatureMethod = 'signatureMethod',
    Terms = 'terms',
    TermsOrder = 'termsOrder'
}

export enum ESignatureCheckEnum {
    SignatureCheck = 'signatureCheck',
    GeoRestrictionCheck = 'geoRestrictionCheck',
    RiskyIpCheck = 'riskyIpCheck'
}

export enum ESignatureRadioOptionsEnum {
    NameTyping = 'nameTyping',
    UploadDocumentAndTypeName = 'uploadDocumentAndTypeName',
    FaceAndDocumentSignature = 'faceAndDocumentSignature'
}

export interface ESignatureValidationAcceptanceCriteria {
  isDocumentsRequired: boolean;
  isFaceMatchRequired: boolean;
  isFullNameRequired: boolean;
}

export interface ESignatureValidation {
  acceptanceCriteria: ESignatureValidationAcceptanceCriteria;
}

export interface IESignatureFlow extends ESignatureValidation {
  templates: {
    order: string[];
    list: IESignatureTemplate[];
  };
}

export interface IESignatureTemplate {
    id: string;
    originalDocument: {
        fileName: string;
        folder: string;
        originalFileName: string;
    };
}

export function getAcceptanceCriteria(value: ESignatureRadioOptionsEnum): ESignatureValidationAcceptanceCriteria {
  if (value === ESignatureRadioOptionsEnum.FaceAndDocumentSignature) {
    return {
      isDocumentsRequired: true,
      isFaceMatchRequired: true,
      isFullNameRequired: true,
    };
  }

  if (value === ESignatureRadioOptionsEnum.UploadDocumentAndTypeName) {
    return {
      isDocumentsRequired: true,
      isFaceMatchRequired: false,
      isFullNameRequired: true,
    };
  }

  return {
    isDocumentsRequired: false,
    isFaceMatchRequired: false,
    isFullNameRequired: true,
  };
}

export function getSigMethod(values?: ESignatureValidationAcceptanceCriteria, neededProductsInFlow?: boolean): ESignatureRadioOptionsEnum {
  if ((values?.isFaceMatchRequired && values?.isDocumentsRequired) && neededProductsInFlow) {
    return ESignatureRadioOptionsEnum.FaceAndDocumentSignature;
  }

  if (values?.isDocumentsRequired && values?.isFullNameRequired) {
    return ESignatureRadioOptionsEnum.UploadDocumentAndTypeName;
  }

  return ESignatureRadioOptionsEnum.NameTyping;
}
