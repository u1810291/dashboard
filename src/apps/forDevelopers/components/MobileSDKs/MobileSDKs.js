import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { TabID } from '../../../../models/ForDevelopers.model';
import { GithubDocumentationBanner } from '../GithubDocumentationBanner/GithubDocumentationBanner';
import { VideoExplainer } from '../VideoExplainer/VideoExplainer';

export const MobileSDKs = ({ selectedTab }) => {
  const intl = useIntl();
  const mobileSDKsPages = useCallback(() => ([
    {
      id: TabID.ANDROID,
      name: intl.formatMessage({ id: 'forDevs.sideMenu.android' }),
      header: 'Native MobileSDK Android',
      videoURL: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
      documentationURL: 'https://github.com',
    },
    {
      id: TabID.IOS,
      name: intl.formatMessage({ id: 'forDevs.sideMenu.ios' }),
      header: 'Native MobileSDK iOS',
      videoURL: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
      documentationURL: 'https://github.com',
    },
    {
      id: TabID.REACT_NATIVE,
      name: intl.formatMessage({ id: 'forDevs.sideMenu.reactNative' }),
      header: 'Hybrid React Native',
      videoURL: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
      documentationURL: 'https://github.com',
    },
    {
      id: TabID.XAMARIN,
      name: intl.formatMessage({ id: 'forDevs.sideMenu.xamarin' }),
      header: 'Hybrid Xamarin',
      videoURL: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
      documentationURL: 'https://github.com',
    },
    {
      id: TabID.CORDOVA,
      name: intl.formatMessage({ id: 'forDevs.sideMenu.cordova' }),
      header: 'Hybrid Cordova',
      videoURL: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
      documentationURL: 'https://github.com',
    },
    {
      id: TabID.CORDOVA_IONIC,
      name: intl.formatMessage({ id: 'forDevs.sideMenu.cordovaIonic' }),
      header: 'Hybrid Cordova ionic',
      videoURL: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
      documentationURL: 'https://github.com',
    },
  ]), [intl]);

  return (
    <>
      {mobileSDKsPages().map(({ id, name, header, videoURL, documentationURL }) => (
        <>
          { id === selectedTab && (
          <Grid container>
            <GithubDocumentationBanner documentationURL={documentationURL} platform={name} />
            <Grid item>
              <Typography>
                {header}
                {' '}
                Integration
              </Typography>
              <Typography>
                If you have native apps, our
                {name}
                {' '}
                are here for you. The integration takes some lines of code.
              </Typography>
              <VideoExplainer videoURL={videoURL} name={name} />
            </Grid>
          </Grid>
          )}
        </>
      ))}
    </>
  );
};
