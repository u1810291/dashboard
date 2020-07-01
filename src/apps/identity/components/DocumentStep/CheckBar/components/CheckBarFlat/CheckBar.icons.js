import React from 'react';
import { DocumentStepTypes } from 'models/Document.model';
import { ReactComponent as TemplateMatching } from 'assets/icon-template-matching.svg';
import { ReactComponent as Facematch } from 'assets/icon-facematch.svg';
import { ReactComponent as AlterationDetection } from 'assets/icon-alteration-detection.svg';
import { ReactComponent as Watchlist } from 'assets/icon-watchlist.svg';

export const IconsMap = {
  [DocumentStepTypes.AlternationDetection]: <AlterationDetection />,
  [DocumentStepTypes.FaceMatch]: <Facematch />,
  [DocumentStepTypes.TemplateMatching]: <TemplateMatching />,
  [DocumentStepTypes.Watchlists]: <Watchlist />,
};
