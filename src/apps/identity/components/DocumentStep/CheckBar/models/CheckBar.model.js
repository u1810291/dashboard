import React from 'react';
import { ReactComponent as CURP } from 'assets/icon-curp.svg';
import { ReactComponent as RFC } from 'assets/icon-rfc.svg';
import { ReactComponent as INE } from 'assets/icon-ine.svg';

export const expandableSteps = {
  'mexican-curp-validation': {
    logo: <CURP />,
  },
  'mexican-ine-validation': {
    logo: <INE />,
  },
  'mexican-rfc-validation': {
    logo: <RFC />,
  },
};
