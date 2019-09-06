import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Card, Items, Text } from 'components';

import CSS from './GooglePlayLink.module.scss';
import GooglePlayImage from './google-play.png';

export default function GooglePlayLink({ clientId }) {
  return (
    <Items flow="row" justifyContent="left" className={CSS.demoWrapper}>
      <Items flow="row" gap={2}>
        <Items flow="row" justifyContent="left" align="center" gap={1}>
          <h3 className={CSS.title}>
            <Text color="active">
              <FormattedMessage id="developers.demo.demo" />
            </Text>
            <p>
              <FormattedMessage id="developers.demo.description" />
            </p>
          </h3>
          <Items flow="column" align="center" gap={2}>
            <a
              href="https://play.google.com/store/apps/details?id=com.matilock.mati_global_demo"
              target="_blank"
              rel="noopener noreferrer"
              className={CSS.googlePlay}
            >
              <img src={GooglePlayImage} alt="Google Play" />
            </a>
            <p>
              <FormattedMessage id="developers.demo.buttonDescription" />
            </p>
          </Items>
        </Items>
        <Items flow="row" gap={1}>
          <h3 className={CSS.title}>
            <Text color="active">
              <FormattedMessage id="developers.demo.clientId" />
            </Text>
            <p>
              <FormattedMessage id="developers.demo.clientIdDescription" />
            </p>
          </h3>

          <Card padding={1} background="lightergray" shadow={0}>
            <strong>
              <code>{clientId}</code>
            </strong>
          </Card>
        </Items>
      </Items>
    </Items>
  );
}

GooglePlayLink.propTypes = {
  clientId: PropTypes.string.isRequired,
};
