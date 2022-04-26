import { Box, IconButton, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@material-ui/core';
import { selectIsNewDesign } from 'apps/dashboard/state/dashboard.selectors';
import { useTableRightClickNoRedirect } from 'apps/ui/hooks/rightClickNoRedirect';
import { ReactComponent as IconLoad } from 'assets/icon-load.svg';
import { dateSortCompare } from 'lib/date';
import { getNewFlowId } from 'models/Flow.model';
import { QATags } from 'models/QA.model';
import { Routes } from 'models/Router.model';
import React, { useCallback, useMemo, useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'lib/url';
import { useFormatMessage } from 'apps/intl';
import { useConfirmDelete } from 'apps/ui';
import { NoFlows } from '../NoFlows/NoFlows';
import { deleteWorkflow, updateCurrentFlowId } from '../../state/workflow.actions';
import { selectWorkflowList, selectWorkflowsModel, selectCurrentFlowId } from '../../state/workflow.selectors';
import { TableRowHovered, useStyles } from './WorkflowsTable.styles';

export function WorkflowsTable({ onAddNewFlow }: { onAddNewFlow: () => void }) {
  const formatMessage = useFormatMessage();
  const classes = useStyles();
  const [deleting, setDeleting] = useState(null);
  const workflowModel = useSelector(selectWorkflowsModel);
  const workflowList = useSelector(selectWorkflowList);
  const currentFlowId = useSelector(selectCurrentFlowId);
  const confirmDelete = useConfirmDelete(
    formatMessage('VerificationFlow.modal.delete.title'),
    formatMessage('VerificationFlow.modal.delete.subtitle'),
  );
  const dispatch = useDispatch();
  const isNewDesign = useSelector(selectIsNewDesign);
  const { asMerchantId } = useQuery();
  const [onMouseDownHandler, onMouseUpHandler] = useTableRightClickNoRedirect(isNewDesign ? Routes.workflow.root : Routes.workflow.root, { asMerchantId });

  const sortedFlowList = useMemo(() => [...workflowList].sort((a, b) => dateSortCompare(a.createdDate, b.createdDate)), [workflowList]);

  const handleDelete = useCallback(async (e, id) => {
    e.stopPropagation();
    if (deleting || sortedFlowList.length <= 1) {
      return;
    }

    try {
      setDeleting(id);
      await confirmDelete();
      if (id === currentFlowId) {
        const newFlowId = getNewFlowId(workflowModel, currentFlowId);
        dispatch(updateCurrentFlowId(newFlowId));
      }
      dispatch(deleteWorkflow(id));
    } catch (error) {
      if (!error) {
        // cancelled
        return;
      }
      console.error('identity remove error', error);
    } finally {
      setDeleting(null);
    }
  }, [dispatch, deleting, confirmDelete, workflowModel, currentFlowId, sortedFlowList.length]);

  return (
    <TableContainer className={classes.container}>
      <Table className={classes.table} data-qa={QATags.Flows.Table}>
        <TableBody>
          {/* No flows */}
          {sortedFlowList.length === 0 && (
            <TableRow>
              <TableCell className={classes.itemEmpty} colSpan={6} align="center">
                <NoFlows onAddNewFlow={onAddNewFlow} />
              </TableCell>
            </TableRow>
          )}
          {sortedFlowList.length > 0 && sortedFlowList.map((item) => (
            // @ts-ignore
            <TableRowHovered
              hover
              key={item.id}
              onMouseDown={onMouseDownHandler}
              onMouseUp={(event) => onMouseUpHandler(event, item.id)}
            >
              <TableCell>
                <Box mb={{ xs: 2, lg: 0 }} pr={{ xs: 3, lg: 0 }} color="common.black90">
                  <Typography variant="h4">{item.name}</Typography>
                  <Box className={classes.label}>{formatMessage('flow.table.field.name')}</Box>
                </Box>
              </TableCell>
              <TableCell>
                <Box mb={{ xs: 2, lg: 0 }}>
                  <Box component="span" className={classes.itemType}>{item?.integrationType || '-'}</Box>
                  <Box className={classes.label}>{formatMessage('flow.table.field.type')}</Box>
                </Box>
              </TableCell>
              <TableCell>
                <Box mb={{ xs: 2, lg: 0 }}>
                  <Box component="span" className={classes.itemTypeId}>{item?.id}</Box>
                  <Box className={classes.label}>{formatMessage('flow.table.field.flowId')}</Box>
                </Box>
              </TableCell>
              {sortedFlowList.length > 1 && (
                <TableCell className={classes.iconDeleteWrapper}>
                  <IconButton
                    size="small"
                    onMouseUp={(e) => handleDelete(e, item.id)}
                    tabIndex="-1"
                    className={classes.iconButtonDelete}
                  >
                    {item.id === deleting ? <IconLoad /> : <FiTrash2 className="color-red" />}
                  </IconButton>
                </TableCell>
              )}
            </TableRowHovered>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
