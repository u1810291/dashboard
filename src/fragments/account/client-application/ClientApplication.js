import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Button from 'components/button';
import Click from 'components/click/Click';
import copyToClipboard from 'components/clipboard';
import Icons from 'components/icons';
import Items from 'components/items';
import Text from 'components/text';
import { ReactComponent as Icon } from 'assets/copy-icon.v1.svg';

import hooks from './ClientApplication.hooks';
import CSS from './ClientApplication.module.css';

function CopyToClipboardCell({ text, disabled }) {
  return (
    <Button
      className={CSS.copy}
      disabled={disabled}
      onClick={() => copyToClipboard(text)}
    >
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
  const {
    handleAddNewWebhook,
    handleDeleteWebhook,
    handleUnlockApplication,
    isIntegrationLocked,
    permalink,
  } = hooks({ application, deleteWebhook, subscribeToWebhook });

  return (
    <Items flow="row" className={CSS.container}>
      <table className={clsx('mgi-table', { [CSS.overlay]: !isIntegrationLocked })}>
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
              <CopyToClipboardCell
                disabled={!isIntegrationLocked}
                text={application.clientId}
              />
            </td>
          </tr>
          <tr>
            <th>
              <FormattedMessage id="fragments.client_application.client_secret" />
            </th>
            <td className="text-secondary">{application.clientSecret}</td>
            <td>
              <CopyToClipboardCell
                disabled={!isIntegrationLocked}
                text={application.clientSecret}
              />
            </td>
          </tr>
          <tr>
            <th>
              <FormattedMessage id="fragments.client_application.permalink" />
            </th>
            <td className="text-secondary">{permalink}</td>
            <td>
              <CopyToClipboardCell
                disabled={!isIntegrationLocked}
                text={permalink}
              />
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
                    disabled={!isIntegrationLocked}
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
                <Button
                  buttonStyle="primary"
                  onClick={handleAddNewWebhook}
                  disabled={!isIntegrationLocked}
                >
                  <FormattedMessage id="fragments.client_application.add_webhook" />
                </Button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {
        !isIntegrationLocked
          && (
            <Click
              background="active"
              className={CSS.unlockButton}
              onClick={handleUnlockApplication}
            >
              <Text>
                <FormattedMessage
                  id="fragments.integration.integration-code.unlock-application.button"
                />
              </Text>
            </Click>
          )
      }
    </Items>
  );
}

CopyToClipboardCell.propTypes = {
  disabled: PropTypes.bool,
  text: PropTypes.string.isRequired,
};

CopyToClipboardCell.defaultProps = {
  disabled: false,
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
