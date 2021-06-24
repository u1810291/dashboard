import { Image, Text, View } from '@react-pdf/renderer';
import React from 'react';
import { useIntl } from 'react-intl';
import { StepStatus } from 'models/Step.model';
import { CheckStepDetailsEntryPDF } from '../CheckStepPDF/CheckStepDetailsEntryPDF';
import { commonStyles } from '../../PDF.styles';
import { styles } from './PremiumAmlWatchlistsStepDetailsPDF.styles';
import { IconStatuses } from '../../assets';

export function PremiumAmlWatchlistsStepDetailsPDF({ step }) {
  const intl = useIntl();

  return (
    <View style={[styles.card, commonStyles.mb05]}>
      <View style={commonStyles.labelContainer} wrap={false}>
        <Image style={commonStyles.labelIcon} src={IconStatuses[step.checkStatus]} />
        <Text style={commonStyles.label}>
          {intl.formatMessage({
            id: `SecurityCheckStep.${step.id}.title`,
            defaultMessage: intl.formatMessage({ id: `SecurityCheckStep.${step.checkStatus}` }),
          })}
        </Text>
      </View>
      {step.error && (
        <View style={styles.value}>
          <Text style={step.checkStatus === StepStatus.Failure ? styles.redText : ''}>
            {intl.formatMessage({
              id: step.checkStatus === StepStatus.Failure ? `SecurityCheckStep.${step.error.code}.message` : 'SecurityCheckStep.premiumAmlWatchlists.incomplete',
            })}
          </Text>
        </View>
      )}
      {step.data && (
        <View style={styles.value}>
          <CheckStepDetailsEntryPDF label="nameSearched" value={step.data.nameSearched} />
          {step.data.dateOfBirth && (
            <CheckStepDetailsEntryPDF label="dateOfBirth" value={step.data.dateOfBirth} />
          )}
          <CheckStepDetailsEntryPDF label="matchType" value={intl.formatMessage({ id: `SecurityCheckStep.premiumAmlWatchlists.match.${step.data.matchType}` })} />
        </View>
      )}
    </View>
  );
}
