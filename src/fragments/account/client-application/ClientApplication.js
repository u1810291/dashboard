import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Button from 'components/button';
import Icons from 'components/icons';
import Items from 'components/items';
import { createOverlay, closeOverlay } from 'components/overlay';
import confirm from 'components/confirm';
import copyToClipboard from 'components/clipboard';
import { ReactComponent as Icon } from 'assets/copy-icon.v1.svg';
import NewWebhookModal from '../new-webhook-modal';
import CSS from './ClientApplication.module.css';

function CopyToClipboardCell({ text }) {
  return (
    <Button className={CSS.copy} onClick={() => copyToClipboard(text)}>
      <Icon />
    </Button>
  );
}

export default function ClientApplication({
  application = {},
  webhooks = [],
  subscribeToWebhook = () => {},
  deleteWebhook = () => {},
}) {
  const metadata = '{"email":"user@example.com"}';
  const permalink = `${process.env.REACT_APP_SIGNUP_URL}?merchantToken=${
    application.clientId
  }&metadata=${metadata}`;

  const handleAddNewWebhook = () => {
    createOverlay(
      <NewWebhookModal onSave={subscribeToWebhook} onClose={closeOverlay} />,
    );
  };

  const handleDeleteWebhook = (id) => {
    confirm(
      <FormattedMessage id="fragments.client_application.confirm_delete_webhook" />,
    ).then(() => deleteWebhook(id));
  };

  return (
    <Items flow="row">
      <table className="mgi-table">
        <colgroup>
          <col className={CSS.headerColumn} />
          <col />
          <col className={CSS.copyButtonColumn} />
        </colgroup>
        <tbody>
          <tr>
            <th>
              <FormattedMessage id="fragments.client_application.client_id" />
            </th>
            <td className="text-secondary">{application.clientId}</td>
            <td>
              <CopyToClipboardCell text={application.clientId} />
            </td>
          </tr>
          <tr>
            <th>
              <FormattedMessage id="fragments.client_application.client_secret" />
            </th>
            <td className="text-secondary">{application.clientSecret}</td>
            <td>
              <CopyToClipboardCell text={application.clientSecret} />
            </td>
          </tr>
          <tr>
            <th>
              <FormattedMessage id="fragments.client_application.permalink" />
            </th>
            <td className="text-secondary">{permalink}</td>
            <td>
              <CopyToClipboardCell text={permalink} />
            </td>
          </tr>
          {webhooks.map((webhook, index) => (
            <tr key={webhook.id}>
              {index === 0 && (
                <th rowSpan={webhooks.length}>
                  <FormattedMessage id="onboarding.webhookUrl.title" />
                </th>
              )}
              <td>
                <Items templateColumns="minmax(auto, 100%) auto">
                  <code>{webhook.url}</code>
                </Items>
              </td>
              <td>
                <Items>
                  <CopyToClipboardCell text={webhook.url} />
                  <Button
                    buttonStyle="invisible"
                    onClick={() => handleDeleteWebhook(webhook.id)}
                  >
                    <Icons.TrashBin className="svg-error" />
                  </Button>
                </Items>
              </td>
            </tr>
          ))}

          {webhooks.length === 0 && (
            <tr>
              <th>
                <FormattedMessage id="onboarding.webhookUrl.title" />
              </th>
              <td>
                <Button buttonStyle="primary" onClick={handleAddNewWebhook}>
                  <FormattedMessage id="fragments.client_application.add_webhook" />
                </Button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Items>
  );
}

CopyToClipboardCell.propTypes = {
  text: PropTypes.string.isRequired,
};

ClientApplication.propTypes = {
  application: PropTypes.shape(),
  deleteWebhook: PropTypes.func,
  subscribeToWebhook: PropTypes.func,
  webhooks: PropTypes.arrayOf(PropTypes.shape({})),
};

ClientApplication.defaultProps = {
  application: {},
  deleteWebhook: () => {},
  subscribeToWebhook: () => {},
  webhooks: [],
};
