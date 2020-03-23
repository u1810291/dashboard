import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { updateCurrentFlowId } from 'state/merchant/merchant.actions';
// import { useIntl } from 'react-intl';
import { Paper, MenuList } from '@material-ui/core';
import { FlowButtonAdd, FlowMenuItem, FlowMenuHeader, useStyles } from './VerificationFlowMenu.styles';

const addButton = '+ Add new flow';
const header = 'Verification Flow';

export function VerificationFlowMenu({ flowList = [{}] }) {
  // const intl = useIntl();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(flowList[0].id);

  const selectCurrentFlow = useCallback(
    (id) => {
      setSelected(id);
      dispatch(updateCurrentFlowId(id));
    },
    [dispatch],
  );

  function addNewFlowHandler() {
    // console.log(e)
  }

  return (
    <Paper className={classes.root}>
      <FlowMenuHeader variant="h5" key="header">{header}</FlowMenuHeader>
      <MenuList className={classes.menuItem}>
        {flowList.map(({ id, name }) => (
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
    </Paper>
  );
}
