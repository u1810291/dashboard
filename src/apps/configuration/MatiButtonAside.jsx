import { Box, Grid, Typography } from '@material-ui/core';
import { Button, Card, createOverlay, Text, VideoPlayer } from 'components';
import { EndToEndCompliance } from 'fragments';
import { trackEvent } from 'lib/mixpanel/mixpanel';
import { MixPanelEvents } from 'lib/mixpanel/MixPanel.model';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { selectClientIdModel, selectStyleModel } from 'state/merchant/merchant.selectors';
import CSS from './Configuration.module.scss';
import { ReactComponent as Android } from './icons/android.svg';
import { ReactComponent as Apple } from './icons/apple.svg';
import { ReactComponent as Globus } from './icons/globus.svg';
import { useStyles } from './MatiButtonAside.styles';

const CDN_URL = 'https://s3.eu-central-1.amazonaws.com/io.mati.sharedfiles/demos';

const buttons = [
  {
    icon: <Globus />,
    label: 'Web SDK',
    link: `${CDN_URL}/web-sdk.mp4`,
  },
  {
    icon: <Apple className="apple" />,
    label: 'iOS SDK',
    link: `${CDN_URL}/android-sdk.mp4`,
  },
  {
    icon: <Android className="android" />,
    label: 'Android SDK',
    link: `${CDN_URL}/ios-sdk.mp4`,
  },
];

const VideoFrame = ({ url }) => (
  <Card className={CSS.videoFrame}>
    <VideoPlayer url={url} playing controls />
  </Card>
);

export default function MatiButtonAside({ goToComplianceSection }) {
  const styleModel = useSelector(selectStyleModel);
  const intl = useIntl();
  const classes = useStyles();
  const clientIdModel = useSelector(selectClientIdModel);

  const showUseCaseModal = useCallback((url) => {
    trackEvent(MixPanelEvents.VideoShowCase);
    createOverlay(<VideoFrame url={url} />);
  }, []);

  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        <Typography paragraph>
          {intl.formatMessage({ id: 'Product.customization.buttonTitle' })}
        </Typography>

        <Box className={classes.wrapper}>
          {clientIdModel.isLoaded && styleModel.isLoaded && clientIdModel.value && (
            <mati-button
              color={styleModel.value.color}
              clientId={clientIdModel.value}
              language={styleModel.value.language}
              apiHost={process.env.REACT_APP_API_URL}
              signupHost={process.env.REACT_APP_SIGNUP_URL}
            />
          )}
        </Box>
      </Grid>

      <Grid item>
        <Typography paragraph>
          {intl.formatMessage({ id: 'Product.customization.demoButtons' })}
        </Typography>

        <Grid container spacing={2} wrap="nowrap">
          {buttons.map(({ icon, label, link }) => (
            <Grid item key={label}>
              <Button
                onClick={() => showUseCaseModal(link)}
                className={CSS.iconButtonContainer}
              >
                <div className={CSS.iconButton}>
                  {icon}
                  <Text>{label}</Text>
                </div>
              </Button>
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Grid item>
        <EndToEndCompliance goToComplianceSection={goToComplianceSection} />
      </Grid>
    </Grid>
  );
}

VideoFrame.propTypes = {
  url: PropTypes.string,
};

VideoFrame.defaultProps = {
  url: '',
};
