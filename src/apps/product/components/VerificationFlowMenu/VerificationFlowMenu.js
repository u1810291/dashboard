import { get, isEmpty } from 'lodash';
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCurrentFlowId, merchantCreateFlow } from 'state/merchant/merchant.actions';
import { selectMerchantFlowsModel } from 'state/merchant/merchant.selectors';
// import { useIntl } from 'react-intl';
import { Paper, MenuList } from '@material-ui/core';
import { AddNewFlowDialog } from '../AddNewFlowDialog/AddNewFlowDialog';
import { FlowButtonAdd, FlowMenuItem, FlowMenuHeader, useStyles } from './VerificationFlowMenu.styles';

const addButton = '+ Add new flow';
const header = 'Verification Flow';

export function VerificationFlowMenu() {
  // const intl = useIntl();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState(false);
  const merchantFlowModel = useSelector(selectMerchantFlowsModel);
  const merchantFlowList = get(merchantFlowModel, 'value', [{}]);
  const [selected, setSelected] = useState({});

  const selectCurrentFlow = useCallback(
    (id) => {
      setSelected(id);
      dispatch(updateCurrentFlowId(id));
    },
    [dispatch],
  );

  useEffect((() => {
    if (isEmpty(selected)) {
      setSelected(merchantFlowList[0].id);
    }
  }), [selected, merchantFlowList]);

  function addNewFlowHandler() {
    setOpenDialog(true);
  }

  function closeDialogHandler() {
    setOpenDialog(false);
  }

  function validate(text) {
    if (!text || text.length > 30) {
      throw new Error();
    }
  }

  const submitDialogForm = useCallback(async (text) => {
    validate(text);
    try {
      validate(text);
      await dispatch(merchantCreateFlow({ name: text }));
    } catch (e) {
      setError(`Name cannot be empty or longer than 30 chars (length=${text}). `);
    }
  }, [dispatch]);


  return (
    <Paper className={classes.root}>
      <FlowMenuHeader variant="h5" key="header">{header}</FlowMenuHeader>
      <MenuList className={classes.menuItem}>
        {merchantFlowList.map(({ id, name }) => (
          <FlowMenuItem
            key={id}
            selected={id === selected}
            onClick={() => selectCurrentFlow(id)}
          >
            {name}
          </FlowMenuItem>
        ),
        )}
      </MenuList>
      <FlowButtonAdd
        variant="contained"
        color="primary"
        disableElevation
        onClick={addNewFlowHandler}
      >
        {addButton}
      </FlowButtonAdd>
      <AddNewFlowDialog
        openDialog={openDialog}
        error={!!error}
        helperText={error}
        closeDialogHandler={closeDialogHandler}
        submitDialogForm={submitDialogForm}
      />
    </Paper>
  );
}
