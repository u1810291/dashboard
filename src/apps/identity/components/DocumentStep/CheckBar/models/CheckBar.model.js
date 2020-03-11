import React from 'react';
import CURP from 'assets/curp-logo.png';
import INE from 'assets/ine-logo.png';
import RFC from 'assets/rfc-logo.png';
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
    logo: <img src={CURP} alt="CURP logo" />,
  },
  'mexican-ine-validation': {
    logo: <img src={INE} alt="INE logo" />,
  },
  'mexican-rfc-validation': {
    logo: <img src={RFC} alt="RFC logo" />,
  },
};
