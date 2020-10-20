/* eslint-disable max-classes-per-file */
import { MenuList, Paper } from '@material-ui/core';
import { useOverlay } from 'apps/overlay';
import { get } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { merchantCreateFlow, updateCurrentFlowId } from 'state/merchant/merchant.actions';
import { selectCurrentFlowId, selectMerchantFlowsModel } from 'state/merchant/merchant.selectors';
import { flowNameValidator } from '../../validators/FlowName.validator';
import { AddNewFlowModal } from '../AddNewFlowDialog/AddNewFlowModal';
import { FlowButtonAdd, FlowMenuHeader, FlowMenuItem, useStyles } from './VerificationFlowMenu.styles';

export function VerificationFlowMenu({ setFade }) {
  const intl = useIntl();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [createOverlay] = useOverlay();
  const merchantFlowModel = useSelector(selectMerchantFlowsModel);
  const currentFlowId = useSelector(selectCurrentFlowId);
  const merchantFlowList = get(merchantFlowModel, 'value', [{}]);
  const [selected, setSelected] = useState({});

  const selectCurrentFlow = useCallback(
    async (id) => {
      if (currentFlowId !== id) {
        setSelected(id);
        setFade(false);
        setTimeout(() => {
          dispatch(updateCurrentFlowId(id));
          setFade(true);
        }, 200);
      }
    },
    [currentFlowId, dispatch, setFade],
  );

  useEffect((() => {
    setSelected(currentFlowId);
  }), [currentFlowId, selected]);

  const submitNewFlow = useCallback(async (text) => {
    const duplicate = merchantFlowList.find((item) => item.name === text.trim());
    await flowNameValidator({ hasDuplicate: !!duplicate, name: text });
    dispatch(merchantCreateFlow({ name: text }));
  }, [merchantFlowList, dispatch]);

  const handleAddNewFlow = useCallback(() => {
    createOverlay(<AddNewFlowModal submitNewFlow={submitNewFlow} />);
  }, [submitNewFlow, createOverlay]);

  return (
    <Paper className={classes.root}>
      <FlowMenuHeader variant="h5" key="header">{intl.formatMessage({ id: 'VerificationFlow.menu.title' })}</FlowMenuHeader>
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
        disabled={(merchantFlowList || []).length >= 30}
        variant="contained"
        color="primary"
        disableElevation
        onClick={handleAddNewFlow}
      >
        {intl.formatMessage({ id: 'VerificationFlow.menu.addNewFlow' })}
      </FlowButtonAdd>
    </Paper>
  );
}
