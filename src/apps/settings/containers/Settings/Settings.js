import { Grid } from '@material-ui/core';
import { signOut } from 'apps/auth/state/auth.actions';
import { selectHasBilling } from 'apps/billing';
import { PageContent } from 'apps/layout';
import { ROOT_PATH } from 'apps/routing';
import { PageContentMenu } from 'components';
import Button from 'components/button/Button';
import confirm from 'components/confirm/Confirm';
import Items from 'components/items';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { ReactComponent as LogoutIcon } from './logout.svg';
import { SettingsRouter } from './Settings.router';

export function Settings() {
  const intl = useIntl();
  const history = useHistory();
  const dispatch = useDispatch();
  const hasBillingModel = useSelector(selectHasBilling);

  const handleLogout = useCallback(async () => {
    await confirm(intl.formatMessage({ id: 'confirm_string' }));
    dispatch(signOut());
    history.push(ROOT_PATH);
  }, [dispatch, history, intl]);

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
            {hasBillingModel.value && (
              <NavLink to="/settings/billing">
                {intl.formatMessage({ id: 'apps.settings.billing' })}
              </NavLink>
            )}

            <Button onClick={handleLogout}>
              <Items inline align="center">
                {intl.formatMessage({ id: 'apps.settings.signout' })}
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
