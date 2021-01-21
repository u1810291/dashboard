import { Box, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import { useConfirmDelete } from 'apps/identity/components/DeleteModal/DeleteModal';
import { NoFlows } from 'apps/product/components/NoFlows/NoFlows';
import { ReactComponent as IconLoad } from 'assets/icon-load.svg';
import { OrderDirections, OrderKeys } from 'models/Identity.model';
import { getNewFlowId } from 'models/Product.model';
import { Routes } from 'models/Router.model';
import React, { useCallback, useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { merchantDeleteFlow, updateCurrentFlowId } from 'state/merchant/merchant.actions';
import { selectCurrentFlowId, selectMerchantFlowList, selectMerchantFlowsModel } from 'state/merchant/merchant.selectors';
import { TableRowHovered, useStyles } from './FlowsTable.styles';
import { QATags } from '../../../../models/QA.model';

export function FlowsTable({ onAddNewFlow }) {
  const intl = useIntl();
  const classes = useStyles();
  const history = useHistory();
  const [deleting, setDeleting] = useState(null);
  const [orderBy] = useState('');
  const [order] = useState(OrderDirections.asc);
  const merchantFlowModel = useSelector(selectMerchantFlowsModel);
  const merchantFlowList = useSelector(selectMerchantFlowList);
  const currentFlowId = useSelector(selectCurrentFlowId);
  const confirmDelete = useConfirmDelete();
  const dispatch = useDispatch();
  const [mouseUpExpired, setMouseUpExpired] = useState(false);

  const handleDelete = useCallback(async (e, id) => {
    e.stopPropagation();
    if (deleting || merchantFlowList.length <= 1) {
      return;
    }

    try {
      setDeleting(id);
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
      setDeleting(null);
    }
  }, [dispatch, deleting, confirmDelete, merchantFlowModel, currentFlowId, merchantFlowList.length]);

  const handleRedirect = useCallback((id) => {
    history.push({
      pathname: `${Routes.flows.root}/${id}`,
    });
  }, [history]);

  const onMouseDownHandler = useCallback((event) => {
    if (event.button === 0) {
      setMouseUpExpired(false);
      setTimeout(() => setMouseUpExpired(true), 200);
    }
    if (event.button === 1) {
      event.preventDefault();
    }
  }, []);

  const onMouseUpHandler = useCallback((event, id) => {
    if (event.button === 0 && !mouseUpExpired) {
      handleRedirect(id);
    }
    if (event.button === 1) {
      window.open(`${Routes.flows.root}/${id}`, '_blank');
    }
  }, [handleRedirect, mouseUpExpired]);

  return (
    <TableContainer className={classes.container}>
      <Table className={classes.table} data-qa={QATags.Flows.Table}>
        <TableHead className={classes.tableHead}>
          <TableRow>
            <TableCell sortDirection={orderBy === OrderKeys.fullName ? order : false}>
              <Typography variant="subtitle2" className={classes.title}>
                {intl.formatMessage({ id: 'flow.table.field.name' })}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" className={classes.title}>
                {intl.formatMessage({ id: 'flow.table.field.flowId' })}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" className={classes.title}>
                {intl.formatMessage({ id: 'flow.table.field.type' })}
              </Typography>
            </TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {/* No flows */}
          {merchantFlowList.length === 0 && (
            <TableRow>
              <TableCell className={classes.itemEmpty} colSpan={6} align="center">
                <NoFlows onAddNewFlow={onAddNewFlow} />
              </TableCell>
            </TableRow>
          )}
          {merchantFlowList.length > 0 && merchantFlowList.map((item) => (
            <TableRowHovered
              hover
              key={item.id}
              onMouseDown={onMouseDownHandler}
              onMouseUp={(event) => onMouseUpHandler(event, item.id)}
            >
              <TableCell>
                <Box mb={{ xs: 2, lg: 0 }} pr={{ xs: 3, lg: 0 }}>
                  <Typography variant="subtitle2" className={classes.itemName}>{item.name}</Typography>
                  <Box className={classes.label}>{intl.formatMessage({ id: 'flow.table.field.name' })}</Box>
                </Box>
              </TableCell>
              <TableCell className={classes.itemData}>
                <Box mb={{ xs: 2, lg: 0 }}>
                  {item.id}
                  <Box className={classes.label}>{intl.formatMessage({ id: 'flow.table.field.flowId' })}</Box>
                </Box>
              </TableCell>
              <TableCell className={classes.itemData}>
                <Box mb={{ xs: 2, lg: 0 }}>
                  {intl.formatMessage({ id: 'flow.table.type.verification' })}
                  <Box className={classes.label}>{intl.formatMessage({ id: 'flow.table.field.type' })}</Box>
                </Box>
              </TableCell>
              {merchantFlowList.length > 1 && (
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
