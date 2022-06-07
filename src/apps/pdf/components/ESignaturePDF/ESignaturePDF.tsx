import { Image, Text, View } from '@react-pdf/renderer';
import { getMediaURL } from 'lib/client/media';
import React from 'react';
import { useFormatMessage } from 'apps/intl';
import { getStepExtra, IStep } from 'models/Step.model';
import { VerificationPatternTypes } from 'models/VerificationPatterns.model';
import { ESignatureFields, ESignatureStep } from 'models/ESignature.model';
import { BoxBorderedPDF } from '../BoxBorderedPDF/BoxBorderedPDF';
import { commonStyles } from '../../PDF.styles';
import { styles } from './ESignaturePDF.styles';
import { CheckStepDetailsEntryPDF } from '../CheckStepPDF/CheckStepDetailsEntryPDF';
import { DataGeneratingPDF } from '../DataGeneratingPDF/DataGeneratingPDF';

export function ESignaturePDF({ steps }: {
  steps: IStep[];
}) {
  const formatMessage = useFormatMessage();

  const step: ESignatureStep = getStepExtra(steps.find((dataStep) => dataStep.id === VerificationPatternTypes.ESignatureDocuments));

  if (!step) {
    return null;
  }

  return (
    <View style={commonStyles.paper}>
      <View style={commonStyles.mb20}>
        <Text style={[commonStyles.titleBoldMain, commonStyles.mb15]}>{formatMessage('ESignature.step.title')}</Text>
      </View>
      {step.error && (
        <BoxBorderedPDF>
          <View style={commonStyles.labelContainer} wrap={false}>
            <Text style={commonStyles.label}>
              {formatMessage(`Error.${step.error?.code}`, { defaultMessage: formatMessage('Error.common') })}
            </Text>
          </View>
        </BoxBorderedPDF>
      )}
      {step.data?.readDetails?.length !== 0 && (
        <View style={commonStyles.mt5}>
          <View style={commonStyles.container}>
            {step.data.readDetails.map((details) => (
              <View key={details.documentId} style={commonStyles.mb1}>
                <BoxBorderedPDF>
                  <View style={[commonStyles.container, commonStyles.column]}>
                    {ESignatureFields.map((fieldName) => (
                      <View key={fieldName} style={commonStyles.mb1}>
                        <CheckStepDetailsEntryPDF label={fieldName} value={details[fieldName]} />
                      </View>
                    ))}
                    {details.pdfDocument.documentImages.length === 0 && (
                      <View>
                        <DataGeneratingPDF text={formatMessage('ESignature.verification.documentIsGeneratingPDF')} />
                      </View>
                    )}
                    {details.pdfDocument.documentImages.map((imageUrl, index) => (
                      <View key={index} style={commonStyles.mb1}>
                        <Image style={styles.image} src={getMediaURL(imageUrl)} />
                      </View>
                    ))}
                  </View>
                </BoxBorderedPDF>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}
