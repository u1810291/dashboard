import React, { useMemo } from 'react';
import { Text, View } from '@react-pdf/renderer';
import { CustomFieldVerificationAtomicList, CustomFieldVerificationList } from 'apps/CustomField';
import { useFormatMessage } from 'apps/intl';
import { ICustomField, formatedValue, CustomFieldDataForVerificationComponent } from 'models/CustomField.model';
import { styles } from './CustomFieldPDF.styles';
import { commonStyles } from '../../PDF.styles';

export function CustomFieldVerificationInfoPDF({ field, value }: {
  field: ICustomField;
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

export function CustomFieldVerificationSectionInfoPDF({ selection, country }: {
  selection: ICustomField;
  country: string;
}) {
  const selectedGroup = useMemo<ICustomField>(() => selection?.children?.find((option: ICustomField) => option.name === selection.selectedGroup), [selection?.children, selection.selectedGroup]);
  return (
    <>
      <CustomFieldVerificationInfoPDF field={selection} value={selectedGroup?.label} />
      {selectedGroup && <CustomFieldVerificationAtomicList country={country} fields={selectedGroup?.children} itemContainer={CustomFieldVerificationInfoPDF} />}
    </>
  );
}

export function CustomFieldPDF({ customFieldData }: { customFieldData: CustomFieldDataForVerificationComponent}) {
  const formatMessage = useFormatMessage();
  const { fields, country } = customFieldData;
  return (
    <View style={commonStyles.paper}>
      <Text style={[commonStyles.titleBoldMain, commonStyles.mb15]}>{formatMessage('CustomField.card.title')}</Text>
      <View>
        <CustomFieldVerificationList
          country={country}
          fields={fields}
          atomicContainer={CustomFieldVerificationInfoPDF}
          sectionContainer={CustomFieldVerificationSectionInfoPDF}
        />
      </View>
    </View>
  );
}
