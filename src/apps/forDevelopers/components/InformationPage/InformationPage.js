import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { TabID } from '../../../../models/ForDevelopers.model';
import { GithubDocumentationBanner } from '../GithubDocumentationBanner/GithubDocumentationBanner';
import { VideoExplainer } from '../VideoExplainer/VideoExplainer';
import { DirectLinkCopy } from './DirectLinkCopy';
import { WebCopy } from './WebCopy';

export const InformationPage = ({ selectedPage }) => {
  const intl = useIntl();
  const pagesData = useCallback(() => ([
    {
      id: TabID.API,
      name: intl.formatMessage({ id: 'forDevs.sideMenu.api' }),
      header: `${intl.formatMessage({ id: 'forDevs.sideMenu.api' })} ${intl.formatMessage({ id: 'forDevs.integration' })}`,
      subHeader: intl.formatMessage({ id: 'forDevs.informationPage.api.subheader' }),
      image: '',
      videoURL: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
      documentationURL: 'https://github.com',
    },
    {
      id: TabID.WEB,
      name: intl.formatMessage({ id: 'forDevs.sideMenu.web' }),
      header: `${intl.formatMessage({ id: 'forDevs.sideMenu.web' })} ${intl.formatMessage({ id: 'forDevs.integration' })}`,
      subHeader: intl.formatMessage({ id: 'forDevs.informationPage.web.subheader' }),
      image: '',
      videoURL: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
      documentationURL: 'https://github.com',
      childComponent: (<WebCopy />),
    },
    {
      id: TabID.DIRECT_LINK,
      name: intl.formatMessage({ id: 'forDevs.sideMenu.directLink' }),
      header: intl.formatMessage({ id: 'forDevs.sideMenu.directLink' }),
      subHeader: intl.formatMessage({ id: 'forDevs.informationPage.directLink.subheader' }),
      image: '',
      videoURL: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
      documentationURL: 'https://github.com',
      childComponent: (<DirectLinkCopy />),
    },
    {
      id: TabID.ANDROID,
      name: intl.formatMessage({ id: 'forDevs.sideMenu.android' }),
      header: 'Native MobileSDK Android Integration',
      subHeader: intl.formatMessage({ id: 'forDevs.informationPage.mobile.subheader' }),
      image: '',
      videoURL: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
      documentationURL: 'https://github.com',
    },
    {
      id: TabID.IOS,
      name: intl.formatMessage({ id: 'forDevs.sideMenu.ios' }),
      header: 'Native MobileSDK iOS Integration',
      image: '',
      videoURL: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
      documentationURL: 'https://github.com',
    },
    {
      id: TabID.REACT_NATIVE,
      name: intl.formatMessage({ id: 'forDevs.sideMenu.reactNative' }),
      header: 'Hybrid React Native Integration',
      videoURL: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
      documentationURL: 'https://github.com',
    },
    {
      id: TabID.XAMARIN,
      name: intl.formatMessage({ id: 'forDevs.sideMenu.xamarin' }),
      header: 'Hybrid Xamarin Integration',
      videoURL: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
      documentationURL: 'https://github.com',
    },
    {
      id: TabID.CORDOVA,
      name: intl.formatMessage({ id: 'forDevs.sideMenu.cordova' }),
      header: 'Hybrid Cordova Integration',
      videoURL: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
      documentationURL: 'https://github.com',
    },
    {
      id: TabID.CORDOVA_IONIC,
      name: intl.formatMessage({ id: 'forDevs.sideMenu.cordovaIonic' }),
      header: 'Hybrid Cordova ionic Integration',
      videoURL: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
      documentationURL: 'https://github.com',
    },
  ]), [intl]);

  return (
    <>
      {pagesData().map(({ id, name, header, videoURL, documentationURL, image, subheader, childComponent }) => (
        <>
          { id === selectedPage && (
            <Grid container>
              <GithubDocumentationBanner documentationURL={documentationURL} platform={name} />
              <Grid item>
                <Typography>{header}</Typography>
                <Typography>
                  {subheader}
                </Typography>
                <img src={image} alt="sdk" />
                {childComponent}
                <VideoExplainer videoURL={videoURL} name={name} />
              </Grid>
            </Grid>
          )}
        </>
      ))}
    </>
  );
};
