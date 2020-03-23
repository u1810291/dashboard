import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { merchantUpdateFlow } from 'state/merchant/merchant.actions';
import { selectCurrentFlow, selectMerchantFlowsModel } from 'state/merchant/merchant.selectors';
import { Paper, IconButton, Box, Menu, MenuItem, ListItemIcon, ListItemText } from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreVert';
import { FiCopy, FiEdit3, FiTrash2 } from 'react-icons/fi';
import { useStyles, CopyLinkButton } from './VerificationFlowHeader.styles';
import { EditableField } from '../EditableField/EditableField';

const copyLink = 'Copy verification link';
const rename = 'Rename';
const del = 'Delete';

export function VerificationFlowHeader() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [editable, setEditable] = useState(false);
  const currentFlow = useSelector(selectCurrentFlow);
  const merchantFlowsModel = useSelector(selectMerchantFlowsModel);

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

  const submitEditable = useCallback(async (text) => {
    await dispatch(merchantUpdateFlow(currentFlow.id, { name: text }));
    setEditable(false);
  }, [dispatch, currentFlow.id]);

  function cancelEditable() {
    setEditable(false);
  }

  return (
    <Paper className={classes.headerContainer}>
      <EditableField
        enabled={editable}
        className={classes.flowName}
        submitEditable={submitEditable}
        cancelEditable={cancelEditable}
        inProgress={merchantFlowsModel.isLoading}
        value={currentFlow.name}
      />
      <Box className={classes.copyLinkContainer}>
        <CopyLinkButton variant="contained" disableElevation startIcon={<FiCopy />}>
          {copyLink}
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
          <ListItemText>{rename}</ListItemText>
        </MenuItem>

        <MenuItem onClick={handleClose} className={classes.redColor}>
          <ListItemIcon className={classes.listItemIcon}>
            <FiTrash2 className={classes.redColor} />
          </ListItemIcon>
          <ListItemText>{del}</ListItemText>
        </MenuItem>
      </Menu>
    </Paper>
  );
}
