import { Box, Grid, IconButton } from '@material-ui/core';
import { Modal, useOverlay } from 'apps/overlay';
import { Routes } from 'models/Router.model';
import React, { useCallback } from 'react';
import { FiChevronLeft, FiSettings } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { FlowInfo } from '../FlowInfo/FlowInfo';
import { FlowSettings } from '../FlowSettings/FlowSettings';
import { useStyles } from './FlowInfoContainer.styles';

export function FlowInfoContainer() {
  const classes = useStyles();
  const [createOverlay, closeOverlay] = useOverlay();
  const handleOpenFlowSettings = useCallback(() => {
    createOverlay(<Modal className={classes.modal} onClose={closeOverlay}><FlowSettings /></Modal>);
  }, [closeOverlay, createOverlay]);

  return (
    <Box className={classes.container} px={0.5} py={2.5}>
      <IconButton onClick={handleOpenFlowSettings} color="primary" className={classes.button}>
        <FiSettings />
      </IconButton>
      <Grid container alignItems="flex-start">
        <Link to={Routes.flows.root} className={classes.link}>
          <FiChevronLeft />
        </Link>
        <FlowInfo />
      </Grid>
    </Box>
  );
}
