import React from 'react';
import { ReactComponent as ArgentinaIcon } from './argentina-flag.svg';
import { ReactComponent as ColombiaIcon } from './colombia-flag.svg';
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
  colombia: <ColombiaIcon {...iconProps} />,
  mexico: <MexicoIcon {...iconProps} />,
  russia: <RussiaIcon {...iconProps} />,
  usa: <USAIcon {...iconProps} />,
  peru: <PeruIcon {...iconProps} />,
};
