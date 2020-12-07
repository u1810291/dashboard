import React from 'react';
import { Image, Text, View } from '@react-pdf/renderer';
import { styles } from './VerificationSummaryTitlePDF.styles';
import { commonStyles } from '../../PDF.styles';
import { VerificationSummaryTitleStatuses } from '../../assets';
import { VerificationSummaryTitleTypes } from '../../../../models/Identity.model';

export function VerificationSummaryTitlePDF({ status, children, type = VerificationSummaryTitleTypes.document, withIcon = true }) {
  const { icon } = VerificationSummaryTitleStatuses[status][type];
  const { colorText } = VerificationSummaryTitleStatuses[status];

  return (
    <View wrap={false} style={withIcon ? styles.titleWrapperIcon : styles.titleWrapper}>
      {withIcon && <Image style={styles.titleIcon} src={icon} />}
      <Text style={[commonStyles.titleBold, { color: colorText }]}>
        {children}
      </Text>
    </View>
  );
}
