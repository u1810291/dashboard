import React from 'react';
import { CustomField, MainCustomFieldType } from '../../models/CustomField.model';

export function CustomFieldVerificationAtomicList({ fields, itemContainer }: {
  fields: CustomField[];
  itemContainer: React.FunctionComponent<any>;
}) {
  return (
    <>
      {fields.map((field) => React.createElement<{ field: CustomField; value: string }>(itemContainer, {
        key: field.name,
        field,
        value: field?.atomicFieldParams?.value,
      }))}
    </>
  );
}

export function CustomFieldVerificationList({ fields, atomicContainer, sectionContainer }: {
  fields: CustomField[];
  atomicContainer: React.FunctionComponent<any>;
  sectionContainer: React.FunctionComponent<any>;
}) {
  return (
    <>
      {fields.map((field) => {
        if (field.type === MainCustomFieldType.Select) {
          return React.createElement<{ selection: CustomField }>(sectionContainer, {
            key: field.name,
            selection: field,
          });
        }
        if (field.type === MainCustomFieldType.Atomic) {
          return React.createElement<{ field: CustomField; value: string }>(atomicContainer, {
            key: field.name,
            field,
            value: field.atomicFieldParams?.value,
          });
        }
        return <CustomFieldVerificationAtomicList key={field.name} fields={field.children} itemContainer={atomicContainer} />;
      })}
    </>
  );
}
