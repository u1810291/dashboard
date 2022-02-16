import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { Text, View } from '@react-pdf/renderer';
import { CustomField, formatedValue, VerificationCustomFieldsInputData, CustomFieldVerificationAtomicList, CustomFieldVerificationList } from 'apps/CustomField';
import { InputStatus } from 'models/Input.model';
import { styles } from './CustomFieldPDF.styles';
import { commonStyles } from '../../PDF.styles';

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

export function CustomFieldPDF({ input }: { input: InputStatus<VerificationCustomFieldsInputData>}) {
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
