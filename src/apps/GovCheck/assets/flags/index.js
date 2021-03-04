import React from 'react';
import { ReactComponent as ArgentinaIcon } from './argentina-flag.svg';
import { ReactComponent as BrazilIcon } from './brazil-flag.svg';
import { ReactComponent as ColombiaIcon } from './colombia-flag.svg';
import { ReactComponent as CostaRicaIcon } from './costa-rica-flag.svg';
import { ReactComponent as MexicoIcon } from './mexico-flag.svg';
import { ReactComponent as RussiaIcon } from './russia-flag.svg';
import { ReactComponent as USAIcon } from './usa-flag.svg';
import { ReactComponent as PeruIcon } from './peru-flag.svg';

const iconProps = {
  width: '25',
  height: '25',
};

export const flags = {
  argentina: <ArgentinaIcon {...iconProps} />,
  brazil: <BrazilIcon {...iconProps} />,
  colombia: <ColombiaIcon {...iconProps} />,
  costaRica: <CostaRicaIcon {...iconProps} />,
  mexico: <MexicoIcon {...iconProps} />,
  russia: <RussiaIcon {...iconProps} />,
  usa: <USAIcon {...iconProps} />,
  peru: <PeruIcon {...iconProps} />,
};
