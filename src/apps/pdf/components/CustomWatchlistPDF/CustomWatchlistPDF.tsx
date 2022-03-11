import { Image, Text, View } from '@react-pdf/renderer';
import { getCustomWatchlistStepExtra } from 'apps/CustomWatchlist/models/CustomWatchlist.models';
import { useFormatMessage } from 'apps/intl';
import { WarningTypes } from 'apps/ui';
import { IStep, StepStatus, VerificationStepTypes } from 'models/Step.model';
import React, { useMemo } from 'react';
import { IconStatuses } from '../../assets';
import { commonStyles } from '../../PDF.styles';
import { styles } from './CustomWatchlistPDF.styles';
import { CheckStepDetailsEntryPDF } from '../CheckStepPDF/CheckStepDetailsEntryPDF';
import { WarningPDF } from '../WarningPDF/WarningPDF';

export function CustomWatchlistPDF({ steps }: {
  steps: IStep[];
 }) {
  const formatMessage = useFormatMessage();
  const step = useMemo(() => getCustomWatchlistStepExtra(steps.find((dataStep) => dataStep.id === VerificationStepTypes.CustomWatchlistsValidation)), [steps]);

  if (!step) {
    return null;
  }

  if (step?.checkStatus === StepStatus.Checking) {
    return (
      <View style={commonStyles.paper}>
        <Text style={[commonStyles.titleBoldMain, commonStyles.mb15]}>{formatMessage('CustomWatchlist.card.title')}</Text>
        <View style={commonStyles.mt1}>
          <WarningPDF
            type={WarningTypes.Checking}
            label={formatMessage(`SecurityCheckStep.customWatchlist.${step.checkStatus}`)}
          />
        </View>
      </View>
    );
  }

  if (!step?.data && step?.checkStatus === StepStatus.Failure) {
    return (
      <View style={commonStyles.paper}>
        <Text style={[commonStyles.titleBoldMain, commonStyles.mb15]}>{formatMessage('CustomWatchlist.card.title')}</Text>
        <View style={commonStyles.mt1}>
          <WarningPDF
            type={WarningTypes.Error}
            label={formatMessage(`SecurityCheckStep.${step.error.code}`, { defaultMessage: formatMessage('SecurityCheckStep.system.internalError.message') })}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={commonStyles.paper}>
      <Text style={[commonStyles.titleBoldMain, commonStyles.mb15]}>{formatMessage('CustomWatchlist.card.title')}</Text>
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
              {formatMessage('CustomWatchlist.verification.step.watchlist.matchFound', { messageValues: { watchlistName: stepWatchlist.watchlist.name } })}
            </Text>
          ) : (
            <Text style={styles.value}>
              {formatMessage('CustomWatchlist.verification.step.watchlist.noMatchFound', { messageValues: { watchlistName: stepWatchlist.watchlist.name } })}
            </Text>
          )}
          {stepWatchlist.searchParams && (
            <View style={{ ...styles.marginTop5, ...styles.valueBox }}>
              <View style={styles.flexRow}>
                <View style={styles.flexRowItem50}>
                  <Text style={styles.title}>{formatMessage('CustomWatchlist.verification.step.subtitle.searchParams')}</Text>
                </View>
                {stepWatchlist?.searchResult && (
                  <View style={styles.flexRowItem50}>
                    <Text style={styles.title}>{formatMessage('CustomWatchlist.verification.step.subtitle.searchResult')}</Text>
                  </View>
                )}
              </View>
              <View style={styles.flexColumn}>
                {Object.entries(stepWatchlist.searchParams).map((value) => (
                  <View
                    style={{ ...styles.flexRow, ...(stepWatchlist?.searchResult ? styles.flexRowItem100 : styles.flexRowItem50) }}
                    key={value[0]}
                  >
                    <View style={styles.flexRowItem50}>
                      <CheckStepDetailsEntryPDF label={value[0]} value={value[1]} />
                    </View>
                    {stepWatchlist?.searchResult && (
                    <View style={styles.flexRowItem50}>
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
  );
}
