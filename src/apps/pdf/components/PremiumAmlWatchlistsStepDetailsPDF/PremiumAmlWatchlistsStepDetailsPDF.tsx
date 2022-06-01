import { Image, Text, View } from '@react-pdf/renderer';
import React from 'react';
import { useFormatMessage } from 'apps/intl';
import { IStep, StepStatus } from 'models/Step.model';
import { CheckStepDetailsEntryPDF } from '../CheckStepPDF/CheckStepDetailsEntryPDF';
import { commonStyles } from '../../PDF.styles';
import { styles } from './PremiumAmlWatchlistsStepDetailsPDF.styles';
import { IconStatuses } from '../../assets';

export function PremiumAmlWatchlistsStepDetailsPDF({ step }: { step: IStep }) {
  const formatMessage = useFormatMessage();
  const { checkStatus, id: stepId, error, data } = step;

  return (
    <View style={[styles.card, commonStyles.mb05]}>
      <View style={commonStyles.labelContainer} wrap={false}>
        <Image style={commonStyles.labelIcon} src={IconStatuses[checkStatus]} />
        <Text style={commonStyles.label}>
          {formatMessage(`SecurityCheckStep.${stepId}.title`, { defaultMessage: formatMessage(`SecurityCheckStep.${checkStatus}`) })}
        </Text>
      </View>
      {error && (
        <View style={styles.value}>
          <Text style={checkStatus === StepStatus.Failure && styles.redText}>
            {formatMessage(checkStatus === StepStatus.Failure ? `SecurityCheckStep.${error.code}.message` : 'SecurityCheckStep.premiumAmlWatchlists.incomplete')}
          </Text>
        </View>
      )}
      {data && (
        <View style={styles.value}>
          <CheckStepDetailsEntryPDF label="nameSearched" value={data.nameSearched} />
          {Boolean(data.countriesSearched?.length) && (
            <CheckStepDetailsEntryPDF label="countriesSearched" value={data.countriesSearched.join(', ')} />
          )}
          {data.dateOfBirth && (
            <CheckStepDetailsEntryPDF label="dateOfBirth" value={data.dateOfBirth} />
          )}
          <CheckStepDetailsEntryPDF label="matchType" value={formatMessage(`SecurityCheckStep.premiumAmlWatchlists.match.${data.matchType}`)} />
        </View>
      )}
    </View>
  );
}
