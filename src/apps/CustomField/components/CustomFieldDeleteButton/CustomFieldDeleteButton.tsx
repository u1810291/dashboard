import { FiTrash2 } from 'react-icons/fi';
import React, { useCallback } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { useSelector } from 'react-redux';
import { useDeleteButtonHook } from 'apps/ui';
import { selectCustomFieldListFields } from '../../state/CustomField.selectors';
import { CustomField, findAndDelete, HandleUpdateFields } from '../../models/CustomField.model';
import { DeleteIconButton } from './CustomFieldDeleteButton.style';

export function CustomFieldDeleteButton({ handleUpdateFields, field }: {
  field: CustomField;
  handleUpdateFields: HandleUpdateFields;
}) {
  const listFields = useSelector<any, CustomField[]>(selectCustomFieldListFields);

  const customFieldDelete = useCallback(async () => {
    const newFlattenListFields = findAndDelete(cloneDeep(listFields), field.name);
    handleUpdateFields(newFlattenListFields);
  }, [field.name, listFields, handleUpdateFields]);

  const { handleDelete } = useDeleteButtonHook(customFieldDelete, {
    header: 'CustomField.settings.modal.delete.title',
    confirm: 'CustomField.settings.modal.delete.subtitle',
    confirmOptions: { name: field?.label },
  });

  return (
    <DeleteIconButton onClick={handleDelete}>
      <FiTrash2 />
    </DeleteIconButton>
  );
}
