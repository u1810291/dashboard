import React from 'react';
import { useIntl } from 'react-intl';
import { get } from 'lodash';
import { Text, View } from '@react-pdf/renderer';
import { getDevicePlatformType, PlatformTypes } from 'models/DeviceCheck.model';
import { VerificationWithExtras } from 'models/VerificationOld.model';
import { StatusSelectorPDF } from '../StatusSelectorPDF/StatusSelectorPDF';
import { styles } from './VerificationSummaryPDF.styles';
import { commonStyles } from '../../PDF.styles';
import { VerificationDateAndNumberPDF } from '../VerificationDateAndNumberPDF/VerificationDateAndNumberPDF';
import { VerificationFlowPDF } from '../VerificationFlowPDF/VerificationFlowPDF';
import { VerificationBioCheckSummaryPDF } from '../VerificationBioCheckSummaryPDF/VerificationBioCheckSummaryPDF';
import { VerificationSourcePDF } from '../VerificationSourcePDF/VerificationSourcePDF';
import { VerificationDocumentPDF } from '../VerificationDocumentPDF/VerificationDocumentPDF';
import { VerificationLocationIntelligencePDF } from '../VerificationLocationIntelligencePDF/VerificationLocationIntelligencePDF';
import { VerificationDeviceCheckPDF } from '../VerificationDeviceCheckPDF/VerificationDeviceCheckPDF';

export function VerificationSummaryPDF({ identity }: { identity: VerificationWithExtras }) {
  const intl = useIntl();

  const { ipCheck, biometric, deviceFingerprint } = identity;

  // TODO @vladislav.snimshchikov: remove get(), when pdf will be adapted for Verification instead Identity
  const verificationFlowName = identity?.flow?.name || get(identity, '_embedded.verification.flow.name', null);
  const platformType = getDevicePlatformType(deviceFingerprint);

  return (
    <View style={commonStyles.paper}>
      <Text style={[commonStyles.titleBoldMain, commonStyles.mb15]}>
        {intl.formatMessage({ id: 'identity.summary.title' })}
      </Text>
      <View style={styles.wrapper}>
        <View style={styles.item}>
          <StatusSelectorPDF statusId={identity.status} />
        </View>
        <View style={styles.item}>
          <VerificationDateAndNumberPDF date={identity?.createdAt} number={identity.id} />
        </View>
        <View style={styles.item}>
          {!!verificationFlowName && <VerificationFlowPDF flowId={verificationFlowName} />}
          <VerificationSourcePDF platformType={platformType} />
        </View>
      </View>
      <View style={styles.wrapper}>
        {/* Biometrics Check */}
        <View>
          <VerificationBioCheckSummaryPDF identity={identity} biometric={biometric} />
        </View>

        {/* Documents Checks */}
        {identity.documents.map((doc, index) => (
          <View key={doc.country + doc.type}>
            <VerificationDocumentPDF document={doc} documentIndex={index} />
          </View>
        ))}

        {/* Additional Checks */}
        {ipCheck && !ipCheck.error && ipCheck.data && (
        <View>
          <VerificationLocationIntelligencePDF ipCheck={ipCheck} />
        </View>
        )}

        {deviceFingerprint && platformType !== PlatformTypes.Api && (
        <View style={[commonStyles.mb0, commonStyles.pb0]}>
          <VerificationDeviceCheckPDF deviceFingerprint={deviceFingerprint} />
        </View>
        )}
      </View>
    </View>
  );
}
