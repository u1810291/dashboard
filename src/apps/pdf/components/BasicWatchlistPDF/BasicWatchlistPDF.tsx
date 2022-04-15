import { Image, Text, View } from '@react-pdf/renderer';
import { useFormatMessage } from 'apps/intl';
import { WarningTypes } from 'apps/ui';
import { getStepExtra, IStep, StepStatus, VerificationStepTypes } from 'models/Step.model';
import React, { useMemo } from 'react';
import { BasicWatchlistStepType } from 'apps/Aml/models/Aml.model';
import { IconStatuses } from '../../assets';
import { commonStyles } from '../../PDF.styles';
import { styles } from './BasicWatchlistPDF.styles';
import { CheckStepDetailsEntryPDF } from '../CheckStepPDF/CheckStepDetailsEntryPDF';
import { WarningPDF } from '../WarningPDF/WarningPDF';

export function BasicWatchlistPDF({ steps }: {
  steps: IStep[];
 }) {
  const formatMessage = useFormatMessage();
  const step = useMemo<BasicWatchlistStepType>(() => getStepExtra(steps.find((dataStep) => dataStep.id === VerificationStepTypes.BasicWatchlistsValidation)), [steps]);

  if (!step) {
    return null;
  }

  if (step?.checkStatus === StepStatus.Checking) {
    return (
      <View style={commonStyles.paper}>
        <Text style={[commonStyles.titleBoldMain, commonStyles.mb15]}>{formatMessage('BasicWatchlist.pdf.title')}</Text>
        <View style={commonStyles.mt1}>
          <WarningPDF
            type={WarningTypes.Notify}
            label={formatMessage(`SecurityCheckStep.basicWatchlist.${step.checkStatus}`)}
            isLabelColored
          />
        </View>
      </View>
    );
  }

  if (!step?.data && step?.checkStatus === StepStatus.Failure) {
    return (
      <View style={commonStyles.paper}>
        <Text style={[commonStyles.titleBoldMain, commonStyles.mb15]}>{formatMessage('BasicWatchlist.pdf.title')}</Text>
        <View style={commonStyles.mt1}>
          <WarningPDF
            type={WarningTypes.Error}
            label={formatMessage(`SecurityCheckStep.${step.error.code}.message`, { defaultMessage: formatMessage('SecurityCheckStep.system.internalError.message') })}
          />
        </View>
      </View>
    );
  }

  const hasErrors = step?.error && step.data.some((stepWatchlist) => !!stepWatchlist.searchResult);
  return (
    <View style={commonStyles.paper}>
      <Text style={[commonStyles.titleBoldMain, commonStyles.mb15]}>{formatMessage('BasicWatchlist.pdf.title')}</Text>
      <View style={commonStyles.mb20}>
        <WarningPDF
          type={hasErrors ? WarningTypes.Error : WarningTypes.Success}
          title={hasErrors ? (
            formatMessage(`SecurityCheckStep.${step.error.code}.message`, { defaultMessage: formatMessage('SecurityCheckStep.system.internalError.message') })
          ) : (
            formatMessage('BasicWatchlist.verification.noerror.title')
          )}
          label={hasErrors && formatMessage('BasicWatchlist.verification.error.description')}
        />
      </View>
      <View style={styles.wrap}>
        {step.data?.map((stepWatchlist) => (
          <View key={stepWatchlist.watchlist.id}>
            <View style={commonStyles.labelContainer} wrap={false}>
              <Image style={commonStyles.labelIcon} src={IconStatuses[stepWatchlist.searchResult ? StepStatus.Failure : StepStatus.Success]} />
              <Text style={commonStyles.label}>
                {stepWatchlist.watchlist.name}
              </Text>
            </View>

            {stepWatchlist?.searchResult ? (
              <Text style={styles.value}>
                {formatMessage('Watchlist.verification.step.watchlist.matchFound', { messageValues: { watchlistName: stepWatchlist.watchlist.name } })}
              </Text>
            ) : (
              <Text style={styles.value}>
                {formatMessage('Watchlist.verification.step.watchlist.noMatchFound', { messageValues: { watchlistName: stepWatchlist.watchlist.name } })}
              </Text>
            )}
            {stepWatchlist.searchParams && (
              <View style={{ ...styles.marginTop5, ...styles.valueBox }}>
                <View style={styles.flexRow}>
                  <View style={styles.flexRowItem50}>
                    <Text style={styles.title}>{formatMessage('Watchlist.verification.step.subtitle.searchParams')}</Text>
                  </View>
                  {stepWatchlist?.searchResult && (
                    <View style={styles.flexRowItem50}>
                      <Text style={styles.title}>{formatMessage('Watchlist.verification.step.subtitle.searchResult')}</Text>
                    </View>
                  )}
                </View>
                <View style={styles.flexColumn}>
                  {Object.entries(stepWatchlist.searchParams).map((value) => (
                    <View
                      style={{ ...styles.flexRow, ...(stepWatchlist?.searchResult ? styles.flexRowItem100 : styles.flexRowItem50) }}
                      key={value[0]}
                    >
                      <View style={{ ...styles.flexRowItem50, ...styles.pr5 }}>
                        <CheckStepDetailsEntryPDF label={value[0]} value={value[1]} />
                      </View>
                      {stepWatchlist?.searchResult && (
                        <View style={{ ...styles.flexRowItem50, ...styles.pr5 }}>
                          {stepWatchlist.searchResult[value[0]] ? (
                            <CheckStepDetailsEntryPDF label={value[0]} value={stepWatchlist.searchResult[value[0]]} />
                          ) : (
                            <Text>
                              -
                            </Text>
                          )}
                        </View>
                      )}
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        ))}
      </View>
    </View>
  );
}
