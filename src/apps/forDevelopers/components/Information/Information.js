import { Box, Typography } from '@material-ui/core';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { InformationImageTypes, TabID } from '../../../../models/ForDevelopers.model';
import { GithubDocumentationBanner } from '../GithubDocumentationBanner/GithubDocumentationBanner';
import { VideoExplainer } from '../VideoExplainer/VideoExplainer';
import { DirectLinkCopy } from './DirectLinkCopy/DirectLinkCopy';
import { WebCodeSnippet } from './WebCodeSnippet/WebCodeSnippet';
import { InformationImage } from './InformationImage/InformationImage';

export function Information({ selectedPage }) {
  const intl = useIntl();
  const pagesData = useCallback(() => {
    const mobileSDKVideo = 'https://s3.eu-central-1.amazonaws.com/io.mati.sharedfiles/Mati%2BMobile%2BSDKs.png';
    return [
      {
        id: TabID.api,
        imageComponent: (<InformationImage type={InformationImageTypes.api} />),
        videoURL: 'https://s3.eu-central-1.amazonaws.com/io.mati.sharedfiles/Mati+API.mp4',
        videoCover: 'https://s3.eu-central-1.amazonaws.com/io.mati.sharedfiles/Mati%2BAPI.png',
        documentationURL: 'https://docs.getmati.com/#api-overview',
      },
      {
        id: TabID.web,
        imageComponent: (<InformationImage type={InformationImageTypes.web} />),
        videoURL: 'https://s3.eu-central-1.amazonaws.com/io.mati.sharedfiles/Mati+Web+SDK.mp4',
        videoCover: 'https://s3.eu-central-1.amazonaws.com/io.mati.sharedfiles/Mati%2BWeb%2BSDK.png',
        documentationURL: 'https://docs.getmati.com/#web-sdk-overview',
        childComponent: (<WebCodeSnippet />),
      },
      {
        id: TabID.directLink,
        imageComponent: (<InformationImage type={InformationImageTypes.directLink} />),
        videoURL: 'https://s3.eu-central-1.amazonaws.com/io.mati.sharedfiles/Mati+Direct+Link.mp4',
        videoCover: 'https://s3.eu-central-1.amazonaws.com/io.mati.sharedfiles/Mati%2BDirect%2BLink.png',
        childComponent: (<DirectLinkCopy />),
      },
      {
        id: TabID.android,
        imageComponent: (<InformationImage type={InformationImageTypes.android} />),
        videoURL: 'https://s3.eu-central-1.amazonaws.com/io.mati.sharedfiles/Mati+Mobile+SDKs.mp4',
        videoCover: mobileSDKVideo,
        documentationURL: 'https://github.com/MatiFace/mati-global-id-sdk-integration-android',
      },
      {
        id: TabID.ios,
        imageComponent: (<InformationImage type={InformationImageTypes.ios} />),
        videoURL: 'https://s3.eu-central-1.amazonaws.com/io.mati.sharedfiles/Mati+Mobile+SDKs.mp4',
        videoCover: mobileSDKVideo,
        documentationURL: 'https://github.com/MatiFace/mati-global-id-sdk/blob/master/Integration_iOS.md',
      },
      {
        id: TabID.reactNative,
        imageComponent: (<InformationImage />),
        videoURL: 'https://s3.eu-central-1.amazonaws.com/io.mati.sharedfiles/Mati+Mobile+SDKs.mp4',
        videoCover: mobileSDKVideo,
        documentationURL: 'https://github.com/MatiFace/react-native-mati-global-id-sdk',
      },
      {
        id: TabID.xamarin,
        imageComponent: (<InformationImage />),
        videoURL: 'https://s3.eu-central-1.amazonaws.com/io.mati.sharedfiles/Mati+Mobile+SDKs.mp4',
        videoCover: mobileSDKVideo,
        documentationURL: 'https://github.com/MatiFace/MatiXamarinIntegration',
      },
      {
        id: TabID.cordova,
        imageComponent: (<InformationImage />),
        videoURL: 'https://s3.eu-central-1.amazonaws.com/io.mati.sharedfiles/Mati+Mobile+SDKs.mp4',
        videoCover: mobileSDKVideo,
        documentationURL: 'https://github.com/MatiFace/MatiGlobalIDSDKCordovaPlugin',
      },
      {
        id: TabID.cordovaIonic,
        imageComponent: (<InformationImage />),
        videoURL: 'https://s3.eu-central-1.amazonaws.com/io.mati.sharedfiles/Mati+Mobile+SDKs.mp4',
        videoCover: mobileSDKVideo,
        documentationURL: 'https://github.com/MatiFace/MatiGlobalIDSDKCordovaPlugin',
      },
    ];
  }, []);

  return (
    <>
      {pagesData()
        .map(({
          id,
          videoURL,
          videoCover,
          documentationURL,
          imageComponent,
          childComponent,
        }) => (
          <Box key={id}>
            {id === selectedPage && (
              <>
                {documentationURL && (
                  <Box mb={4}>
                    <GithubDocumentationBanner tabId={id} documentationURL={documentationURL} platform={intl.formatMessage({ id: `forDevs.sideMenu.${id}` })} />
                  </Box>
                )}
                <Typography variant="subtitle2" gutterBottom>{intl.formatMessage({ id: `forDevs.informationPage.${id}.header` })}</Typography>
                <Box mb={2} color="common.black75">{intl.formatMessage({ id: `forDevs.informationPage.${id}.subheader` })}</Box>
                <Box mb={4}>
                  {imageComponent}
                </Box>
                {childComponent && (
                  <Box pt={4} mb={4} borderTop={1} borderColor="common.black7">
                    {childComponent}
                  </Box>
                )}
                <Box pt={4} borderTop={1} borderColor="common.black7">
                  <VideoExplainer videoCover={videoCover} videoURL={videoURL} tabId={id} />
                </Box>
              </>
            )}
          </Box>
        ))}
    </>
  );
}
