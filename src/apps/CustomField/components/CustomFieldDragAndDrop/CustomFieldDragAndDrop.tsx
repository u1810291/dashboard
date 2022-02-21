import { useSelector } from 'react-redux';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { DragDropContext, Droppable, DroppableProvided, DropResult, BeforeCapture } from 'react-beautiful-dnd';
import cloneDeep from 'lodash/cloneDeep';
import dayjs from 'dayjs';
import { mutableFindChildren, HandleOpenModal, HandleUpdateFields, MAIN_DROPPABLE_ID, CustomField } from '../../models/CustomField.model';
import { selectCustomFieldListFields } from '../../state/CustomField.selectors';
import { CustomFieldItemList } from '../CustomFieldItemList/CustomFieldItemList';
import { useStyles } from './CustomFieldDragAndDrop.style';

export function CustomFieldDragAndDrop({ handleOpenModal, handleUpdateFields }: {
  handleUpdateFields: HandleUpdateFields;
  handleOpenModal: HandleOpenModal;
}) {
  const classes = useStyles();
  const listFields = useSelector<any, CustomField[]>(selectCustomFieldListFields);

  const [draggable, setDraggable] = useState<string>(null);
  const [reinitialized, setReinitialized] = useState<string>(null);

  useLayoutEffect(() => setReinitialized(dayjs().unix().toString()), [listFields]);

  const onDragEnd = useCallback((result: DropResult) => {
    setDraggable(null);
    if (!result.destination) {
      return;
    }
    if (result.draggableId === result.destination.droppableId) {
      return;
    }
    const cloneFlattenListFields = cloneDeep(listFields);
    const moveFrom = mutableFindChildren(cloneFlattenListFields, result.source.droppableId);
    const moveTo = mutableFindChildren(cloneFlattenListFields, result.destination.droppableId);
    const [removed] = moveFrom.splice(result.source.index, 1);
    moveTo.splice(result.destination.index, 0, removed);
    handleUpdateFields(cloneFlattenListFields);
  }, [listFields, handleUpdateFields]);

  const onBeforeCapture = useCallback((val: BeforeCapture) => {
    setReinitialized(dayjs().unix().toString());
    setDraggable(val.draggableId);
  }, []);

  return (
    <DragDropContext onDragEnd={onDragEnd} onBeforeCapture={onBeforeCapture}>
      <Droppable
        droppableId={MAIN_DROPPABLE_ID}
        key={reinitialized}
      >
        {(provided: DroppableProvided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={classes.root}
          >
            <CustomFieldItemList
              fields={listFields}
              handleUpdateFields={handleUpdateFields}
              handleOpenModal={handleOpenModal}
              draggable={draggable}
            />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
