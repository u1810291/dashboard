import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import React, { useCallback, useEffect, useState, useMemo } from 'react';
import classnames from 'classnames';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { SkeletonLoaderMultipleRect } from 'apps/ui';
import { ReactComponent as DragButton } from 'assets/file-drag.svg';
import { ReactComponent as DeleteButton } from 'assets/file-delete.svg';
import { ReactComponent as DownloadButton } from 'assets/file-download.svg';
import { ESignatureDocumentId, ESignatureDocumentModel, ESignatureDocumentsModel, reorderESignatureIds, downloadESignatureOriginalDocument } from 'models/ESignature.model';
import { useStyles } from './DocumentsList.styles';

export function DocumentsList({ documents, isLoading, onChangeOrder, onDocumentDelete }: {
  documents: ESignatureDocumentsModel;
  isLoading: boolean;
  onChangeOrder: (reorderIds: ESignatureDocumentId[]) => void;
  onDocumentDelete: (id: ESignatureDocumentId) => void;
}) {
  const classes = useStyles();

  const [orderIds, setOrderIds] = useState([]);

  const handleDragEnd = useCallback((result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const reorderedIds: ESignatureDocumentId[] = reorderESignatureIds(orderIds, result.source.index, result.destination.index);
    onChangeOrder(reorderedIds);
    setOrderIds(reorderedIds);
  }, [orderIds, onChangeOrder]);

  const handleDelete = useCallback((id: ESignatureDocumentId) => () => {
    onDocumentDelete(id);
    setOrderIds((prevState) => prevState.filter((orderId) => orderId !== id));
  }, [onDocumentDelete]);

  const handleDownload = useCallback((id: ESignatureDocumentId) => () => {
    const eSignatureDocument: ESignatureDocumentModel = documents.list.find((doc) => doc.id === id);
    downloadESignatureOriginalDocument(eSignatureDocument);
  }, [documents]);

  const documentNames = useMemo(() => documents.list.reduce((result, current) => ({
    ...result,
    [current.id]: current?.originalDocument?.originalFileName,
  }), {} as Record<string, string>), [documents]);

  useEffect(() => {
    if (documents) {
      setOrderIds(documents.order);
    }
  }, [documents]);

  return (
    <Box className={classes.fullWidth}>
      {isLoading ? (
        <SkeletonLoaderMultipleRect amount={2} />
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <Card
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={classes.dropComponent}
              >
                {orderIds.map((orderId, index) => (
                  <Draggable key={orderId} draggableId={orderId} index={index}>
                    {(dragProvided) => (
                      <Card
                        ref={dragProvided.innerRef}
                        {...dragProvided.draggableProps}
                        className={classes.dragItem}
                      >
                        <Box className={classes.dragButton} {...dragProvided.dragHandleProps}>
                          <DragButton />
                        </Box>
                        <Box className={classnames(classes.fullWidth, classes.ellipsis)}>
                          {documentNames[orderId]}
                        </Box>
                        <Box className={classes.buttonsGroup}>
                          <Box tabIndex={0} role="button" className={classes.actionButton} onClick={handleDownload(orderId)} onKeyPress={() => {}}>
                            <DownloadButton />
                          </Box>
                          <Box tabIndex={0} role="button" className={classes.actionButton} onClick={handleDelete(orderId)} onKeyPress={() => {}}>
                            <DeleteButton />
                          </Box>
                        </Box>
                      </Card>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Card>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </Box>
  );
}
