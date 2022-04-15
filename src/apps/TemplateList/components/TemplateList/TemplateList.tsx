import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Button from '@material-ui/core/Button';
import { MAX_NUMBER_OF_FLOWS } from 'models/Flow.model';
import { Routes } from 'models/Router.model';
import { PageLoader } from 'apps/layout';
import React, { useCallback, useEffect, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { useFormatMessage } from 'apps/intl';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ITemplatesList, selectTemplatesListModelValues, toggleUnsavedChanges } from 'apps/Templates';
import { QATags } from 'models/QA.model';
import { useLoadTemplatesList } from '../../hooks/UseLoadTemplatesList';
import { TemplatesTable } from '../TemplatesTable/TemplatesTable';
import { useStyles } from './TemplateList.styles';

export function TemplateList() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const formatMessage = useFormatMessage();
  const history = useHistory();
  const templatesListValue = useSelector<any, ITemplatesList>(selectTemplatesListModelValues);
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  const isButtonDisabled = (templatesListValue?.rows || []).length >= MAX_NUMBER_OF_FLOWS;
  const [open, setOpen] = useState(isButtonDisabled && isMobile);
  const templatesList = useLoadTemplatesList();

  useEffect(() => {
    setOpen(isButtonDisabled && isMobile);
  }, [isMobile, isButtonDisabled]);

  useEffect(() => {
    dispatch(toggleUnsavedChanges(false));
  }, [dispatch]);

  const handleOpen = useCallback(() => {
    if (templatesListValue?.rows.length >= MAX_NUMBER_OF_FLOWS) {
      setOpen(true);
    }
  }, [templatesListValue]);

  const handleClose = useCallback(() => {
    if (!isMobile) {
      setOpen(false);
    }
  }, [isMobile]);

  const handleBuildMetamapButtonClick = useCallback(() => {
    history.push(Routes.templates.newTemplate);
  }, [history]);

  if (!templatesList.isLoaded) {
    return <PageLoader />;
  }

  return (
    <Container key="content" maxWidth={false}>
      <Box pt={{ xs: 2, lg: 4 }}>
        <Box mb={isButtonDisabled && isMobile ? 5.6 : 0}>
          <Grid container alignItems="center">
            <Grid item xs={12} md={6}>
              <Box mb={{ xs: 1.4, md: 0 }}>
                <Typography variant="h3">{formatMessage('Templates.page.title')}</Typography>
              </Box>
            </Grid>
            <Grid item container xs={12} md={6} justifyContent="flex-end" className={classes.buttonWrapper}>
              <Tooltip
                enterTouchDelay={0}
                placement={isMobile ? 'bottom' : 'left'}
                arrow
                open={open}
                onOpen={handleOpen}
                onClose={handleClose}
                classes={{
                  tooltip: classes.tooltip,
                  popper: classes.tooltipPopper,
                  arrow: classes.tooltipArrow,
                }}
                title={formatMessage('VerificationFlow.page.tooltip')}
              >
                {templatesListValue?.rows.length > 0 && (
                <span>
                  <Button
                    disabled={isButtonDisabled}
                    variant="contained"
                    disableElevation
                    onClick={handleBuildMetamapButtonClick}
                    className={classes.button}
                    data-qa={QATags.Templates.CreateNewTemplateButton}
                  >
                    <FiPlus />
                    {formatMessage('Templates.page.button')}
                  </Button>
                </span>
                )}
              </Tooltip>
            </Grid>
          </Grid>
        </Box>
        <Box py={{ xs: 2, lg: 0 }} className={classes.table}>
          <TemplatesTable onAddNewFlow={handleBuildMetamapButtonClick} />
        </Box>
      </Box>
    </Container>
  );
}
