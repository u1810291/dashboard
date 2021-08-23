import { Grid } from '@material-ui/core';
import { OpenFilter, useFilterParser, ByVerificationEventTypes, ByAgents } from 'apps/filter';
import { ButtonHeaderMenu } from 'apps/ui';
import { selectVerificationHistoryFilter } from 'apps/verificationHistory/state/verificationHistory.selectors';
import { QATags } from 'models/QA.model';
import { IS_IDENTITY_PROFILE_RELEASED } from 'models/Release.model';
import { Routes } from 'models/Router.model';
import { verificationHistoryCleanFilter, verificationHistoryFilterStructure, allVerificationHistoryActions } from 'models/History.model';
import React, { useMemo } from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useStyles } from './VerificationHistoryHeaderMenu.styles';

export function VerificationHistoryHeaderMenu() {
  const intl = useIntl();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();
  const verificationHistoryFilter = useSelector(selectVerificationHistoryFilter);
  const [, addToUrl] = useFilterParser(verificationHistoryFilterStructure);
  const goBackPath = useMemo(() => history.location.state?.from || `${IS_IDENTITY_PROFILE_RELEASED ? Routes.identity.profile.root : Routes.list.root}/${id}`, [history, id]);

  return (
    <Grid container spacing={2} direction="column">
      <Grid item container justify="space-between">
        {/* Back to list */}
        <Grid item>
          <Link to={goBackPath}>
            <ButtonHeaderMenu
              variant="contained"
              startIcon={<FiChevronLeft />}
              className={classes.buttonBack}
              data-qa={QATags.VerificationHistory.Buttons.BackToList}
            >
              {intl.formatMessage({ id: 'VerificationHistory.button.backToVerification' })}
            </ButtonHeaderMenu>
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
