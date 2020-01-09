import { Grid } from '@material-ui/core';
import { currentPlanLoad } from 'apps/billing/state/billing.actions';
import { selectPlanDetailsModel, selectProviderCollection } from 'apps/billing/state/billing.selectors';
import { PageContent } from 'apps/layout';
import { ReactComponent as LogoutIcon } from 'apps/settings/logout.svg';
import { SettingsRouter } from 'apps/settings/Settings.router';
import { PageContentMenu } from 'components';
import Button from 'components/button/Button';
import confirm from 'components/confirm/Confirm';
import Items from 'components/items';
import { LoadableAdapter } from 'lib/Loadable.adapter';
import React, { useCallback, useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { signOut } from 'state/auth/auth.actions';

export function Settings() {
  const intl = useIntl();
  const dispatch = useDispatch();
  const providerCollection = useSelector(selectProviderCollection);
  const planDetailsModel = useSelector(selectPlanDetailsModel);
  const hasBillingPage = !!planDetailsModel.value || (providerCollection.value.length > 0);

  useEffect(() => {
    if (LoadableAdapter.isPristine(planDetailsModel)) {
      dispatch(currentPlanLoad());
    }
  }, [dispatch, planDetailsModel]);

  const handleLogout = useCallback(async () => {
    await confirm(
      <FormattedMessage id="confirm_string" />);
    dispatch(signOut());
    window.location = '/';
  }, [dispatch]);

  return (
    <PageContent title={intl.formatMessage({ id: 'dashboard.menu.account' })}>
      <Grid container spacing={2} direction="row">
        <Grid item xs={2}>
          <PageContentMenu>
            <NavLink exact to="/settings">
              {intl.formatMessage({ id: 'apps.settings.personalSettings' })}
            </NavLink>
            <NavLink to="/settings/team">
              {intl.formatMessage({ id: 'apps.settings.teamSettings' })}
            </NavLink>
            <NavLink to="/settings/pricing">
              {intl.formatMessage({ id: 'apps.settings.pricing' })}
            </NavLink>
            {hasBillingPage && (
              <NavLink to="/settings/billing">
                {intl.formatMessage({ id: 'apps.settings.billing' })}
              </NavLink>
            )}

            <Button onClick={handleLogout}>
              <Items inline align="center">
                <FormattedMessage id="apps.settings.signout" />
                <LogoutIcon className="svg-active" />
              </Items>
            </Button>
          </PageContentMenu>
        </Grid>
        <Grid item xs={10}>
          <SettingsRouter />
        </Grid>
      </Grid>
    </PageContent>
  );
}
