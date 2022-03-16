import Link from '@material-ui/core/Link';
import React from 'react';
import { useFormatMessage } from 'apps/intl';
import { CustomFieldItemList } from '../CustomFieldItemList/CustomFieldItemList';
import { CustomField, CustomFieldModalTypes, HandleOpenModal, HandleUpdateFields, MainCustomFieldType, MODAL_BY_FIELD_TYPE } from '../../models/CustomField.model';
import { useStyles } from './CustomFieldSubList.style';

export function CustomFieldSubList({
  handleUpdateFields,
  handleOpenModal,
  draggable,
  field,
}: {
  field: CustomField;
  handleUpdateFields: HandleUpdateFields;
  handleOpenModal: HandleOpenModal;
  draggable: string;
}) {
  const classes = useStyles();
  const formatMessage = useFormatMessage();
  return (
    <>
      <CustomFieldItemList
        isSubList
        fields={field.children}
        parent={field.name}
        handleUpdateFields={handleUpdateFields}
        handleOpenModal={handleOpenModal}
        draggable={draggable}
      />
      {field.type === MainCustomFieldType.Select && (
        <Link
          className={classes.addButton}
          component="button"
          variant="body1"
          underline="none"
          onClick={handleOpenModal(CustomFieldModalTypes.ConfigureOption, null, null, field.name)}
        >
          {formatMessage('CustomField.settings.CustomFieldList.addAnOption')}
        </Link>
      )}
      {field.type === MainCustomFieldType.Group && (
        <Link
          className={classes.addButton}
          component="button"
          variant="body1"
          underline="none"
          onClick={handleOpenModal(MODAL_BY_FIELD_TYPE[MainCustomFieldType.Atomic], null, null, field.name)}
        >
          {formatMessage('CustomField.settings.CustomFieldList.addAField')}
        </Link>
      )}
    </>
  );
}
