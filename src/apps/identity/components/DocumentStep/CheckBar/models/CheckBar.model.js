import React from 'react';
import { ReactComponent as CURP } from 'assets/icon-curp.svg';
import { ReactComponent as RFC } from 'assets/icon-rfc.svg';
import { ReactComponent as INE } from 'assets/icon-ine.svg';
import {
  Watchlist,
  Facematch,
  TemplateMatching,
  AlterationDetection,
} from '../icons';

export function getCheckBarModel(id, checkStatus) {
  const byDefault = {
    icon: null,
    title: '',
    status: '',
    tipTitle: '',
    tipBody: '',
    tipMessage: '',
  };

  const defaultModel = {
    title: `SecurityCheckStep.${id}.title`,
    status: `SecurityCheckStep.${id}.${checkStatus}`,
    tipTitle: `SecurityCheckStep.${id}.title`,
    tipBody: `SecurityCheckStep.${id}.tip.body`,
    tipMessage: `SecurityCheckStep.${id}.tip.message.${checkStatus}`,
  };

  const list = {
    'template-matching': {
      ...defaultModel,
      icon: <TemplateMatching />,
    },
    facematch: {
      ...defaultModel,
      icon: <Facematch />,
    },
    'alteration-detection': {
      ...defaultModel,
      icon: <AlterationDetection />,
    },
    watchlists: {
      ...defaultModel,
      icon: <Watchlist />,
    },
  };

  return list[id] || byDefault;
}

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
