import React from 'react';
import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import classnames from 'classnames';
import { CustomField, HandleOpenModal, HandleUpdateFields, INPUT_TYPE_WITH_DROPPABLE } from '../../models/CustomField.model';
import { CustomFieldDroppableContainer } from '../CustomFieldDroppableContainer/CustomFieldDroppableContainer';
import { CustomFieldSubList } from '../CustomFieldSubList/CustomFieldSubList';
import { CustomFieldHeader } from '../CustomFieldHeader/CustomFieldHeader';
import { useStyles } from './CustomFieldItem.style';

export function CustomFieldItem({
  field,
  handleUpdateFields,
  handleOpenModal,
  draggable,
  index,
  parent,
  isSubList = false,
}: {
  field: CustomField;
  handleUpdateFields: HandleUpdateFields;
  handleOpenModal: HandleOpenModal;
  draggable: string;
  index: number;
  parent: string;
  isSubList?: boolean;
}) {
  const classes = useStyles();

  return (
    <Draggable key={field.name} draggableId={field.name} index={index}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          className={classnames(classes.tag, { [classes.atomicTag]: !isSubList && !INPUT_TYPE_WITH_DROPPABLE.includes(field.type) })}
        >
          <div className={classes.tagHeader}>
            <CustomFieldHeader
              handleUpdateFields={handleUpdateFields}
              index={index}
              handleOpenModal={handleOpenModal}
              provided={provided}
              field={field}
              parent={parent}
            />
          </div>
          {INPUT_TYPE_WITH_DROPPABLE.includes(field.type) && (
            <CustomFieldDroppableContainer
              isSubList={isSubList}
              draggable={draggable}
              isDropDisabled={snapshot.isDragging}
              id={field.name}
            >
              <CustomFieldSubList
                field={field}
                handleOpenModal={handleOpenModal}
                handleUpdateFields={handleUpdateFields}
                draggable={draggable}
              />
            </CustomFieldDroppableContainer>
          )}
        </div>
      )}
    </Draggable>
  );
}
