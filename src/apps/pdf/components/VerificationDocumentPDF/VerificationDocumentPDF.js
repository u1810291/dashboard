import { useIntl } from 'react-intl';
import React from 'react';
import { Image, Text, View } from '@react-pdf/renderer';
import { styles } from './VerificationDocumentPDF.styles';
import IconEmpty from '../../assets/icon-empty-photo.png';
import { VerificationCheckCardPDF } from '../VerificationCheckCardPDF/VerificationCheckCardPDF';
import { VerificationSummaryChecksContainerPDF } from '../VerificationSummaryChecksContainerPDF/VerificationSummaryChecksContainerPDF';
import { VerificationSummaryTitlePDF } from '../VerificationSummaryTitlePDF/VerificationSummaryTitlePDF';
import { useDocumentTitle } from '../../../identity/hooks/document.hook';
import { getMediaURL } from '../../../../lib/client/media';

export function VerificationDocumentPDF({ document, documentIndex }) {
  const intl = useIntl();
  const title = useDocumentTitle(document);
  const { photos = [], securityCheckSteps, documentFailedCheckSteps, govChecksSteps, documentStatus } = document; // use these checks for children component

  const allSteps = [...documentFailedCheckSteps, ...securityCheckSteps, ...govChecksSteps];

  return (
    <VerificationCheckCardPDF
      titleComponent={(
        <VerificationSummaryTitlePDF status={documentStatus} documentIndex={documentIndex}>
          {intl.formatMessage({ id: 'identity.summary.title.document' })}
          {' '}
          {documentIndex + 1}
          {' '}
          (
          {title}
          )
        </VerificationSummaryTitlePDF>
      )}
      bottomComponent={(
        <VerificationSummaryChecksContainerPDF steps={allSteps} />
      )}
    >
      <View style={styles.wrapper}>
        {!photos.length && (
          <View style={styles.imageEmptyWrapper}>
            <Image style={styles.imageEmpty} src={IconEmpty} />
            <Text style={styles.emptyCaption}>{intl.formatMessage({ id: 'identity.summary.empty.img' })}</Text>
          </View>
        )}

        {photos.length === 1 && (
          <View style={styles.imageWrapper}>
            <Image style={styles.imageSingle} src={getMediaURL(photos[0])} />
          </View>
        )}

        {photos.length === 2 && (
          <View style={styles.imageWrapper}>
            {photos.map((photo) => <Image style={styles.imageDouble} src={getMediaURL(photo)} key={photo} />)}
          </View>
        )}
      </View>
    </VerificationCheckCardPDF>
  );
}
