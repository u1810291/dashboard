import React from 'react';
import { useSelector } from 'react-redux';
import { Modal } from 'apps/overlay';
import { useStyles } from './CustomFieldModal.styles';
import { CustomFieldModalConfigureAtomic } from '../CustomFieldModalConfigureAtomic/CustomFieldModalConfigureAtomic';
import { selectCustomFieldModalType } from '../../state/CustomField.selectors';
import { CustomFieldModalTypes, HandleUpdateFields } from '../../models/CustomField.model';
import { CustomFieldModalMapping } from '../CustomFieldModalMapping/CustomFieldModalMapping';
import { CustomFieldModalConfigure } from '../CustomFieldModalConfigure/CustomFieldModalConfigure';

function CustomFieldModalRouter({ handleUpdateFields }: {
    handleUpdateFields: HandleUpdateFields;
}) {
  const type = useSelector<any, CustomFieldModalTypes>(selectCustomFieldModalType);
  switch (type) {
    case CustomFieldModalTypes.ConfigureField:
      return <CustomFieldModalConfigureAtomic handleUpdateFields={handleUpdateFields} />;
    case CustomFieldModalTypes.MappingFieldToDocument:
      return <CustomFieldModalMapping />;
    default:
      return <CustomFieldModalConfigure handleUpdateFields={handleUpdateFields} />;
  }
}

export function CustomFieldModal({ handleUpdateFields }: {
  handleUpdateFields: HandleUpdateFields;
}) {
  const classes = useStyles();
  return (
    <Modal className={classes.root}>
      <CustomFieldModalRouter handleUpdateFields={handleUpdateFields} />
    </Modal>
  );
}
