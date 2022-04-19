import React from 'react';
import { ICustomField, MainCustomFieldType, AtomicCustomFieldType } from 'models/CustomField.model';

export function CustomFieldVerificationAtomicList({ country, fields, itemContainer }: {
  fields: ICustomField[];
  country: string;
  itemContainer: React.FunctionComponent<any>;
}) {
  return (
    <>
      {fields.map((field) => {
        if (country && field.atomicFieldParams?.mapping?.shouldFilter && field.atomicFieldParams?.mapping?.country !== country) {
          return null;
        }
        return React.createElement<{ field: ICustomField; value: string }>(itemContainer, {
          key: field.name,
          field,
          value: field?.atomicFieldParams?.value,
        });
      })}
    </>
  );
}

export function CustomFieldVerificationList({ fields, atomicContainer, sectionContainer, country }: {
  fields: ICustomField[];
  atomicContainer: React.FunctionComponent<any>;
  sectionContainer: React.FunctionComponent<any>;
  country: string;
}) {
  return (
    <>
      {fields.map((field) => {
        if (field.type === MainCustomFieldType.Select) {
          return React.createElement<{ selection: ICustomField; country: string }>(sectionContainer, {
            key: field.name,
            selection: field,
            country,
          });
        }
        if (field.type === MainCustomFieldType.Atomic) {
          let value = field.atomicFieldParams?.value;
          if (country && field.atomicFieldParams?.mapping?.shouldFilter && field.atomicFieldParams?.mapping?.country !== country) {
            return null;
          }
          if (field.atomicFieldParams.type === AtomicCustomFieldType.Select && value) {
            value = field.atomicFieldParams.selectOptions.find((option) => option.value === value).label;
          }
          return React.createElement<{ field: ICustomField; value: string }>(atomicContainer, {
            key: field.name,
            field,
            value,
          });
        }
        return <CustomFieldVerificationAtomicList key={field.name} country={country} fields={field.children} itemContainer={atomicContainer} />;
      })}
    </>
  );
}
