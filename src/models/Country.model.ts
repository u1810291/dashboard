export interface Country {
    code: string;
    dialingCode: number;
    id: string;
    name: string;
    regions: string[];
    unsupported: boolean;
}

export enum CountryCodes {
  AR = 'AR',
  BR = 'BR',
  CO = 'CO',
  MX = 'MX',
  NG = 'NG',
  US = 'US',
  PE = 'PE',
}
