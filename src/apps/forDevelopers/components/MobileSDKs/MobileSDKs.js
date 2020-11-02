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
      header: 'f',
      videoURL: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
    },
    {
      id: TabID.IOS,
      name: intl.formatMessage({ id: 'forDevs.sideMenu.ios' }),
      header: 'f',
      videoURL: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
    },
    {
      id: TabID.REACT_NATIVE,
      name: intl.formatMessage({ id: 'forDevs.sideMenu.reactNative' }),
      header: 'f',
      videoURL: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
    },
    {
      id: TabID.XAMARIN,
      name: intl.formatMessage({ id: 'forDevs.sideMenu.xamarin' }),
      header: 'f',
      videoURL: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
    },
    {
      id: TabID.CORDOVA,
      name: intl.formatMessage({ id: 'forDevs.sideMenu.cordova' }),
      header: 'f',
      videoURL: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
    },
    {
      id: TabID.CORDOVA_IONIC,
      name: intl.formatMessage({ id: 'forDevs.sideMenu.cordovaIonic' }),
      header: 'f',
      videoURL: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
    },
  ]), [intl]);

  return (
    <>
      {mobileSDKsPages().map(({ id, name, header, videoURL }) => (
        <>
          { id === selectedTab && (
          <Grid container>
            <GithubDocumentationBanner platform={name} />
            <Grid item>
              <Typography>
                {header}
              </Typography>
              <Typography>
                If you have native apps, our
                {name}
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
