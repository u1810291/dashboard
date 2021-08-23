import { FormControl, Grid, Typography } from '@material-ui/core';
import classnames from 'classnames';
import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { appPalette } from 'apps/theme';
import { Warning, BoxBordered } from 'apps/ui';
import { MerchantTags } from 'models/Merchant.model';
import { selectMerchantTags } from 'state/merchant/merchant.selectors';
import { useStyles } from './CustomDocumentConfiguration.styles';
import { CustonDocumentList } from '../CustonDocumentList/CustonDocumentList';

export function CustomDocumentConfiguration() {
  const intl = useIntl();
  const classes = useStyles();
  const tags = useSelector(selectMerchantTags);
  const isCustomDocumentAvailable = useMemo<boolean>(() => tags.includes(MerchantTags.CanUseCustomDocument), [tags]);

  return (
    <FormControl component="fieldset" className={classes.fullHeight}>
      <Grid container spacing={1}>
        {!isCustomDocumentAvailable && (
          <Grid item>
            <BoxBordered borderColor={appPalette.yellow}>
              <Warning
                label={intl.formatMessage({ id: 'CustomDocuments.settings.customDocumentNotAvailable' })}
                linkLabel={intl.formatMessage({ id: 'CustomDocuments.settings.helpEmail' })}
                isLabelColored={false}
              />
            </BoxBordered>
          </Grid>
        )}
        <Grid item>
          <Typography variant="h4" className={classnames({ [classes.disabledTitle]: !isCustomDocumentAvailable })}>
            {intl.formatMessage({ id: 'CustomDocuments.settings.title' })}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1" className={classnames({ [classes.disabledSubtitle]: !isCustomDocumentAvailable })}>
            {intl.formatMessage({ id: 'CustomDocuments.settings.upload.description' })}
          </Typography>
        </Grid>
      </Grid>
      <CustonDocumentList compatibilityMode />
    </FormControl>
  );
}
