import { Box, IconButton, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@material-ui/core';
import { selectIsNewDesign } from 'apps/dashboard/state/dashboard.selectors';
import { useConfirmDelete } from 'apps/identity/components/DeleteModal/DeleteModal';
import { useTableRightClickNoRedirect } from 'apps/ui/hooks/rightClickNoRedirect';
import { ReactComponent as IconLoad } from 'assets/icon-load.svg';
import { dateSortCompare } from 'lib/date';
import { getNewFlowId, IFlow } from 'models/Flow.model';
import { QATags } from 'models/QA.model';
import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'lib/url';
import { merchantDeleteFlow, updateCurrentFlowId } from 'state/merchant/merchant.actions';
import { selectCurrentFlowId, selectFlowsAsTemplates, selectMerchantFlowList, selectMerchantFlowsModel } from 'state/merchant/merchant.selectors';
import { Routes } from 'models/Router.model';
import { getTemplate, getTemplates } from 'apps/Templates/store/Templates.actions';
import { useFormatMessage } from 'apps/intl';
import { Loadable } from 'models/Loadable.model';
import { useHistory } from 'react-router-dom';
import { NoFlows } from '../NoFlows/NoFlows';
import { TableRowHovered, useStyles } from './FlowsTable.styles';

export function FlowsTable({ onAddNewFlow, canAddTemplate = false }: { onAddNewFlow: () => void; canAddTemplate: boolean }) {
  const classes = useStyles();
  const history = useHistory();
  const [flowIdToDelete, setFlowIdToDelete] = useState<string>(null);
  const merchantFlowModel = useSelector<any, Loadable<IFlow>>(selectMerchantFlowsModel);
  const merchantFlowList = useSelector<any, IFlow[]>(selectMerchantFlowList);
  const currentFlowId = useSelector<any, string>(selectCurrentFlowId);
  const formatMessage = useFormatMessage();
  const confirmDelete = useConfirmDelete(
    formatMessage('VerificationFlow.modal.delete.title'),
    formatMessage('VerificationFlow.modal.delete.subtitle'),
  );
  const dispatch = useDispatch();
  const isNewDesign = useSelector<any, boolean>(selectIsNewDesign);
  const { asMerchantId } = useQuery();
  const [onMouseDownHandler, onMouseUpHandler] = useTableRightClickNoRedirect(isNewDesign ? Routes.flow.root : Routes.flows.root, { asMerchantId });
  const flowsAsTemplates = useSelector<any, IFlow[]>(selectFlowsAsTemplates);
  const sortedFlowList = useMemo(() => [...merchantFlowList].sort((a, b) => dateSortCompare(a.createdAt, b.createdAt)), [merchantFlowList]);

  useEffect(() => {
    dispatch(getTemplates());
  }, [dispatch]);

  const handleDelete = useCallback(async (e, id) => {
    e.stopPropagation();
    if (flowIdToDelete || sortedFlowList.length <= 1) {
      return;
    }

    try {
      setFlowIdToDelete(id);
      await confirmDelete();
      if (id === currentFlowId) {
        const newFlowId = getNewFlowId(merchantFlowModel, currentFlowId);
        dispatch(updateCurrentFlowId(newFlowId));
      }
      dispatch(merchantDeleteFlow(id));
    } catch (error) {
      if (!error) {
        // cancelled
        return;
      }
      console.error('identity remove error', error);
    } finally {
      setFlowIdToDelete(null);
    }
  }, [dispatch, flowIdToDelete, confirmDelete, merchantFlowModel, currentFlowId, sortedFlowList.length]);

  const handleRowClicked = async (event, id) => {
    if (canAddTemplate) {
      try {
        await dispatch(getTemplate(id));
        history.push(`${Routes.templates.root}/${id}`);
      } catch (error) {
        onMouseUpHandler({ ...event, button: 0 }, id);
      }
    } else {
      onMouseUpHandler({ ...event, button: 0 }, id);
    }
  };

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
              onMouseUp={(event) => handleRowClicked(event, item.id)}
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
                    {item.id === flowIdToDelete ? <IconLoad /> : <FiTrash2 className="color-red" />}
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
