import { Box, Typography } from '@material-ui/core';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { TabID } from '../../../../models/ForDevelopers.model';
import { GithubDocumentationBanner } from '../GithubDocumentationBanner/GithubDocumentationBanner';
import { VideoExplainer } from '../VideoExplainer/VideoExplainer';
import { DirectLinkCopy } from './DirectLinkCopy/DirectLinkCopy';
import { WebCodeSnippet } from './WebCodeSnippet/WebCodeSnippet';

export const Information = ({ selectedPage }) => {
  const intl = useIntl();
  const pagesData = useCallback(() => {
    const integration = intl.formatMessage({ id: 'forDevs.integration' });
    return [
      {
        id: TabID.API,
        name: intl.formatMessage({ id: 'forDevs.sideMenu.api' }),
        explainerName: `${intl.formatMessage({ id: 'forDevs.sideMenu.api' })} ${integration}`,
        header: `${intl.formatMessage({ id: 'forDevs.sideMenu.api' })} ${integration}`,
        subHeader: intl.formatMessage(
          { id: 'forDevs.informationPage.api.subheader' },
          { name: `${intl.formatMessage({ id: 'forDevs.sideMenu.api' })} ${integration}` }),
        image: '',
        videoURL: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
        documentationURL: 'https://github.com',
      },
      {
        id: TabID.WEB,
        name: intl.formatMessage({ id: 'forDevs.sideMenu.web' }),
        explainerName: 'WebSDK',
        header: `${intl.formatMessage({ id: 'forDevs.sideMenu.web' })} ${integration}`,
        subHeader: intl.formatMessage(
          { id: 'forDevs.informationPage.web.subheader' },
          { name: `${intl.formatMessage({ id: 'forDevs.sideMenu.web' })} ${integration}` }),
        image: '',
        videoURL: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
        documentationURL: 'https://github.com',
        childComponent: (<WebCodeSnippet />),
      },
      {
        id: TabID.DIRECT_LINK,
        name: intl.formatMessage({ id: 'forDevs.sideMenu.directLink' }),
        explainerName: `${intl.formatMessage({ id: 'forDevs.sideMenu.directLink' })}`,
        header: intl.formatMessage({ id: 'forDevs.sideMenu.directLink' }),
        subHeader: intl.formatMessage(
          { id: 'forDevs.informationPage.directLink.subheader' },
          { name: intl.formatMessage({ id: 'forDevs.sideMenu.directLink' }) }),
        image: '',
        videoURL: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
        childComponent: (<DirectLinkCopy />),
      },
      {
        id: TabID.ANDROID,
        name: intl.formatMessage({ id: 'forDevs.sideMenu.android' }),
        explainerName: `MobileSDK ${intl.formatMessage({ id: 'forDevs.sideMenu.android' })}`,
        header: `${intl.formatMessage({ id: 'forDevs.sideMenu.android' })} ${integration}`,
        subHeader: intl.formatMessage(
          { id: 'forDevs.informationPage.mobile.subheader' },
          { name: `${intl.formatMessage({ id: 'forDevs.sideMenu.android' })} ${integration}` }),
        image: '',
        videoURL: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
        documentationURL: 'https://github.com',
      },
      {
        id: TabID.IOS,
        name: intl.formatMessage({ id: 'forDevs.sideMenu.ios' }),
        header: `${intl.formatMessage({ id: 'forDevs.sideMenu.ios' })} ${integration}`,
        explainerName: `MobileSDK ${intl.formatMessage({ id: 'forDevs.sideMenu.ios' })}`,
        subHeader: intl.formatMessage(
          { id: 'forDevs.informationPage.mobile.subheader' },
          { name: `${intl.formatMessage({ id: 'forDevs.sideMenu.ios' })} ${integration}` }),
        image: '',
        videoURL: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
        documentationURL: 'https://github.com',
      },
      {
        id: TabID.REACT_NATIVE,
        name: intl.formatMessage({ id: 'forDevs.sideMenu.reactNative' }),
        explainerName: `${intl.formatMessage({ id: 'forDevs.sideMenu.reactNative  ' })} ${integration}`,
        header: `${intl.formatMessage({ id: 'forDevs.sideMenu.reactNative' })} ${integration}`,
        subHeader: intl.formatMessage(
          { id: 'forDevs.informationPage.mobile.subheader' },
          { name: `${intl.formatMessage({ id: 'forDevs.sideMenu.reactNative' })} ${integration}` }),
        videoURL: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
        documentationURL: 'https://github.com',
      },
      {
        id: TabID.XAMARIN,
        name: intl.formatMessage({ id: 'forDevs.sideMenu.xamarin' }),
        explainerName: `${intl.formatMessage({ id: 'forDevs.sideMenu.xamarin' })} ${integration}`,
        header: `${intl.formatMessage({ id: 'forDevs.sideMenu.xamarin' })} ${integration}`,
        subHeader: intl.formatMessage(
          { id: 'forDevs.informationPage.mobile.subheader' },
          { name: `${intl.formatMessage({ id: 'forDevs.sideMenu.xamarin' })} ${integration}` }),
        videoURL: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
        documentationURL: 'https://github.com',
      },
      {
        id: TabID.CORDOVA,
        name: intl.formatMessage({ id: 'forDevs.sideMenu.cordova' }),
        explainerName: `${intl.formatMessage({ id: 'forDevs.sideMenu.cordova' })} ${integration}`,
        header: `${intl.formatMessage({ id: 'forDevs.sideMenu.cordova' })} ${integration}`,
        subHeader: intl.formatMessage(
          { id: 'forDevs.informationPage.mobile.subheader' },
          { name: `${intl.formatMessage({ id: 'forDevs.sideMenu.cordova' })} ${integration}` }),
        videoURL: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
        documentationURL: 'https://github.com',
      },
      {
        id: TabID.CORDOVA_IONIC,
        name: intl.formatMessage({ id: 'forDevs.sideMenu.cordovaIonic' }),
        explainerName: `${intl.formatMessage({ id: 'forDevs.sideMenu.cordovaIonic' })} ${integration}`,
        header: `${intl.formatMessage({ id: 'forDevs.sideMenu.cordovaIonic' })} ${integration}`,
        subHeader: intl.formatMessage(
          { id: 'forDevs.informationPage.mobile.subheader' },
          { name: `${intl.formatMessage({ id: 'forDevs.sideMenu.cordovaIonic' })} ${integration}` }),
        videoURL: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
        documentationURL: 'https://github.com',
      },
    ];
  }, [intl]);

  return (
    <>
      {pagesData().map(({
        id,
        name,
        header,
        videoURL,
        documentationURL,
        image,
        subHeader,
        childComponent,
        explainerName,
      }) => (
        <>
          { id === selectedPage && (
          <Box>
            {documentationURL && (
            <Box mb={4}>
              <GithubDocumentationBanner documentationURL={documentationURL} platform={name} />
            </Box>
            )}
            <Typography variant="subtitle2" gutterBottom>{header}</Typography>
            <Box mb={2} color="common.black75">{subHeader}</Box>
            <Box mb={4}>
              <img src={image} alt="sdk" />
            </Box>
            {childComponent && (
            <Box pt={4} mb={4} borderTop={1} borderColor="common.black7">
              {childComponent}
            </Box>
            )}
            <Box pt={4} borderTop={1} borderColor="common.black7">
              <VideoExplainer videoCover="https://img.youtube.com/vi/7yzZcAj24AI/maxresdefault.jpg" videoURL={videoURL} name={explainerName} />
            </Box>
          </Box>
          )}
        </>
      ))}
    </>
  );
};
