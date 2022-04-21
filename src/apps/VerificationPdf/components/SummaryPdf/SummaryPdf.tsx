import { Document, Text, View } from '@react-pdf/renderer';
import { useFormatMessage } from 'apps/intl';
import { DateFormat, utcToLocalFormat } from 'lib/date';
import { getIdentityStatusExplanation, getIdentityStatusLabel, getStatusById } from 'models/Status.model';
import { IVerificationWorkflow } from 'models/Verification.model';
import React from 'react';
import { commonStyles } from '../../models/PdfStyles.model';
import { StatusesColorMap } from '../../models/Pdf.model';
import { styles } from './SummaryPdf.styles';

export function SummaryPdf({ verification }: {
  verification: IVerificationWorkflow;
}) {
  const formatMessage = useFormatMessage();
  const status = getStatusById(verification.verificationStatus);
  const statusWithColors = StatusesColorMap.find((item) => item.id === verification.verificationStatus);
  if (!verification) {
    return null;
  }

  return (
    <Document title={`Verification ${verification.id}`} author="MetaMap www.metamap.com">
      <View style={commonStyles.paper}>
        <Text style={[commonStyles.titleBoldMain, commonStyles.mb15]}>
          {formatMessage('identity.summary.title')}
        </Text>
        <View style={styles.wrapper}>
          {/* verification status */}
          <View style={styles.item}>
            <View style={[styles.statusWrapper, { backgroundColor: statusWithColors?.color, color: statusWithColors?.textColor }]}>
              <Text style={styles.text}>
                {formatMessage('statusSelect.status')}
              </Text>
              <Text style={styles.title}>
                {formatMessage(getIdentityStatusLabel(status?.id))}
              </Text>
              <Text style={styles.text}>
                {formatMessage(getIdentityStatusExplanation(status?.id))}
              </Text>
            </View>
          </View>
          {/* verification date and number */}
          <View style={styles.item}>
            <View style={commonStyles.mb15}>
              <Text style={commonStyles.data}>
                {utcToLocalFormat(verification?.createdAt, DateFormat.DateTime)}
              </Text>
              <Text style={commonStyles.title}>
                {formatMessage('identity.summary.date')}
              </Text>
            </View>
            <View>
              <Text style={commonStyles.data}>
                {verification.id}
              </Text>
              <Text style={commonStyles.title}>
                {formatMessage('identity.summary.number')}
              </Text>
            </View>
          </View>
          {/* workflow name */}
          <View style={styles.item}>
            {!!verification?.workflow?.name && (
            <View style={commonStyles.mb15}>
              <Text style={commonStyles.data}>
                {verification.workflow.name}
              </Text>
              <Text style={commonStyles.title}>
                {formatMessage('identity.summary.flow')}
              </Text>
            </View>
            )}
          </View>
        </View>
      </View>
    </Document>
  );
}
