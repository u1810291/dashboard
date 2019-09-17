import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import 'mati-button';
// import { useIntl } from 'react-intl';
import {
  Card,
  Button,
  Items,
  Text,
  VideoPlayer,
  createOverlay,
} from 'components';
import { trackEvent } from 'lib/mixpanel';

import { ReactComponent as Globus } from './icons/globus.svg';
import { ReactComponent as Apple } from './icons/apple.svg';
import { ReactComponent as Android } from './icons/android.svg';

import CSS from './Configuration.module.scss';

const VideoFrame = ({ url }) => (
  <Card className={CSS.videoFrame}>
    <VideoPlayer url={url} playing controls />
  </Card>
);

function showUsecaseModal(url) {
  trackEvent('merchant_clicked_videos_usecases');
  createOverlay(<VideoFrame url={url} />);
}

export default function MatiButtonAside() {
  const { apps, configuration } = useSelector(({ merchant }) => merchant);
  // const intl = useIntl();

  return (
    <Items flow="row" gap={0} templateRows="1fr 7fr 1fr 5fr" className={CSS.sidebar}>
      <p>Button preview</p>

      <Items
        gap={0}
        align="center"
        justifyContent="center"
        className={CSS.matiButtonWrapper}
      >
        {
          (apps[0] && apps[0].clientId)
          && (
            <mati-button
              color={configuration.style.color}
              clientId={apps[0] && apps[0].clientId}
              language={configuration.style.language}
              apiHost={process.env.REACT_APP_API_URL}
              signupHost={process.env.REACT_APP_SIGNUP_URL}
            />
          )
        }
      </Items>

      <p>Demo videos</p>

      <Items gap={1.7}>
        {
          [
            {
              icon: <Globus />,
              label: 'Web SDK',
              link: 'https://s3.eu-central-1.amazonaws.com/io.mati.sharedfiles/demos/web-sdk.mp4',
            },
            {
              icon: <Apple className="apple" />,
              label: 'iOS SDK',
              link: 'https://s3.eu-central-1.amazonaws.com/io.mati.sharedfiles/demos/android-sdk.mp4',
            },
            {
              icon: <Android className="android" />,
              label: 'Android SDK',
              link: 'https://s3.eu-central-1.amazonaws.com/io.mati.sharedfiles/demos/ios-sdk.mp4',
            },
          ].map(({ icon, label, link }) => (
            <Button
              key={label}
              onClick={() => showUsecaseModal(link)}
              className={CSS.iconButtonContainer}
            >
              <div className={CSS.iconButton}>
                {icon}
                <Text>{label}</Text>
              </div>
            </Button>
          ))
        }
      </Items>
    </Items>
  );
}

VideoFrame.propTypes = {
  url: PropTypes.string,
};

VideoFrame.defaultProps = {
  url: '',
};
