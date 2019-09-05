import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get } from 'lodash';

import { getMerchantApps } from 'state/merchant';
import { subscribeToWebhook, deleteWebhook, getWebhooks } from 'state/webhooks';
import Items from 'components/items';
import ClientApplication from 'fragments/account/client-application';
import IntegrationLayout from './IntegrationLayout';

function ClientApplications({
  apps = [],
  token,
  webhooks = {},
  // eslint-disable-next-line no-shadow
  getMerchantApps,
  // eslint-disable-next-line no-shadow
  subscribeToWebhook,
  // eslint-disable-next-line no-shadow
  deleteWebhook,
  // eslint-disable-next-line no-shadow
  getWebhooks,
}) {
  useEffect(() => {
    getMerchantApps(token).then((response) => {
      // eslint-disable-next-line no-shadow
      const apps = get(response, 'data.apps', []);
      apps.forEach((app) => getWebhooks(token, app.clientId));
    });
  }, [token, getMerchantApps, getWebhooks]);

  async function handleSubscribeToWebhook(clientId, url, secret) {
    await subscribeToWebhook(token, clientId, { url, secret });
    await getWebhooks(token, clientId);
  }

  async function handleDeleteWebhook(clientId, id) {
    await deleteWebhook(token, clientId, id);
    await getWebhooks(token, clientId);
  }

  return (
    <IntegrationLayout>
      <main>
        <Items flow="row">
          {
            apps.map((app) => (
              <ClientApplication
                key={app.clientId}
                application={app}
                webhooks={webhooks[app.clientId]}
                subscribeToWebhook={() => handleSubscribeToWebhook(app.clientId)}
                deleteWebhook={() => handleDeleteWebhook(app.clientId)}
              />
            ))
          }
        </Items>
      </main>
    </IntegrationLayout>
  );
}

export default connect(
  (state) => ({
    apps: state.merchant.apps,
    token: state.auth.token,
    webhooks: state.webhooks.webhooks,
  }),
  {
    getMerchantApps,
    subscribeToWebhook,
    deleteWebhook,
    getWebhooks,
  },
)(ClientApplications);

ClientApplications.propTypes = {
  apps: PropTypes.arrayOf(PropTypes.shape({})),
  deleteWebhook: PropTypes.func.isRequired,
  getMerchantApps: PropTypes.func.isRequired,
  getWebhooks: PropTypes.func.isRequired,
  subscribeToWebhook: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  webhooks: PropTypes.shape({}),
};

ClientApplications.defaultProps = {
  apps: [],
  webhooks: {},
};
