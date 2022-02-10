import { useSelector } from 'react-redux';
import { Droppable, DroppableProvided } from 'react-beautiful-dnd';
import React, { ReactNode } from 'react';
import classnames from 'classnames';
import { selectCustomFieldFlattenListFields } from '../../state/CustomField.selectors';
import { checkIsDropDisabled, CustomField } from '../../models/CustomField.model';
import { useStyles } from './CustomFieldDroppableContainer.style';

export const CustomFieldDroppableContainer = ({
  draggable,
  isDropDisabled,
  children,
  id,
  isSubList = false,
}: {
  draggable: string;
  isDropDisabled: boolean;
  children: ReactNode;
  id: string;
  isSubList?: boolean;
}) => {
  const flattenListFields = useSelector<any, CustomField[]>(selectCustomFieldFlattenListFields);
  const classes = useStyles({ isDropDisabled });
  return (
    <Droppable
      droppableId={id}
      isDropDisabled={checkIsDropDisabled(draggable, id, flattenListFields)}
    >
      {(provided: DroppableProvided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className={classnames(classes.droppableContainer, { [classes.mainDroppableContainer]: !isSubList })}
        >
          {children}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
