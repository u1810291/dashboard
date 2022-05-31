import { Text, View, Image } from '@react-pdf/renderer';
import { WarningTypes } from 'apps/ui';
import { useFormatMessage } from 'apps/intl';
import { DocumentSides, getDocumentSideLabel, VerificationDocument } from 'models/Document.model';
import React from 'react';
import { getMediaURL } from 'lib/client/media';
import { commonStyles } from '../../PDF.styles';
import { CheckResultLogoPDF } from '../CheckResultLogoPDF/CheckResultLogoPDF';
import { CheckStepPDF } from '../CheckStepPDF/CheckStepPDF';
import { DocumentReadingStepPDF } from '../DocumentReadingStepPDF/DocumentReadingStepPDF';
import { PremiumAmlWatchlistsStepDetailsPDF } from '../PremiumAmlWatchlistsStepDetailsPDF/PremiumAmlWatchlistsStepDetailsPDF';
import { WarningPDF } from '../WarningPDF/WarningPDF';
import { styles } from './DocumentStepPDF.styles';
import { GovCheckTextPDF } from '../GovCheckTextPDF/GovCheckTextPDF';

export function DocumentStepPDF({ document, documentIndex }: {
  document: VerificationDocument;
  documentIndex: number;
}) {
  const formatMessage = useFormatMessage();

  const { name, fields, securityCheckSteps, documentFailedCheckSteps, govChecksSteps, isSanctioned, documentReadingStep, onReading, documentStatus, premiumAmlWatchlistsStep, photos, areTwoSides, documentImages = [] } = document;

  const documentPhotosImages = [...documentImages, ...photos];
  return (
    <View style={commonStyles.paper}>
      <View style={commonStyles.mb15}>
        <Text style={[commonStyles.titleBold, commonStyles.mb05]}>{formatMessage('DocumentStep.Data.title', { messageValues: { index: documentIndex + 1 } })}</Text>
        <View>
          <View style={styles.textWrapper}>
            <Text style={[commonStyles.titleBold, commonStyles.mr05]}>
              {formatMessage('DocumentStep.Data.subtitle')}
            </Text>
            <Text style={commonStyles.title}>
              {name}
            </Text>
          </View>
        </View>
      </View>

      {isSanctioned && (
        <View style={commonStyles.mb15}>
          <WarningPDF
            type={WarningTypes.Error}
            label={formatMessage('SanctionCheck.title')}
          />
        </View>
      )}

      <View>
        {/* images */}
        {documentPhotosImages?.length !== 0 && (
          <View style={styles.images}>
            {areTwoSides ? (
              <View style={styles.imagesHorizontal}>
                {documentPhotosImages.map((photo, index) => (
                  <View key={index} style={styles.imageHorizontal}>
                    <Image style={styles.image} src={getMediaURL(photo)} />
                    <Text style={styles.subtitle}>
                      {formatMessage(getDocumentSideLabel(index === 0 ? DocumentSides.Front : DocumentSides.Back))}
                    </Text>
                  </View>
                ))}
              </View>
            ) : (
              documentPhotosImages.map((photo) => (
                <View key={photo} style={styles.imageWrapper}>
                  <Image style={[styles.image, styles.imageSingle]} src={getMediaURL(photo)} />
                </View>
              ))
            )}
          </View>
        )}

        {/* data */}
        <View style={[styles.itemWrapper, commonStyles.mb0]}>
          {documentReadingStep && (
            <DocumentReadingStepPDF
              step={documentReadingStep}
              fields={fields}
              onReading={onReading}
            />
          )}
        </View>
        <View style={styles.itemWrapper}>
          {securityCheckSteps && (
            <View>
              <CheckResultLogoPDF status={documentStatus} />
              <View>
                {documentFailedCheckSteps.map((step) => (
                  <CheckStepPDF step={step} key={step.id} />
                ))}
                {securityCheckSteps.map((step) => (
                  <CheckStepPDF step={step} key={step.id} />
                ))}
                {govChecksSteps.map((step) => (
                  <CheckStepPDF step={step} title={step.title} key={step.id}>
                    <GovCheckTextPDF step={step} isShowError={step.isShowError} />
                  </CheckStepPDF>
                ))}
                {premiumAmlWatchlistsStep
                  && (
                    <PremiumAmlWatchlistsStepDetailsPDF step={premiumAmlWatchlistsStep} />
                  )}
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
