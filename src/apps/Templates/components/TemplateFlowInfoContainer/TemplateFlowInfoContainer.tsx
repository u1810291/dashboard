import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { Modal, useOverlay } from 'apps/overlay';
import { Routes } from 'models/Router.model';
import React, { useCallback, useMemo } from 'react';
import { FiChevronLeft, FiSettings } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import { IFlow } from 'models/Flow.model';
import { getGoBackToListLink } from 'models/Identity.model';
import { selectFlowBuilderChangeableFlow } from 'apps/flowBuilder';
import { useSelector } from 'react-redux';
import { TemplateFlowInfo } from '../TemplateFlowInfo/TemplateFlowInfo';
import { TemplateFlowSettings } from '../TemplateFlowSettings/TemplateFlowSettings';
import { useStyles } from './TemplateFlowInfoContainer.styles';

export function TemplateFlowInfoContainer() {
  const classes = useStyles();
  const [createOverlay, closeOverlay] = useOverlay();
  const location = useLocation();
  const { _id } = useSelector<any, IFlow>(selectFlowBuilderChangeableFlow);
  const goBackToListLink = useMemo(() => getGoBackToListLink(location, Routes.templates.root), [location]);
  const handleOpenFlowSettings = useCallback(() => {
    createOverlay(<Modal className={classes.modal} onClose={closeOverlay}><TemplateFlowSettings onClose={closeOverlay} /></Modal>);
  }, [classes.modal, closeOverlay, createOverlay]);

  return (
    <Box className={classes.container}>
      {_id && (
        <IconButton onClick={handleOpenFlowSettings} color="primary" className={classes.button}>
          <FiSettings />
        </IconButton>
      )}
      <Grid container alignItems="flex-start" wrap="nowrap">
        <Link to={goBackToListLink} className={classes.link}>
          <FiChevronLeft />
        </Link>
        <Box pr={2}>
          <TemplateFlowInfo />
        </Box>
      </Grid>
    </Box>
  );
}
