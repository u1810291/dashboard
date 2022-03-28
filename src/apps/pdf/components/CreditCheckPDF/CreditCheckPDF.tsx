import { useCreditCheck } from 'apps/CreditCheck';
import { Text, View } from '@react-pdf/renderer';
import React from 'react';
import { useFormatMessage } from 'apps/intl';
import { WarningTypes } from 'apps/ui';
import { creditCheckDisplayOptions } from 'models/CreditCheck.model';
import { commonStyles } from '../../PDF.styles';
import { WarningPDF } from '../WarningPDF/WarningPDF';
import { styles } from './CreditCheckPDF.styles';

export function CreditCheckPDF() {
  const formatMessage = useFormatMessage();
  const { creditDocumentStep, isCheckInProgress, isPostResultPhase, isShowManualCreditCheckButton } = useCreditCheck();

  if (!creditDocumentStep || isShowManualCreditCheckButton) {
    return null;
  }

  if (isCheckInProgress) {
    const messageType = isPostResultPhase ? 'running' : 'waiting';
    return (
      <View style={commonStyles.paper}>
        <Text style={[commonStyles.titleBoldMain, commonStyles.mb15]}>{formatMessage('CreditCheck.creditReport.title')}</Text>
        <View style={commonStyles.mt1}>
          <WarningPDF
            type={WarningTypes.Checking}
            label={formatMessage(`CreditCheck.warning.${messageType}`)}
          />
        </View>
      </View>
    );
  }

  if (creditDocumentStep.error) {
    const { code: errorCode } = creditDocumentStep.error;
    return (
      <View style={commonStyles.paper}>
        <Text style={[commonStyles.titleBoldMain, commonStyles.mb15]}>{formatMessage('CustomWatchlist.card.title')}</Text>
        <View style={commonStyles.mt1}>
          <WarningPDF
            type={WarningTypes.Error}
            label={formatMessage(`CreditCheck.check.${errorCode}.message`, { defaultMessage: formatMessage('SecurityCheckStep.system.internalError.message') })}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={commonStyles.paper}>
      <Text style={[commonStyles.titleBoldMain, commonStyles.mb15]}>{formatMessage('CreditCheck.verification.summary')}</Text>
      <View style={styles.wrapper}>
        {Object.entries(creditDocumentStep.data).map(([key, value]) => {
          if (creditCheckDisplayOptions[creditDocumentStep.id]?.[key]?.hidden) {
            return null;
          }

          return (
            <View key={key} style={styles.inputWrapper}>
              <View style={commonStyles.mb05}>
                <Text style={styles.text}>{value}</Text>
              </View>
              <Text style={commonStyles.title}>
                {formatMessage(`identity.field.${key}`)}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}
