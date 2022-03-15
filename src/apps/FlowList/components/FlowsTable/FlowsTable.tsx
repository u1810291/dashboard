import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
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
import { selectCurrentFlowId, selectMerchantFlowList, selectMerchantFlowsModel, selectMerchantOnboarding } from 'state/merchant/merchant.selectors';
import { Routes } from 'models/Router.model';
import { getTemplate, useLoadTemplatesList } from 'apps/Templates';
import { useFormatMessage } from 'apps/intl';
import { Loadable } from 'models/Loadable.model';
import { useHistory } from 'react-router-dom';
import { StartModal, StepsOptions } from 'apps/Analytics';
import { useOverlay } from 'apps/overlay';
import { TemplatesModal } from 'apps/SolutionCatalog';
import { NoFlows } from '../NoFlows/NoFlows';
import { TableRowHovered, useStyles } from './FlowsTable.styles';

export function FlowsTable({ onAddNewFlow }: { onAddNewFlow: () => void }) {
  const classes = useStyles();
  const history = useHistory();
  const [createOverlay, closeOverlay] = useOverlay();
  const onboardingProgress = useSelector<any, StepsOptions[]>(selectMerchantOnboarding);
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
  const isFirstMetamapCreated = onboardingProgress.find((step) => step.stepId === 'make-metamap').completed;
  const isNewDesign = useSelector<any, boolean>(selectIsNewDesign);
  const { asMerchantId } = useQuery();
  const [onMouseDownHandler, onMouseUpHandler] = useTableRightClickNoRedirect(isNewDesign ? Routes.flow.root : Routes.flows.root, { asMerchantId });
  const sortedFlowList = useMemo(() => [...merchantFlowList].sort((a, b) => dateSortCompare(a.createdAt, b.createdAt)), [merchantFlowList]);

  useLoadTemplatesList();

  const handleCardClick = async (id: string) => {
    try {
      await dispatch(getTemplate(id));
      history.push(`${Routes.templates.draftFlow}`);
      closeOverlay();
    } catch (error) {
      console.warn(error);
    }
  };

  const handleTemplateModal = () => {
    closeOverlay();
    createOverlay(<TemplatesModal handleCardClick={handleCardClick} />);
  };

  const handleMetamapBuild = () => {
    createOverlay(<StartModal action={handleTemplateModal} closeOverlay={closeOverlay} />);
  };

  useEffect(() => {
    const isOnboardingModalShowed = localStorage.getItem('onboardingModalShowed');
    if (!isFirstMetamapCreated && !isOnboardingModalShowed && !history.location.state?.dontShowModal) {
      localStorage.setItem('onboardingModalShowed', 'true');
      closeOverlay();
      handleMetamapBuild();
    }
  }, [dispatch]);

  const handleDelete = useCallback(async (id) => {
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

  const handleDeleteButtonClick = (event, id) => {
    event.stopPropagation();
    handleDelete(id);
  };

  const handleRowClicked = async (event, id) => {
    event.stopPropagation();
    history.push(`${Routes.templates.draftFlow}/${id}`);
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
                  <Box className={classes.label}>{formatMessage('flow.table.field.name')}</Box>
                  <Typography variant="h4">{item.name}</Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Box mb={{ xs: 2, lg: 0 }}>
                  <Box className={classes.label}>{formatMessage('flow.table.field.type')}</Box>
                  <Box component="span" className={classes.itemType}>{item?.integrationType || '-'}</Box>
                </Box>
              </TableCell>
              <TableCell>
                <Box mb={{ xs: 2, lg: 0 }}>
                  <Box className={classes.label}>{formatMessage('flow.table.field.flowId')}</Box>
                  <Box component="span" className={classes.itemTypeId}>{item?.id}</Box>
                </Box>
              </TableCell>
              {sortedFlowList.length > 1 && (
                <TableCell className={classes.iconDeleteWrapper}>
                  <IconButton
                    size="small"
                    onMouseUp={(e) => handleDeleteButtonClick(e, item.id)}
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
