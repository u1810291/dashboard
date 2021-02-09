import { Box, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Paper } from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreVert';
import { flowNameValidator } from 'apps/flows/validators/FlowName.validator';
import { useConfirmDelete } from 'apps/identity/components/DeleteModal/DeleteModal';
import { EditableField } from 'apps/product/components/EditableField/EditableField';
import { copyToClipboard } from 'lib/copyToClipboard';
import { permalinkUrl } from 'lib/client/urls';
import { getNewFlowId } from 'models/Product.model';
import { Routes } from 'models/Router.model';
import React, { useCallback, useEffect, useState } from 'react';
import { FiCopy, FiEdit3, FiTrash2 } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { merchantDeleteFlow, merchantUpdateFlow, updateCurrentFlowId } from 'state/merchant/merchant.actions';
import { selectAppLastModel, selectCurrentFlow, selectMerchantFlowList, selectMerchantFlowsModel } from 'state/merchant/merchant.selectors';
import { notification } from 'apps/ui';
import { CopyLinkButton, useStyles } from './VerificationFlowHeader.styles';

export function VerificationFlowHeader(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const intl = useIntl();
  const [anchorEl, setAnchorEl] = useState(null);
  const [editable, setEditable] = useState(false);
  const appModel = useSelector(selectAppLastModel);
  const currentFlow = useSelector(selectCurrentFlow);
  const merchantFlowsModel = useSelector(selectMerchantFlowsModel);
  const merchantFlowList = useSelector(selectMerchantFlowList);
  const confirmDelete = useConfirmDelete();

  useEffect(() => {
    setEditable(false);
  }, [currentFlow]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleEdit() {
    setEditable(true);
    handleClose();
  }

  const handleDelete = useCallback(async () => {
    if (merchantFlowList.length <= 1) {
      return;
    }

    try {
      setAnchorEl(null);
      await confirmDelete();
      const { id } = currentFlow;
      const newFlowId = getNewFlowId(merchantFlowsModel, id);

      history.push(Routes.flows.root);
      dispatch(updateCurrentFlowId(newFlowId));
      await dispatch(merchantDeleteFlow(id));
    } catch (err) {
      if (!err) {
        // cancelled
        return;
      }
      console.error('identity remove error', err);
    }
  }, [history, dispatch, confirmDelete, merchantFlowsModel, currentFlow, merchantFlowList.length]);

  const submitEditable = useCallback(async (name) => {
    await dispatch(merchantUpdateFlow({ name }));
    setEditable(false);
  }, [dispatch]);

  function cancelEditable() {
    setEditable(false);
  }

  const handleCopyLink = useCallback(() => {
    const url = permalinkUrl({ clientId: appModel.value.clientId, flowId: currentFlow.id });
    copyToClipboard(url);
    notification.info(intl.formatMessage({ id: 'copied' }));
  }, [appModel.value.clientId, currentFlow.id, intl]);

  const validator = useCallback((text) => {
    const duplicate = merchantFlowsModel.value.find((item) => item.name === text.trim());
    return flowNameValidator({ hasDuplicate: !!duplicate, name: text });
  }, [merchantFlowsModel.value]);

  return (
    <Paper className={classes.headerContainer} {...props}>
      <EditableField
        enabled={editable}
        setEditable={setEditable}
        className={classes.flowName}
        submitEditable={submitEditable}
        cancelEditable={cancelEditable}
        validator={validator}
        inProgress={merchantFlowsModel.isLoading}
        value={currentFlow.name}
      />
      <Box className={classes.copyLinkContainer}>
        <CopyLinkButton variant="contained" disableElevation startIcon={<FiCopy />} onClick={handleCopyLink}>
          {intl.formatMessage({ id: 'VerificationFlow.header.copyLink' })}
        </CopyLinkButton>
      </Box>
      <IconButton aria-label="display more actions" edge="end" color="inherit" onClick={handleClick}>
        <MoreIcon />
      </IconButton>
      <Menu
        id="flow-header-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {/* TODO: move MenuItem to isolated component. the issue with forwardRef to root element & withStyles */}
        <MenuItem onClick={handleEdit}>
          <ListItemIcon className={classes.listItemIcon}>
            <FiEdit3 />
          </ListItemIcon>
          <ListItemText>{intl.formatMessage({ id: 'rename' })}</ListItemText>
        </MenuItem>
        { (merchantFlowsModel.value.length > 1) && (
        <MenuItem onClick={handleDelete} className={classes.redColor}>
          <ListItemIcon className={classes.listItemIcon}>
            <FiTrash2 className={classes.redColor} />
          </ListItemIcon>
          <ListItemText>{intl.formatMessage({ id: 'delete' })}</ListItemText>
        </MenuItem>
        )}
      </Menu>
    </Paper>
  );
}
