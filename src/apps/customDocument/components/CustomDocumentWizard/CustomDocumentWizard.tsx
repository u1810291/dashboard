import { Modal } from 'apps/overlay';
import { CustomDocumentResponse } from 'models/CustomDocument.model';
import React from 'react';
import { useSelector } from 'react-redux';
import { useStyles } from './CustomDocumentWizard.styles';
import { selectCustomDocumentWizardStep } from '../../state/customDocument.selectors';
import { CustomDocumentWizardStepTypes } from '../../models/customDocument.model';
import { CustomDocumentBasicInfo } from '../CustomDocumentBasicInfo/CustomDocumentBasicInfo';
import { CustomDocumentMedia } from '../CustomDocumentMedia/CustomDocumentMedia';
import { CustomDocumentAdvancedSettings } from '../CustomDocumentAdvancedSettings/CustomDocumentAdvancedSettings';
import { CustomDocumentTemplateMatchingSettings } from '../CustomDocumentTemplateMatchingSettings/CustomDocumentTemplateMatchingSettings';
import { CustomDocumentTemplateMatchingTemplate } from '../CustomDocumentTemplateMatchingTemplate/CustomDocumentTemplateMatchingTemplate';
import { CustomDocumentFieldSettings } from '../CustomDocumentFieldSettings/CustomDocumentFieldSettings';
import { CustomDocumentDocumentReadingSettings } from '../CustomDocumentDocumentReadingSettings/CustomDocumentDocumentReadingSettings';
import { CustomDocumentDocumentReadingFieldOption } from '../CustomDocumentDocumentReadingFieldOption/CustomDocumentDocumentReadingFieldOption';

export function CustomDocumentWizardRouter({
  onDone,
}: {
  onDone: (customDocumentUpdate: Partial<CustomDocumentResponse>) => void;
}) {
  const step: CustomDocumentWizardStepTypes = useSelector(selectCustomDocumentWizardStep);
  switch (step) {
    case CustomDocumentWizardStepTypes.MediaUpload:
      return <CustomDocumentMedia />;

    case CustomDocumentWizardStepTypes.AdvancedSettings:
      return <CustomDocumentAdvancedSettings onDone={onDone} />;

    case CustomDocumentWizardStepTypes.TemplateMatchingSettings:
      return <CustomDocumentTemplateMatchingSettings />;

    case CustomDocumentWizardStepTypes.TemplateMatchingTemplateSettings:
      return <CustomDocumentTemplateMatchingTemplate />;

    case CustomDocumentWizardStepTypes.DocumentReadingSettings:
      return <CustomDocumentDocumentReadingSettings />;

    case CustomDocumentWizardStepTypes.DocumentReadingFieldSettings:
      return <CustomDocumentFieldSettings />;

    case CustomDocumentWizardStepTypes.DocumentReadingFieldOptionSettings:
      return <CustomDocumentDocumentReadingFieldOption />;

    case CustomDocumentWizardStepTypes.BasicInfo:
    default:
      return <CustomDocumentBasicInfo />;
  }
}

export function CustomDocumentWizard({
  onDone,
}: {
  onDone: (customDocumentUpdate: Partial<CustomDocumentResponse>) => void;
}) {
  const classes = useStyles();

  return (
    <Modal className={classes.root}>
      <CustomDocumentWizardRouter onDone={onDone} />
    </Modal>
  );
}
