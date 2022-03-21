import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { selectIsNewDesign } from 'apps/dashboard/state/dashboard.selectors';
import { useConfirmDelete } from 'apps/ui/components/DeleteModal/DeleteModal';
import { useTableRightClickNoRedirect } from 'apps/ui/hooks/rightClickNoRedirect';
import { ReactComponent as IconLoad } from 'assets/icon-load.svg';
import { QATags } from 'models/QA.model';
import React, { useState, useCallback } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'lib/url';
import { Routes } from 'models/Router.model';
import { blockTemplate, ITemplatesList, selectTemplatesListModelValues, toggleTemplate } from 'apps/Templates';
import { useFormatMessage } from 'apps/intl';
import { useHistory } from 'react-router-dom';
import { NoTemplates } from '../NoFlows/NoTemplates';
import { TableRowHovered, useStyles, CustomSwitcher } from './TemplatesTable.styles';

export function TemplatesTable({ onAddNewFlow }: { onAddNewFlow: () => void }) {
  const classes = useStyles();
  const history = useHistory();
  const [templateIdToDelete, setTemplateIdToDelete] = useState<string>(null);
  const templatesListValue = useSelector<any, ITemplatesList>(selectTemplatesListModelValues);
  const formatMessage = useFormatMessage();
  const confirmBlockTemplate = useConfirmDelete(
    formatMessage('Templates.block.title'),
    formatMessage('Templates.block.subtitle'),
  );
  const dispatch = useDispatch();
  const isNewDesign = useSelector<any, boolean>(selectIsNewDesign);
  const { asMerchantId } = useQuery();
  const [onMouseDownHandler, onMouseUpHandler] = useTableRightClickNoRedirect(isNewDesign ? Routes.flow.root : Routes.flows.root, { asMerchantId });

  const handleBlockTemplate = useCallback(async (id) => {
    if (templateIdToDelete) return;

    try {
      setTemplateIdToDelete(id);
      await confirmBlockTemplate();
      await dispatch(blockTemplate(id));
    } catch (error) {
      if (!error) {
        // cancelled
        return;
      }
    } finally {
      setTemplateIdToDelete(null);
    }
  }, [dispatch, confirmBlockTemplate, templateIdToDelete]);

  const handleDeleteButtonClick = useCallback((event, id) => {
    event.stopPropagation();
    handleBlockTemplate(id);
  }, [handleBlockTemplate]);

  const handleRowClicked = useCallback(async (event, id) => {
    event.stopPropagation();
    history.push(`${Routes.templates.root}/${id}`);
  }, [history]);

  return (
    <TableContainer className={classes.container}>
      {templatesListValue.rows.length > 0 && (
        <Box className={classes.tableLabel}>
          <Box className={classes.nameHeader}>{formatMessage('flow.table.field.name')}</Box>
          <Box className={classes.typeHeader}>{formatMessage('flow.table.field.type')}</Box>
          <Box className={classes.idHeader}>{formatMessage('flow.table.field.templateId')}</Box>
        </Box>
      )}
      <Table className={classes.table} data-qa={QATags.Flows.Table}>
        <TableBody>
          {/* No flows */}
          {templatesListValue.rows.length === 0 && (
            <TableRow>
              <TableCell className={classes.itemEmpty} colSpan={6} align="center">
                <NoTemplates onAddNewFlow={onAddNewFlow} />
              </TableCell>
            </TableRow>
          )}
          {templatesListValue.rows.length > 0 && templatesListValue.rows.map((item) => (
            // @ts-ignore
            <TableRowHovered
              hover
              key={item._id}
              onMouseDown={onMouseDownHandler}
              onMouseUp={(event) => !item.blocked && handleRowClicked(event, item._id)}
            >
              <TableCell className={classes.nameCell}>
                <Box mb={{ xs: 2, lg: 0 }} pr={{ xs: 3, lg: 0 }} color={item.blocked ? 'common.black75' : 'common.black90'}>
                  <Box className={classes.label}>{formatMessage('flow.table.field.name')}</Box>
                  <Typography variant="h4" className={classes.itemName}>{item.name}</Typography>
                  <Box className={classes.label}>{formatMessage('flow.table.field.description')}</Box>
                  <Typography variant="h4" className={classes.description}>{item.description}</Typography>
                </Box>
              </TableCell>
              <CustomSwitcher
                className={classes.switcher}
                color="primary"
                checked={!item.blocked}
                onMouseUp={(ev) => {
                  ev.stopPropagation();
                }}
                onClick={() => dispatch(toggleTemplate(item._id, !!item.blocked, formatMessage))}
              />
              <TableCell className={classes.typeCell}>
                <Box mb={{ xs: 2, lg: 0 }}>
                  <Box className={classes.label}>{formatMessage('flow.table.field.type')}</Box>
                  <Box component="span" className={item.blocked ? classes.itemTypeBlocked : classes.itemType}>{item?.flow?.integrationType || '-'}</Box>
                </Box>
              </TableCell>
              <TableCell>
                <Box mb={{ xs: 2, lg: 0 }}>
                  <Box className={classes.label}>{formatMessage('flow.table.field.templateId')}</Box>
                  <Box component="span" className={item.blocked ? classes.itemIdBlocked : classes.itemId}>{item?._id}</Box>
                </Box>
              </TableCell>
              {templatesListValue.rows.length > 1 && !item.blocked && (
                <TableCell className={classes.iconDeleteWrapper}>
                  <IconButton
                    size="small"
                    onMouseUp={(event) => !item.blocked && handleDeleteButtonClick(event, item._id)}
                    tabIndex="-1"
                    className={classes.iconButtonDelete}
                  >
                    {item._id === templateIdToDelete ? <IconLoad /> : <FiTrash2 className="color-red" />}
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
