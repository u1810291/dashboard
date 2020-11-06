import { Box, Typography } from '@material-ui/core';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { TabID } from '../../../../models/ForDevelopers.model';
import { GithubDocumentationBanner } from '../GithubDocumentationBanner/GithubDocumentationBanner';
import { VideoExplainer } from '../VideoExplainer/VideoExplainer';
import { DirectLinkCopy } from './DirectLinkCopy/DirectLinkCopy';
import { WebCodeSnippet } from './WebCodeSnippet/WebCodeSnippet';
import { InformationImageMobile } from './InformationImage/InformationImageMobile';

export const Information = ({ selectedPage }) => {
  const intl = useIntl();
  const pagesData = useCallback(() => {
    const integration = intl.formatMessage({ id: 'forDevs.integration' });
    const mobileSDK = intl.formatMessage({ id: 'forDevs.informationPage.mobileSDK.title' });
    const SDK = intl.formatMessage({ id: 'forDevs.informationPage.SDK.title' });
    return [
      {
        id: TabID.api,
        name: intl.formatMessage({ id: 'forDevs.sideMenu.api' }),
        explainerName: `${intl.formatMessage({ id: 'forDevs.sideMenu.api' })} ${integration}`,
        header: `${intl.formatMessage({ id: 'forDevs.sideMenu.api' })} ${integration}`,
        subHeader: intl.formatMessage(
          { id: 'forDevs.informationPage.api.subheader' },
          { name: `${intl.formatMessage({ id: 'forDevs.sideMenu.api' })} ${integration}` }),
        imageComponent: (<div>image component</div>),
        videoURL: 'https://s3.eu-central-1.amazonaws.com/io.mati.sharedfiles/Mati+API.mp4',
        documentationURL: 'https://github.com',
      },
      {
        id: TabID.web,
        name: intl.formatMessage({ id: 'forDevs.sideMenu.web' }),
        explainerName: intl.formatMessage({ id: 'forDevs.informationPage.webSDK.title' }),
        header: `${intl.formatMessage({ id: 'forDevs.sideMenu.web' })} ${integration}`,
        subHeader: intl.formatMessage(
          { id: 'forDevs.informationPage.web.subheader' },
          { name: `${intl.formatMessage({ id: 'forDevs.sideMenu.web' })} ${SDK}` }),
        imageComponent: '',
        videoURL: 'https://s3.eu-central-1.amazonaws.com/io.mati.sharedfiles/Mati+Web+SDK.mp4',
        documentationURL: 'https://github.com',
        childComponent: (<WebCodeSnippet />),
      },
      {
        id: TabID.directLink,
        name: intl.formatMessage({ id: 'forDevs.sideMenu.directLink' }),
        explainerName: `${intl.formatMessage({ id: 'forDevs.sideMenu.directLink' })}`,
        header: intl.formatMessage({ id: 'forDevs.sideMenu.directLink' }),
        subHeader: intl.formatMessage(
          { id: 'forDevs.informationPage.directLink.subheader' },
          { name: intl.formatMessage({ id: 'forDevs.sideMenu.directLink' }) }),
        imageComponent: '',
        videoURL: 'https://s3.eu-central-1.amazonaws.com/io.mati.sharedfiles/Mati+Direct+Link.mp4',
        childComponent: (<DirectLinkCopy />),
      },
      {
        id: TabID.android,
        name: intl.formatMessage({ id: 'forDevs.sideMenu.android' }),
        explainerName: `${mobileSDK} ${intl.formatMessage({ id: 'forDevs.sideMenu.android' })}`,
        header: `${intl.formatMessage({ id: 'forDevs.sideMenu.android' })} ${integration}`,
        subHeader: intl.formatMessage(
          { id: 'forDevs.informationPage.mobile.subheader' },
          { name: `${intl.formatMessage({ id: 'forDevs.sideMenu.android' })} ${integration}` }),
        imageComponent: (<InformationImageMobile />),
        videoURL: 'https://s3.eu-central-1.amazonaws.com/io.mati.sharedfiles/Mati+Mobile+SDKs.mp4',
        documentationURL: 'https://github.com',
      },
      {
        id: TabID.ios,
        name: intl.formatMessage({ id: 'forDevs.sideMenu.ios' }),
        header: `${intl.formatMessage({ id: 'forDevs.sideMenu.ios' })} ${integration}`,
        explainerName: `${mobileSDK} ${intl.formatMessage({ id: 'forDevs.sideMenu.ios' })}`,
        subHeader: intl.formatMessage(
          { id: 'forDevs.informationPage.mobile.subheader' },
          { name: `${intl.formatMessage({ id: 'forDevs.sideMenu.ios' })} ${integration}` }),
        imageComponent: (<InformationImageMobile />),
        videoURL: 'https://s3.eu-central-1.amazonaws.com/io.mati.sharedfiles/Mati+Mobile+SDKs.mp4',
        documentationURL: 'https://github.com',
      },
      {
        id: TabID.reactNative,
        name: intl.formatMessage({ id: 'forDevs.sideMenu.reactNative' }),
        explainerName: `${intl.formatMessage({ id: 'forDevs.sideMenu.reactNative' })} ${integration}`,
        header: `${intl.formatMessage({ id: 'forDevs.sideMenu.reactNative' })} ${integration}`,
        subHeader: intl.formatMessage(
          { id: 'forDevs.informationPage.mobile.subheader' },
          { name: `${intl.formatMessage({ id: 'forDevs.sideMenu.reactNative' })} ${integration}` }),
        imageComponent: (<InformationImageMobile />),
        videoURL: 'https://s3.eu-central-1.amazonaws.com/io.mati.sharedfiles/Mati+Mobile+SDKs.mp4',
        documentationURL: 'https://github.com',
      },
      {
        id: TabID.xamarin,
        name: intl.formatMessage({ id: 'forDevs.sideMenu.xamarin' }),
        explainerName: `${intl.formatMessage({ id: 'forDevs.sideMenu.xamarin' })} ${integration}`,
        header: `${intl.formatMessage({ id: 'forDevs.sideMenu.xamarin' })} ${integration}`,
        subHeader: intl.formatMessage(
          { id: 'forDevs.informationPage.mobile.subheader' },
          { name: `${intl.formatMessage({ id: 'forDevs.sideMenu.xamarin' })} ${integration}` }),
        imageComponent: (<InformationImageMobile />),
        videoURL: 'https://s3.eu-central-1.amazonaws.com/io.mati.sharedfiles/Mati+Mobile+SDKs.mp4',
        documentationURL: 'https://github.com',
      },
      {
        id: TabID.cordova,
        name: intl.formatMessage({ id: 'forDevs.sideMenu.cordova' }),
        explainerName: `${intl.formatMessage({ id: 'forDevs.sideMenu.cordova' })} ${integration}`,
        header: `${intl.formatMessage({ id: 'forDevs.sideMenu.cordova' })} ${integration}`,
        subHeader: intl.formatMessage(
          { id: 'forDevs.informationPage.mobile.subheader' },
          { name: `${intl.formatMessage({ id: 'forDevs.sideMenu.cordova' })} ${integration}` }),
        imageComponent: (<InformationImageMobile />),
        videoURL: 'https://s3.eu-central-1.amazonaws.com/io.mati.sharedfiles/Mati+Mobile+SDKs.mp4',
        documentationURL: 'https://github.com',
      },
      {
        id: TabID.cordovaIonic,
        name: intl.formatMessage({ id: 'forDevs.sideMenu.cordovaIonic' }),
        explainerName: `${intl.formatMessage({ id: 'forDevs.sideMenu.cordovaIonic' })} ${integration}`,
        header: `${intl.formatMessage({ id: 'forDevs.sideMenu.cordovaIonic' })} ${integration}`,
        subHeader: intl.formatMessage(
          { id: 'forDevs.informationPage.mobile.subheader' },
          { name: `${intl.formatMessage({ id: 'forDevs.sideMenu.cordovaIonic' })} ${integration}` }),
        imageComponent: (<InformationImageMobile />),
        videoURL: 'https://s3.eu-central-1.amazonaws.com/io.mati.sharedfiles/Mati+Mobile+SDKs.mp4',
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
        imageComponent,
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
              {imageComponent}
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
