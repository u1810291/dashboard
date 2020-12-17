import { Box, Switch, Typography } from '@material-ui/core';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { selectUploadDenial } from 'state/merchant/merchant.selectors';
import { configurationFlowUpdate } from '../../../../state/merchant/merchant.actions';
import { useStyles } from './DenyUploadRequirement.styles';

export function DenyUploadRequirement() {
  const intl = useIntl();
  const classes = useStyles();
  const isUploadDenial = useSelector(selectUploadDenial);
  const dispatch = useDispatch();

  const handleUploadChange = useCallback((_, value) => {
    dispatch(configurationFlowUpdate({
      denyUploadsFromMobileGallery: value,
    }));
  }, [dispatch]);

  return (
    <Box>
      <Typography variant="subtitle1" gutterBottom color="primary">
        {intl.formatMessage({ id: 'flow.verificationRequirement.title' })}
      </Typography>
      <Box className={classes.restriction}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body1" className={classes.restrictionLabel}>
            {intl.formatMessage({ id: 'flow.verificationRequirement.label' })}
          </Typography>
          <Box mr={-1}>
            <Switch
              color="primary"
              checked={isUploadDenial}
              onChange={handleUploadChange}
              name="verificationRequirement"
            />
          </Box>
        </Box>
        <Box mr={5}>
          <Typography variant="body1" className={classes.restrictionHint}>
            {intl.formatMessage({ id: 'flow.verificationRequirement.description' })}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
