import { Grid } from '@material-ui/core';
import { OpenFilter, useFilterParser, ByVerificationEventTypes, ByAgents } from 'apps/filter';
import { HeaderMenuButton } from 'apps/ui';
import { selectVerificationHistoryFilter } from 'apps/verificationHistory/state/verificationHistory.selectors';
import { QATags } from 'models/QA.model';
import { Routes } from 'models/Router.model';
import { verificationHistoryCleanFilter, verificationHistoryFilterStructure, allVerificationHistoryActions } from 'models/History.model';
import React from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useStyles } from './VerificationHistoryHeaderMenu.styles';

export function VerificationHistoryHeaderMenu() {
  const intl = useIntl();
  const classes = useStyles();
  const { id } = useParams();
  const verificationHistoryFilter = useSelector(selectVerificationHistoryFilter);
  const [,addToUrl] = useFilterParser(verificationHistoryFilterStructure);

  return (
    <Grid container spacing={2} direction="column">
      <Grid item container justify="space-between">
        {/* Back to list */}
        <Grid item>
          <Link to={`${Routes.list.root}/${id}`}>
            <HeaderMenuButton
              variant="contained"
              startIcon={<FiChevronLeft />}
              className={classes.buttonBack}
              data-qa={QATags.VerificationHistory.Buttons.BackToList}
            >
              {intl.formatMessage({ id: 'VerificationHistory.button.backToVerification' })}
            </HeaderMenuButton>
          </Link>
        </Grid>
        {/* identityFilter */}
        <Grid item>
          <OpenFilter
            onSetFilter={addToUrl}
            selectFilter={verificationHistoryFilter}
            cleanFilter={verificationHistoryCleanFilter}
            qa={QATags.VerificationHistory.Buttons.Filter}
          >
            <ByVerificationEventTypes eventTypes={allVerificationHistoryActions} />
            <ByAgents />
          </OpenFilter>
        </Grid>
      </Grid>
    </Grid>
  );
}