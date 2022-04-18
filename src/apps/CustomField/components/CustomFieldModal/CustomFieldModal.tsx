import React from 'react';
import { useSelector } from 'react-redux';
import { Modal } from 'apps/overlay';
import classnames from 'classnames';
import { useStyles } from './CustomFieldModal.styles';
import { CustomFieldModalConfigureAtomic } from '../CustomFieldModalConfigureAtomic/CustomFieldModalConfigureAtomic';
import { selectCustomFieldModalType } from '../../state/CustomField.selectors';
import { CustomFieldModalTypes, HandleUpdateFields } from '../../models/CustomField.model';
import { CustomFieldModalMapping } from '../CustomFieldModalMapping/CustomFieldModalMapping';
import { CustomFieldModalConfigure } from '../CustomFieldModalConfigure/CustomFieldModalConfigure';
import { CustomFieldModalPreview } from '../CustomFieldModalPreview/CustomFieldModalPreview';

function CustomFieldModalRouter({ handleUpdateFields }: {
    handleUpdateFields: HandleUpdateFields;
}) {
  const type = useSelector<any, CustomFieldModalTypes>(selectCustomFieldModalType);
  switch (type) {
    case CustomFieldModalTypes.ConfigureField:
      return <CustomFieldModalConfigureAtomic handleUpdateFields={handleUpdateFields} />;
    case CustomFieldModalTypes.MappingFieldToDocument:
      return <CustomFieldModalMapping />;
    case CustomFieldModalTypes.PreviewCustomField:
      return <CustomFieldModalPreview />;
    case CustomFieldModalTypes.ConfigureGroup:
    case CustomFieldModalTypes.ConfigureSelection:
    case CustomFieldModalTypes.ConfigureOption:
    default:
      return <CustomFieldModalConfigure handleUpdateFields={handleUpdateFields} />;
  }
}

export function CustomFieldModal({ handleUpdateFields }: {
  handleUpdateFields: HandleUpdateFields;
}) {
  const classes = useStyles();
  const type = useSelector<any, CustomFieldModalTypes>(selectCustomFieldModalType);
  return (
    <Modal className={classnames(classes.root, { [classes.previewRoot]: type === CustomFieldModalTypes.PreviewCustomField })}>
      <CustomFieldModalRouter handleUpdateFields={handleUpdateFields} />
    </Modal>
  );
}
