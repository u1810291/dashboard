import { InputValidationCheck } from 'apps/imageValidation/models/imageValidation.model';
import { VerificationPatternTypes } from './VerificationPatterns.model';
import { DocumentSides } from './Document.model';
import { Media } from './Media.model';

export enum CustomDocumentVerificationFlowFieldTypes {
  Text = 'Text',
  Date = 'Date',
  Options = 'Options',
}

export interface CustomDocumentTemplate {
  caption: string | null;
  isAcceptable: boolean;
  image: Media | null;
}

export interface CustomDocumentReadingField {
  id: string;
  inputFormat?: string;
  label: string;
  type: CustomDocumentVerificationFlowFieldTypes;
  options?: string[];
}

export interface CustomDocumentDocumentReading {
  fields?: CustomDocumentReadingField[];
  images?: Media[];
  instructions?: string | null;
}

export interface CustomDocumentTemplateMatching {
  instructions?: string | null;
  templates?: CustomDocumentTemplate[];
}

export interface CustomDocumentResponse {
  type: string | null;
  description: string | null;
  name: string | null;
  pages: number | null;
  isSkippable: boolean;
  isSingleFile: boolean;
  inputValidationChecks: InputValidationCheck[];
  flow: {
    verificationPatterns: {
      [VerificationPatternTypes.DocumentReading]?: CustomDocumentDocumentReading;
      [VerificationPatternTypes.TemplateMatching]?: CustomDocumentTemplateMatching;
    };
  };
  example: {
    [DocumentSides.Front]?: Media | null;
    [DocumentSides.Back]?: Media | null;
  };
}
