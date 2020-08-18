import { ReactComponent as AlterationDetection } from 'assets/icon-alteration-detection.svg';
import { ReactComponent as CURP } from 'assets/icon-curp.svg';
import { ReactComponent as Facematch } from 'assets/icon-facematch.svg';
import { ReactComponent as INE } from 'assets/icon-ine.svg';
import { ReactComponent as RFC } from 'assets/icon-rfc.svg';
import { ReactComponent as ColombianRegistraduria } from 'assets/icon-registraduria.svg';
import { ReactComponent as TemplateMatching } from 'assets/icon-template-matching.svg';
import { ReactComponent as Watchlist } from 'assets/icon-watchlist.svg';
import { ReactComponent as EmptyFields } from 'assets/icon-empty-fields.svg';
import { ReactComponent as ExpiredDate } from 'assets/icon-expired-date.svg';
import { DocumentStepFailedTypes, DocumentStepTypes } from 'models/Step.model';
import React from 'react';

export const CheckBarIconsMap = {
  [DocumentStepTypes.AlternationDetection]: <AlterationDetection />,
  [DocumentStepTypes.FaceMatch]: <Facematch />,
  [DocumentStepTypes.TemplateMatching]: <TemplateMatching />,
  [DocumentStepTypes.Watchlists]: <Watchlist />,
  [DocumentStepTypes.CURP]: <CURP />,
  [DocumentStepTypes.INE]: <INE />,
  [DocumentStepTypes.RFC]: <RFC />,
  [DocumentStepTypes.ColombianRegistraduria]: <ColombianRegistraduria />,
  // extras
  [DocumentStepFailedTypes.EmptyFields]: <EmptyFields />,
  [DocumentStepFailedTypes.ExpiredDate]: <ExpiredDate />,
};
