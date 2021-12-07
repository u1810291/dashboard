export enum DigitalSignatureProvider {
  NONE = 'none',
  NOM151 = 'nom151',
}

export interface DigitalSignature {
  hash: string;
  publicUrl: string;
}
