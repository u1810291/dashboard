import { Box, Grid, IconButton } from '@material-ui/core';
import { Modal, useOverlay } from 'apps/overlay';
import { Routes } from 'models/Router.model';
import React, { useCallback, useMemo } from 'react';
import { FiChevronLeft, FiSettings } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import { getGoBackToListLink } from 'models/Identity.model';
import { FlowInfo } from '../FlowInfo/FlowInfo';
import { FlowSettings } from '../FlowSettings/FlowSettings';
import { useStyles } from './FlowInfoContainer.styles';

export function FlowInfoContainer({ isTemplate }: { isTemplate?: boolean }) {
  const classes = useStyles();
  const [createOverlay, closeOverlay] = useOverlay();
  const location = useLocation();
  const goBackToListLink = useMemo(() => getGoBackToListLink(location, Routes.flow.root), [location]);
  const handleOpenFlowSettings = useCallback(() => {
    createOverlay(<Modal className={classes.modal} onClose={closeOverlay}><FlowSettings isTemplate={isTemplate} onClose={closeOverlay} /></Modal>);
  }, [classes.modal, closeOverlay, createOverlay, isTemplate]);

  return (
    <Box className={classes.container}>
      <IconButton onClick={handleOpenFlowSettings} color="primary" className={classes.button}>
        <FiSettings />
      </IconButton>
      <Grid container alignItems="flex-start" wrap="nowrap">
        <Link to={goBackToListLink} className={classes.link}>
          <FiChevronLeft />
        </Link>
        <Box pr={2}>
          <FlowInfo isTemplate={isTemplate} />
        </Box>
      </Grid>
    </Box>
  );
}
