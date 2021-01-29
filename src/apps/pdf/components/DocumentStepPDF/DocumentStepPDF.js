import { useDocumentTitle } from 'apps/identity/hooks/document.hook';
import { DocumentSidesOrder, getDocumentSideLabel } from 'models/Document.model';
import React from 'react';
import { useIntl } from 'react-intl';
import { Image, Text, View } from '@react-pdf/renderer';
import { styles } from './DocumentStepPDF.styles';
import { commonStyles } from '../../PDF.styles';
import { DocumentReadingStepPDF } from '../DocumentReadingStepPDF/DocumentReadingStepPDF';
import { CheckStepPDF } from '../CheckStepPDF/CheckStepPDF';
import { CheckResultLogoPDF } from '../CheckResultLogoPDF/CheckResultLogoPDF';
import { PremiumAmlWatchlistsStepDetailsPDF } from '../PremiumAmlWatchlistsStepDetailsPDF/PremiumAmlWatchlistsStepDetailsPDF';
import { WarningTypes } from '../../../ui/models/Warning.model';
import { WarningPDF } from '../WarningPDF/WarningPDF';
import { getMediaURL } from '../../../../lib/client/media';

export function DocumentStepPDF({ document, documentIndex }) {
  const intl = useIntl();
  const title = useDocumentTitle(document);

  const { fields, securityCheckSteps, documentFailedCheckSteps, govChecksSteps, isSanctioned, documentReadingStep, onReading, documentStatus, areTwoSides, documentSides, premiumAmlWatchlistsStep } = document;

  return (
    <View style={commonStyles.paper}>
      <View style={commonStyles.mb15}>
        <Text style={[commonStyles.titleBold, commonStyles.mb05]}>{intl.formatMessage({ id: 'DocumentStep.Data.title' }, { index: documentIndex + 1 })}</Text>
        <View>
          <View style={styles.textWrapper}>
            <Text style={[commonStyles.titleBold, commonStyles.mr05]}>
              {intl.formatMessage({ id: 'DocumentStep.Data.subtitle' })}
            </Text>
            <Text style={commonStyles.title}>{title}</Text>
          </View>
        </View>
      </View>

      {isSanctioned && (
        <View style={commonStyles.mb15}>
          <WarningPDF
            type={WarningTypes.Error}
            label={intl.formatMessage({ id: 'SanctionCheck.title' })}
          />
        </View>
      )}

      <View>
        {/* images */}
        <View style={styles.images}>
          {!areTwoSides ? (
            <>
              {document.photos && document.photos.length > 0 && document.photos.map((photo) => (
                <View key={photo} style={styles.imageWrapper}>
                  <Image style={[styles.image, styles.imageSingle]} src={getMediaURL(photo)} />
                </View>
              ))}
            </>
          ) : (
            <View style={styles.imagesHorizontal}>
              {DocumentSidesOrder.map((side) => {
                const documentSideIndex = documentSides.indexOf(side);
                if (documentSideIndex > -1) {
                  return (
                    <View key={document.photos[documentSideIndex]} style={styles.imageHorizontal}>
                      <Image style={styles.image} src={getMediaURL(document.photos[documentSideIndex])} />
                      <Text style={styles.subtitle}>
                        {intl.formatMessage({ id: getDocumentSideLabel(side) })}
                      </Text>
                    </View>
                  );
                }
                return null;
              })}
            </View>
          )}
        </View>
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
                  <CheckStepPDF step={step} key={step.id} isGovCheck />
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
