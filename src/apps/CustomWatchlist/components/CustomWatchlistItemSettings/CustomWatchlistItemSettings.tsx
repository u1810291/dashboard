import { Box, Button, Grid, IconButton, Typography } from '@material-ui/core';
import { useOverlay } from 'apps/overlay';
import moment from 'moment';
import classNames from 'classnames';
import { cloneDeep } from 'lodash';
import { Watchlist } from 'models/CustomWatchlist.model';
import { DocumentListOrdered, DocumentTypes } from 'models/Document.model';
import React, { useCallback, useEffect, useState } from 'react';
import { FiEdit, FiPlus, FiTrash2 } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { CustomWatchListModal } from '../CustomWatchListModal/CustomWatchListModal';
import { useStyles } from './CustomWatchlistItemSettings.styles';

export interface CustomWatchlistSettingsProps{
  watchlists: Watchlist[];
  onUpdate: (watchlist: Watchlist[]) => void;
}

export function CustomWatchlistItemSettings({ watchlists, onUpdate }: CustomWatchlistSettingsProps) {
  const intl = useIntl();
  const classes = useStyles();
  const [createOverlay, closeOverlay] = useOverlay();
  const lastStepNumber = watchlists?.length;
  const [checkedDocuments, setCheckedDocuments] = useState<Watchlist[]>([]);

  // const handleSubmitStep = useCallback((stepIndex: number) => (checked: Watchlist[]) => {
  //   if (!watchlist || !checked) {
  //     return;
  //   }

  //   const newSteps = cloneDeep(watchlist);
  //   newSteps[stepIndex] = checked;
  //   onUpdate(newSteps);
  //   closeOverlay();
  // }, [closeOverlay, onUpdate, watchlist]);

  const handleChangeStep = useCallback((watchlist?: Watchlist) => () => {
    createOverlay(<CustomWatchListModal watchlist={watchlist} />);
  }, [createOverlay]);

  // const handleDeleteStep = useCallback((stepIndex: number) => () => {
  //   const newSettings = cloneDeep(watchlist);
  //   if (!watchlist) {
  //     return;
  //   }

  //   newSettings.splice(stepIndex, 1);
  //   onUpdate(newSettings);
  // }, [onUpdate, watchlist]);

  useEffect(() => {
    setCheckedDocuments(watchlists?.flat());
  }, [watchlists]);

  return (
    <Box>
      {watchlists?.map((watchlist, stepIndex) => (
        <Box className={classes.wrapper} p={2} mb={2} key={stepIndex}>
          <Box mb={2}>
            <Grid container wrap="nowrap" alignItems="center">
              <Box color="common.black90" fontWeight="bold" mr={1}>
                {intl.formatMessage({ id: 'CustomWatchlist.settings.step.title' }, { count: stepIndex !== 0 ? stepIndex + 1 : '' })}
              </Box>
              <Box ml="auto" flexShrink={0}>
                <IconButton className={classNames(classes.button, classes.buttonEdit)} onClick={handleChangeStep(watchlist)}>
                  <FiEdit size={17} />
                </IconButton>
                <IconButton className={classNames(classes.button, classes.buttonTrash)}>
                  <FiTrash2 size={17} />
                </IconButton>
              </Box>
            </Grid>
            <Grid container>
              {false ? (
                <Typography variant="subtitle2" className={classes.colorGreen}>
                  Uploaded
                  {' '}
                  {moment(watchlist.createdAt).format('ll')}
                </Typography>
              ) : (
                <Typography variant="subtitle2" className={classes.colorRed}>Validation error</Typography>
              )}
            </Grid>
            <Box mt={2}>
              <Typography variant="subtitle2" className={classNames(classes.colorGrey, classes.matchFollowsTo)}>
                Match follows to:
                {' '}
                <Box className={classes.colorRed}>Rejected</Box>
              </Typography>
            </Box>
          </Box>
        </Box>
      ))}
      {checkedDocuments?.length < DocumentListOrdered.length && (
        <Button className={classes.buttonAdd} onClick={handleChangeStep()} color="primary" variant="outlined">
          <FiPlus size={12} />
          {intl.formatMessage({ id: 'CustomWatchlist.settings.button' })}
        </Button>
      )}
    </Box>
  );
}
