import { CountryCodes } from 'models/Country.model';
import React from 'react';
import { ReactComponent as ArgentinaIcon } from './argentina-flag.svg';
import { ReactComponent as BoliviaIcon } from './bolivia-flag.svg';
import { ReactComponent as BrazilIcon } from './brazil-flag.svg';
import { ReactComponent as ChileIcon } from './chile-flag.svg';
import { ReactComponent as ColombiaIcon } from './colombia-flag.svg';
import { ReactComponent as CostaRicaIcon } from './costa-rica-flag.svg';
import { ReactComponent as EcuadorIcon } from './ecuador-flag.svg';
import { ReactComponent as GhanaIcon } from './ghana-flag.svg';
import { ReactComponent as GuatemalaIcon } from './guatemala-flag.svg';
import { ReactComponent as HondurasIcon } from './honduras-flag.svg';
import { ReactComponent as DominicanIcon } from './dominican-republic-flag.svg';
import { ReactComponent as MexicoIcon } from './mexico-flag.svg';
import { ReactComponent as ParaguayIcon } from './paraguay-flag.svg';
import { ReactComponent as RussiaIcon } from './russia-flag.svg';
import { ReactComponent as SalvadorIcon } from './salvador-flag.svg';
import { ReactComponent as USAIcon } from './usa-flag.svg';
import { ReactComponent as PeruIcon } from './peru-flag.svg';
import { ReactComponent as PanamaIcon } from './panama-flag.svg';
import { ReactComponent as VenezuelaIcon } from './venezuela-flag.svg';

const iconProps = {
  width: '25',
  height: '25',
};

// @deprecated
export const flagMap = {
  argentina: <ArgentinaIcon {...iconProps} />,
  AR: <ArgentinaIcon {...iconProps} />,
  bolivia: <BoliviaIcon {...iconProps} />,
  brazil: <BrazilIcon {...iconProps} />,
  BR: <BrazilIcon {...iconProps} />,
  chile: <ChileIcon {...iconProps} />,
  colombia: <ColombiaIcon {...iconProps} />,
  costaRica: <CostaRicaIcon {...iconProps} />,
  dominican: <DominicanIcon {...iconProps} />,
  ghana: <GhanaIcon {...iconProps} />,
  guatemala: <GuatemalaIcon {...iconProps} />,
  ecuador: <EcuadorIcon {...iconProps} />,
  honduras: <HondurasIcon {...iconProps} />,
  mexico: <MexicoIcon {...iconProps} />,
  paraguay: <ParaguayIcon {...iconProps} />,
  russia: <RussiaIcon {...iconProps} />,
  salvador: <SalvadorIcon {...iconProps} />,
  usa: <USAIcon {...iconProps} />,
  peru: <PeruIcon {...iconProps} />,
  panama: <PanamaIcon {...iconProps} />,
  venezuela: <VenezuelaIcon {...iconProps} />,
};

export const codedFlagMap = {
  [CountryCodes.AR]: <ArgentinaIcon {...iconProps} />,
  [CountryCodes.BR]: <BrazilIcon {...iconProps} />,
  [CountryCodes.CO]: <ColombiaIcon {...iconProps} />,
  [CountryCodes.MX]: <MexicoIcon {...iconProps} />,
  [CountryCodes.US]: <USAIcon {...iconProps} />,
};
