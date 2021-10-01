import { Box, Typography } from '@material-ui/core';
import React from 'react';
import { useIntl } from 'react-intl';
import { TabID, pagesData } from '../../models/ForDevelopers.model';
import { GithubDocumentationBanner } from '../GithubDocumentationBanner/GithubDocumentationBanner';
import { InformationImage } from '../InformationImage/InformationImage';
import { VideoExplainer } from '../VideoExplainer/VideoExplainer';

export function Information({ selectedPage }: {
  selectedPage: TabID;
}) {
  const intl = useIntl();

  return pagesData
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
    ));
}
