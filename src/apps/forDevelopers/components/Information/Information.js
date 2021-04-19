import { Box, Typography } from '@material-ui/core';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { InformationImageTypes, TabID } from '../../models/ForDevelopers.model';
import { DirectLinkCopy } from '../DirectLinkCopy/DirectLinkCopy';
import { GithubDocumentationBanner } from '../GithubDocumentationBanner/GithubDocumentationBanner';
import { InformationImage } from '../InformationImage/InformationImage';
import { VideoExplainer } from '../VideoExplainer/VideoExplainer';
import { WebCodeSnippet } from '../WebCodeSnippet/WebCodeSnippet';

export function Information({ selectedPage }) {
  const intl = useIntl();
  const pagesData = useCallback(() => {
    const mobileSDKVideo = 'https://s3.eu-central-1.amazonaws.com/io.mati.sharedfiles/Mati%2BMobile%2BSDKs.png';
    return [
      {
        id: TabID.Api,
        imageType: InformationImageTypes.Api,
        videoURL: 'https://s3.eu-central-1.amazonaws.com/io.mati.sharedfiles/Mati+API.mp4',
        videoCover: 'https://s3.eu-central-1.amazonaws.com/io.mati.sharedfiles/Mati%2BAPI.png',
        documentationURL: 'https://docs.getmati.com/#api-overview',
      },
      {
        id: TabID.Web,
        videoURL: 'https://s3.eu-central-1.amazonaws.com/io.mati.sharedfiles/Mati+Web+SDK.mp4',
        imageType: InformationImageTypes.Web,
        videoCover: 'https://s3.eu-central-1.amazonaws.com/io.mati.sharedfiles/Mati%2BWeb%2BSDK.png',
        documentationURL: 'https://docs.getmati.com/#web-sdk-overview',
        childComponent: (<WebCodeSnippet />),
      },
      {
        id: TabID.DirectLink,
        imageType: InformationImageTypes.DirectLink,
        videoURL: 'https://s3.eu-central-1.amazonaws.com/io.mati.sharedfiles/Mati+Direct+Link.mp4',
        videoCover: 'https://s3.eu-central-1.amazonaws.com/io.mati.sharedfiles/Mati%2BDirect%2BLink.png',
        childComponent: (<DirectLinkCopy />),
      },
      {
        id: TabID.Android,
        imageType: InformationImageTypes.Android,
        videoURL: 'https://s3.eu-central-1.amazonaws.com/io.mati.sharedfiles/Mati+Mobile+SDKs.mp4',
        videoCover: mobileSDKVideo,
        documentationURL: 'https://github.com/MatiFace/mati-global-id-sdk-integration-android',
      },
      {
        id: TabID.Ios,
        imageType: InformationImageTypes.Ios,
        videoURL: 'https://s3.eu-central-1.amazonaws.com/io.mati.sharedfiles/Mati+Mobile+SDKs.mp4',
        videoCover: mobileSDKVideo,
        documentationURL: 'https://github.com/MatiFace/mati-global-id-sdk/blob/master/Integration_iOS.md',
      },
      {
        id: TabID.ReactNative,
        videoURL: 'https://s3.eu-central-1.amazonaws.com/io.mati.sharedfiles/Mati+Mobile+SDKs.mp4',
        videoCover: mobileSDKVideo,
        documentationURL: 'https://github.com/MatiFace/react-native-mati-global-id-sdk',
      },
      {
        id: TabID.Xamarin,
        videoURL: 'https://s3.eu-central-1.amazonaws.com/io.mati.sharedfiles/Mati+Mobile+SDKs.mp4',
        videoCover: mobileSDKVideo,
        documentationURL: 'https://github.com/MatiFace/MatiXamarinIntegration',
      },
      {
        id: TabID.Cordova,
        videoURL: 'https://s3.eu-central-1.amazonaws.com/io.mati.sharedfiles/Mati+Mobile+SDKs.mp4',
        videoCover: mobileSDKVideo,
        documentationURL: 'https://github.com/MatiFace/MatiGlobalIDSDKCordovaPlugin',
      },
      {
        id: TabID.CordovaIonic,
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
          imageType,
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
                  <InformationImage type={imageType} />
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
