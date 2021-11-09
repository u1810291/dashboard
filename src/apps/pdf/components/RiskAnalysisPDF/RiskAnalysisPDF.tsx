import React from 'react';
import { useIntl } from 'react-intl';
import { Text, View, Image } from '@react-pdf/renderer';
import { RiskAnalysisFieldTypes, RiskAnalysisStep } from 'apps/RiskAnalysis/models/RiskAnalysis.model';
import { isNil } from 'lib/isNil';
import { getStepStatus } from 'models/Step.model';
import { styles } from './RiskAnalysisPDF.styles';
import { commonStyles } from '../../PDF.styles';
import { IconStatuses } from '../../assets';
import { CheckStepDetailsEntryPDF } from '../CheckStepPDF/CheckStepDetailsEntryPDF';

interface RiskAnalysisPDFProps {
  step: RiskAnalysisStep;
}

export function RiskAnalysisPDF({ step = {} }: RiskAnalysisPDFProps) {
  const intl = useIntl();
  // @ts-ignore
  const statusCode = getStepStatus(step);
  return (
    <View style={styles.wrapper}>
      <View style={commonStyles.labelContainer} wrap={false}>
        <Image style={commonStyles.labelIcon} src={IconStatuses[statusCode]} />
        <Text style={commonStyles.label}>
          {intl.formatMessage({ id: 'Checks.result.riskAnalysis.title' })}
        </Text>
      </View>
      {step.error && (
        <View>
          <Text>
            {intl.formatMessage({
              id: `Checks.result.riskAnalysis.${step.error.code}`,
              defaultMessage: intl.formatMessage({ id: 'Error.common' }),
            })}
          </Text>
        </View>
      )}
      {step?.data && (
        <View style={styles.stepDetailsContainer}>
          {Object.keys(RiskAnalysisFieldTypes).map((fieldName) => (!isNil(step.data[RiskAnalysisFieldTypes[fieldName]])) && (
            <CheckStepDetailsEntryPDF
              label={RiskAnalysisFieldTypes[fieldName]}
              value={step.data[RiskAnalysisFieldTypes[fieldName]]}
              key={RiskAnalysisFieldTypes[fieldName]}
            />
          ))}
        </View>
      )}
    </View>
  );
}
