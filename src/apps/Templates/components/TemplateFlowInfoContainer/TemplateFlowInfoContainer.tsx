import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { Modal, useOverlay } from 'apps/overlay';
import { Routes } from 'models/Router.model';
import React, { useCallback, useMemo } from 'react';
import { FiChevronLeft, FiSettings } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import { getGoBackToListLink } from 'models/Identity.model';
import { TemplateFlowInfo } from '../TemplateFlowInfo/TemplateFlowInfo';
import { TemplateFlowSettings } from '../TemplateFlowSettings/TemplateFlowSettings';
import { useStyles } from './TemplateFlowInfoContainer.styles';

export function TemplateFlowInfoContainer({ isTemplate }: { isTemplate?: boolean }) {
  const classes = useStyles();
  const [createOverlay, closeOverlay] = useOverlay();
  const location = useLocation();
  const goBackToListLink = useMemo(() => getGoBackToListLink(location, Routes.templates.root), [location]);
  const handleOpenFlowSettings = useCallback(() => {
    createOverlay(<Modal className={classes.modal} onClose={closeOverlay}><TemplateFlowSettings isTemplate={isTemplate} onClose={closeOverlay} /></Modal>);
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
          <TemplateFlowInfo isTemplate={isTemplate} />
        </Box>
      </Grid>
    </Box>
  );
}
