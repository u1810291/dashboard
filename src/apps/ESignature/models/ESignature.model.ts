import { downloadBlob } from 'lib/file';
import { MediaUploadFile } from 'models/Media.model';
import { getMedia } from 'apps/media';

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
}

export interface ESignatureStepData {
  readDetails: ESignatureReadDetails[];
}

export interface ESignatureStep {
  data?: ESignatureStepData;
  error?: any;
}

export interface ESignatureAcceptanceCriteria {
  isFullNameRequired: boolean;
  isDocumentsRequired: boolean;
  isFaceMatchRequired: boolean;
}

export enum ESignatureFieldTypes {
  ReadAt = 'readAt',
  SignedAt = 'signedAt',
  TransactionId = 'documentId',
}

export enum ESignatureTypes {
  NameTyping = 'name-typing',
  Document = 'document',
  FaceSignature = 'face-signature',
}

export const ESignatureFields = [
  ESignatureFieldTypes.ReadAt,
  ESignatureFieldTypes.SignedAt,
  ESignatureFieldTypes.TransactionId,
];

export function getESignatureType(criteria: ESignatureAcceptanceCriteria): ESignatureTypes {
  if (criteria?.isFaceMatchRequired) {
    return ESignatureTypes.FaceSignature;
  }
  if (criteria?.isDocumentsRequired) {
    return ESignatureTypes.Document;
  }
  return ESignatureTypes.NameTyping;
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

export enum ESignatureCheckSettingsTypes {
    ESignatureEnabled = 'eSignatureEnabled',
    SignatrureMethod = 'signatureMethod',
    Terms = 'terms',
    TermsOrder = 'termsOrder'
}

export enum ESignatureCheckTypes {
    SignatureCheck = 'signatureCheck',
    GeoRestrictionCheck = 'geoRestrictionCheck',
    RiskyIpCheck = 'riskyIpCheck'
}

export enum ESignatureRadioOptions {
    NameTyping = 'nameTyping',
    FaceAndDocumentSignature = 'faceAndDocumentSignature'
}

export interface IESignatureValidationTypes {
  acceptanceCriteria: {
    isDocumentsRequired: boolean;
    isFaceMatchRequired: boolean;
    isFullNameRequired: boolean;
  };
}

export interface IESignatureFlow extends IESignatureValidationTypes {
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
