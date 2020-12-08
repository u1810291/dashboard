import React from 'react';
import { useIntl } from 'react-intl';
import { Image, Text, View } from '@react-pdf/renderer';
import { VerificationCheckCardPDF } from '../VerificationCheckCardPDF/VerificationCheckCardPDF';
import { VerificationSummaryTitlePDF } from '../VerificationSummaryTitlePDF/VerificationSummaryTitlePDF';
import { StepStatus } from '../../../../models/Step.model';
import { getIpCheckStatus } from '../../../../models/IpCheck.model';
import { styles } from './VerificationIpCheckPDF.styles';
import { commonStyles } from '../../PDF.styles';
import { getMediaURL } from '../../../../lib/client/media';
import { IconStatuses } from '../../assets';
import { VerificationSummaryTitleTypes } from '../../../../models/Identity.model';

export function VerificationIpCheckPDF({ ipCheck }) {
  const status = getIpCheckStatus(ipCheck);
  const intl = useIntl();
  const icon = IconStatuses[status];

  return (
    <VerificationCheckCardPDF
      titleComponent={(
        <VerificationSummaryTitlePDF status={status} type={VerificationSummaryTitleTypes.additional}>
          {intl.formatMessage({ id: 'identity.summary.title.additional' })}
        </VerificationSummaryTitlePDF>
      )}
      bottomComponent={(
        <View style={status === StepStatus.Failure ? styles.textError : styles.text}>
          <Image style={commonStyles.labelIcon} src={icon} />
          <Text style={status === StepStatus.Failure ? styles.titleError : commonStyles.titleBold}>
            {intl.formatMessage({ id: 'identity.summary.ipcheck' })}
          </Text>
        </View>
      )}
      noWrap
    >
      <View style={commonStyles.mapBox} wrap={false}>
        <Image style={commonStyles.map} src={getMediaURL(ipCheck?.data?.mapUrl)} />
      </View>
    </VerificationCheckCardPDF>
  );
}
