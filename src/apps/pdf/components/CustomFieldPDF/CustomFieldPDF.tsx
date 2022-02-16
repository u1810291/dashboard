import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { Text, View } from '@react-pdf/renderer';
import { CustomField } from 'apps/CustomField';
import { styles } from './CustomFieldPDF.styles';
import { commonStyles } from '../../PDF.styles';
import { CustomFieldVerificationAtomicList, CustomFieldVerificationList } from '../../../CustomField/components/CustomFieldVerificationList/CustomFieldVerificationList';
import { AtomicCustomFieldType, formatedValue, MainCustomFieldType } from '../../../CustomField/models/CustomField.model';
import { formatDate } from '../../../../lib/date';
import { isNil } from '../../../../lib/isNil';

export function CustomFieldVerificationInfoPDF({ field, value }: {
  field: CustomField;
  value: string;
}) {
  return (
    <View style={styles.fieldsWrapper}>
      <View style={styles.field}>
        <Text style={commonStyles.data}>
          {formatedValue(field, value)}
        </Text>
        <Text style={[commonStyles.title, commonStyles.mb15]}>
          {field.label}
        </Text>
      </View>
    </View>
  );
}

export function CustomFieldVerificationSectionInfoPDF({ selection }: {
  selection: CustomField;
}) {
  const selectedGroup: CustomField = useMemo(() => selection?.children?.find((option) => option.name === selection.selectedGroup), [selection?.children, selection.selectedGroup]);
  return (
    <>
      <CustomFieldVerificationInfoPDF field={selection} value={selectedGroup?.label} />
      {selectedGroup && (<CustomFieldVerificationAtomicList fields={selectedGroup?.children} itemContainer={CustomFieldVerificationInfoPDF} />)}
    </>
  );
}

export function CustomFieldPDF({ input }: { input: {data: {fields: CustomField[] }}}) {
  const intl = useIntl();
  const { data: { fields } } = input;
  return (
    <View style={commonStyles.paper}>
      <Text style={[commonStyles.titleBoldMain, commonStyles.mb15]}>{intl.formatMessage({ id: 'CustomField.card.title' })}</Text>
      <View>
        <CustomFieldVerificationList
          fields={fields}
          atomicContainer={CustomFieldVerificationInfoPDF}
          sectionContainer={CustomFieldVerificationSectionInfoPDF}
        />
      </View>
    </View>
  );
}
