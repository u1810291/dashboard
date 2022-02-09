import React from 'react';
import { CustomFieldItem } from '../CustomFieldItem/CustomFieldItem';
import { CustomField, HandleOpenModal, HandleUpdateFields, MAIN_DROPPABLE_ID } from '../../models/CustomField.model';

export const CustomFieldItemList = ({
  handleUpdateFields,
  draggable,
  fields,
  handleOpenModal,
  parent = MAIN_DROPPABLE_ID,
  isSubList = false,
}: {
  fields: CustomField[];
  handleUpdateFields: HandleUpdateFields;
  handleOpenModal: HandleOpenModal;
  parent?: string;
  draggable: string;
  isSubList?: boolean;
}) => (
  <>
    {
        fields.map((field, index) => (
          <CustomFieldItem
            isSubList={isSubList}
            key={field.name}
            parent={parent}
            handleUpdateFields={handleUpdateFields}
            field={field}
            index={index}
            draggable={draggable}
            handleOpenModal={handleOpenModal}
          />
        ))
      }
  </>
);
