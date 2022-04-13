import React from 'react';
import Box from '@material-ui/core/Box';
import { FiEdit2 } from 'react-icons/fi';
import { DraggableProvided } from 'react-beautiful-dnd';
import { ReactComponent as DragButton } from 'assets/file-drag.svg';
import { ICustomField } from 'models/CustomField.model';
import { HandleOpenModal, HandleUpdateFields, MODAL_BY_FIELD_TYPE } from '../../models/CustomField.model';
import { CustomFieldDeleteButton } from '../CustomFieldDeleteButton/CustomFieldDeleteButton';
import { LightblueIconButton, useStyles } from './CustomFieldHeader.style';

export const CustomFieldHeader = ({ handleUpdateFields, index, handleOpenModal, provided, field, parent }: {
  field: ICustomField;
  handleUpdateFields: HandleUpdateFields;
  handleOpenModal: HandleOpenModal;
  index: number;
  parent: string;
  provided: DraggableProvided;
}) => {
  const classes = useStyles();
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      className={classes.root}
    >
      <Box
        display="flex"
      >
        <LightblueIconButton
          {...provided.dragHandleProps}
        >
          <DragButton />
        </LightblueIconButton>
        {field?.label}
      </Box>
      <Box display="flex">
        <LightblueIconButton onClick={handleOpenModal(MODAL_BY_FIELD_TYPE[field.type], field, index, parent)}>
          <FiEdit2 />
        </LightblueIconButton>
        <CustomFieldDeleteButton handleUpdateFields={handleUpdateFields} field={field} />
      </Box>
    </Box>
  );
};
