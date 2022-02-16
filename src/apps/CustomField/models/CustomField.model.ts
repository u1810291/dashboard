import { ProductSettings, ProductSettingsProps } from 'models/Product.model';
import uniqBy from 'lodash/uniqBy';
import cloneDeep from 'lodash/cloneDeep';
import { DateFormat, formatDate } from 'lib/date';
import { parseDate } from 'apps/ui/models/ReactDayPicker.model';
import { isNil } from '../../../lib/isNil';

export const FIELD_SYSTEM_NAME_PATTERN = '^([a-zA-Z-_]+)?$';

export const MAX_THUMBNAIL_SIZE = 64;

export const MAIN_DROPPABLE_ID = 'MAIN_DROPPABLE_ID';

export const MAIN_DROPPABLE_TYPE = MAIN_DROPPABLE_ID;

export const MIN_SELECT_OPTIONS = 2;

export const CUSTOM_FIELD_SELECTION_OPTION_NAME = 'Option 1';
export const CUSTOM_FIELD_SELECTION_SECOND_OPTION_NAME = 'Option 2';
export const CUSTOM_FIELD_SELECTION_OPTION_PREFIX = '-option1';
export const CUSTOM_FIELD_SELECTION_SECOND_OPTION_PREFIX = '-option2';

export enum CustomFieldSettingTypes {
  fields = 'fields',
  flattenedFields = 'flattenedFields',
}

export type CustomFieldProductSettings = ProductSettings<CustomFieldSettingTypes>;

export type CustomFieldProductSettingsProps = ProductSettingsProps<CustomFieldSettingTypes>;

export enum CustomFieldTypes {
  InputTypes = 'InputTypes',
  FormatValidation = 'FormatValidation',
  MappingDocuments = 'MappingDocuments'
}

export enum CustomFieldModalTypes {
  ConfigureField = 'configureField',
  MappingFieldToDocument = 'mappingFieldToDocument',
  ConfigureGroup = 'Group',
  ConfigureSelection = 'Selection',
  ConfigureOption = 'Option',
  PreviewCustomField = 'previewCustomField',
}

export enum AtomicCustomFieldType {
  Text = 'text',
  Date = 'date',
  Checkbox = 'checkbox',
  Select = 'select',
}

export enum MainCustomFieldType {
  Group = 'group',
  Select = 'select',
  Atomic = 'atomic',
}

export const MODAL_BY_FIELD_TYPE = {
  [MainCustomFieldType.Select]: CustomFieldModalTypes.ConfigureSelection,
  [MainCustomFieldType.Group]: CustomFieldModalTypes.ConfigureGroup,
  [MainCustomFieldType.Atomic]: CustomFieldModalTypes.ConfigureField,
};

export enum MappingValueKey {
  NationalIdNINDocumentNumber = 'national-id.NIN.documentNumber',
  NationalIdBVNDocumentNumber = 'national-id.BVN.documentNumber',
  NationalIdVINDocumentNumber = 'national-id.VIN.documentNumber',
  NationalIdFirstName = 'national-id.firstName',
  NationalIdLastName = 'national-id.lastName',
  NationalIdDateOfBirth = 'national-id.dateOfBirth',
}

export enum MappingCountryTypes {
  Nigeria = 'NG',
}

export const MAPPING_ALLOWED_COUNTRIES = [
  MappingCountryTypes.Nigeria,
];

export const MAPPING_OPTIONS = {
  [MappingCountryTypes.Nigeria]: [
    MappingValueKey.NationalIdNINDocumentNumber,
    MappingValueKey.NationalIdBVNDocumentNumber,
    MappingValueKey.NationalIdVINDocumentNumber,
    MappingValueKey.NationalIdFirstName,
    MappingValueKey.NationalIdLastName,
    MappingValueKey.NationalIdDateOfBirth,
  ],
};

export const INPUT_TYPE_WITH_DROPPABLE = [MainCustomFieldType.Group, MainCustomFieldType.Select];

export const AllowedGroupDrop = [MAIN_DROPPABLE_ID, MainCustomFieldType.Select];
export const AllowedFieldDrop = [MAIN_DROPPABLE_ID, MainCustomFieldType.Group];
export const AllowedSectionDrop = [MAIN_DROPPABLE_ID];

export interface SelectOptions {
  label: string;
  value: string;
}

export interface Mapping {
  country: string;
  key: string;
  shouldCheckFormat: boolean;
  shouldFilter: boolean;
}

export interface AtomicCustomField {
  placeholder?: string;
  type: AtomicCustomFieldType;
  selectOptions?: SelectOptions[];
  mapping?: Mapping;
  regex?: string;
  value?: string;
}

export interface CustomField {
  name: string;
  type: MainCustomFieldType;
  isMandatory: boolean;
  label: string;
  thumbnail?: {
    publicUrl: string;
    url: string;
  };
  atomicFieldParams?: AtomicCustomField;
  children?: CustomField[];
  selectedGroup?: string;
}

export interface FlattenCustomField extends CustomField {
  value: string;
}

export const EMPTY_OPTION: SelectOptions = {
  label: '',
  value: '',
};

export const EMPTY_SELECT_OPTIONS: SelectOptions[] = [
  { ...EMPTY_OPTION },
  { ...EMPTY_OPTION },
];

export const EMPTY_MAPPING: Mapping = {
  country: '',
  key: '',
  shouldCheckFormat: false,
  shouldFilter: false,
};

export const EMPTY_CUSTOM_ATOMIC_FIELD: CustomField = {
  name: '',
  label: '',
  type: MainCustomFieldType.Atomic,
  isMandatory: false,
  atomicFieldParams: {
    placeholder: '',
    regex: '',
    mapping: null,
    selectOptions: [...EMPTY_SELECT_OPTIONS],
    type: AtomicCustomFieldType.Text,
  },
};

export const EMPTY_CUSTOM_GROUP_FIELD: CustomField = {
  name: '',
  label: '',
  type: MainCustomFieldType.Group,
  children: [],
  isMandatory: false,
};

export const EMPTY_CUSTOM_SELECT_FIELD: CustomField = {
  name: '',
  label: '',
  type: MainCustomFieldType.Select,
  children: [],
  isMandatory: false,
  selectedGroup: null,
};

export interface VerificationCustomFieldsInputData {
  fields: CustomField[];
}

export type HandleUpdateFields = (fields: CustomField[]) => void;

export type HandleOpenModal = (modalType: CustomFieldModalTypes, editedField?: CustomField, index?: number, parent?: string) => () => void;

export const checkIsDropDisabled = (draggableId: string, droppableId: string, fields: CustomField[]): boolean => {
  if (!draggableId) {
    return false;
  }
  const typeDroppable = fields.find(({ name }) => name === droppableId)?.type || MAIN_DROPPABLE_TYPE;
  const typeDraggable = fields.find(({ name }) => name === draggableId).type;
  switch (typeDraggable) {
    case MainCustomFieldType.Select:
      return !AllowedSectionDrop.includes(typeDroppable);
    case MainCustomFieldType.Group:
      return !AllowedGroupDrop.includes(typeDroppable);
    default:
      return !AllowedFieldDrop.includes(typeDroppable);
  }
};

export const flattenTree = (
  items: CustomField[],
  parent: string | null = MAIN_DROPPABLE_ID,
): FlattenCustomField[] => {
  if (!items) {
    return [];
  }
  return items.reduce((acc, item) => {
    let flattenChildren: CustomField[] = [];
    if (item?.children?.length) {
      flattenChildren = flattenTree(item?.children, item.name);
    }
    return [
      ...acc,
      {
        ...item,
        parent,
      },
      ...flattenChildren,
    ];
  }, []);
};

export const findItem = (items: CustomField[], itemName: string): CustomField => items.find(({ name }) => name === itemName);

function removeEmpty<T>(obj: T): T {
  return <T>Object.fromEntries(
    Object.entries(obj)
      .filter(([, value]) => value !== null && value !== '')
      .map(([key, value]) => [key, (value instanceof Object && !(value instanceof Array)) ? removeEmpty(value) : value]),
  );
}

export function mutableFindChildren(fields: CustomField[], parentName: string): CustomField[] {
  if (parentName === MAIN_DROPPABLE_ID) {
    return fields;
  }
  // eslint-disable-next-line no-restricted-syntax
  for (const field of fields) {
    if (field.name === parentName) {
      return field.children;
    }
    if (field.type !== MainCustomFieldType.Atomic) {
      const child = mutableFindChildren(field.children, parentName);
      if (child !== undefined) {
        return child;
      }
    }
  }
  return undefined;
}

export function findAndDelete(fields: CustomField[], name: string): CustomField[] {
  const result = fields;
  for (let i = 0; result.length > i; i += 1) {
    const field = result[i];
    if (field.name === name) {
      result.splice(i, 1);
      break;
    }
    if (field.type !== MainCustomFieldType.Atomic) {
      findAndDelete(field.children, name);
    }
  }
  return result;
}

export const prepareCustomField = (customField: CustomField): CustomField => {
  const result = cloneDeep(customField);
  if (result?.atomicFieldParams?.type !== AtomicCustomFieldType.Select) {
    delete result?.atomicFieldParams?.selectOptions;
  }
  if (!result?.atomicFieldParams?.mapping?.country || !result?.atomicFieldParams?.mapping?.key) {
    delete result?.atomicFieldParams?.mapping;
  }
  return removeEmpty(result);
};

export const isSetMainData = (name: string, label: string): boolean => !!(name && label);

export const isNameUniq = (listFlattenFields: CustomField[], oldName: string, newName: string): boolean => {
  const duplicateNameFields = listFlattenFields.filter((field) => field.name === newName);
  if (duplicateNameFields.length === 1 && oldName === newName) {
    return true;
  }
  return duplicateNameFields.length === 0;
};

export const isAllOptionsUniq = (selectOptions: SelectOptions[]): boolean => uniqBy(selectOptions, 'value').length === selectOptions.length;

export const isAllOptionsFielded = (selectOptions: SelectOptions[]): boolean => selectOptions.every((option) => option.value && option.label);

export const validateDateInput = (str: string, field: CustomField, locale: string): boolean => {
  if (!str && !field?.isMandatory) {
    return true;
  }
  return parseDate(str, DateFormat.LocalizedDayMonthYearSlashes, locale) instanceof Date;
};

export const prepareEmptyGroupToSection = (parentName: string, prefix: string = CUSTOM_FIELD_SELECTION_OPTION_PREFIX, label: string = CUSTOM_FIELD_SELECTION_OPTION_NAME) => ({
  ...cloneDeep(EMPTY_CUSTOM_GROUP_FIELD),
  name: `${parentName}${prefix}`,
  label,
});

export const fieldIsValid = (isUploadingThumbnail: boolean, selectedCustomField: CustomField, listFlattenFields: CustomField[], oldName: string): boolean => {
  if (isUploadingThumbnail) {
    return false;
  }
  if (!isSetMainData(selectedCustomField.name, selectedCustomField.label)) {
    return false;
  }
  return isNameUniq(listFlattenFields, oldName, selectedCustomField.name);
};

export const atomicFieldIsValid = (selectedCustomField: CustomField, listFlattenFields: CustomField[], oldName: string): boolean => {
  if (!isSetMainData(selectedCustomField.name, selectedCustomField.label)) {
    return false;
  }
  if (selectedCustomField.atomicFieldParams.type === AtomicCustomFieldType.Select) {
    return isNameUniq(listFlattenFields, oldName, selectedCustomField.name) && isAllOptionsUniq(selectedCustomField.atomicFieldParams.selectOptions) && isAllOptionsFielded(selectedCustomField.atomicFieldParams.selectOptions);
  }
  return isNameUniq(listFlattenFields, oldName, selectedCustomField.name);
};

export const getNotSelectedMapping = (listFlattenFields: CustomField[], mapping: Mapping, oldMapping: Mapping): MappingValueKey[] => {
  if (!mapping?.country) {
    return [];
  }
  const notSelected = MAPPING_OPTIONS[mapping?.country].filter((option) => !listFlattenFields.find((field) => field?.atomicFieldParams?.mapping?.key === option)) || [];
  if (oldMapping.country === mapping.country && oldMapping.key) {
    notSelected.push(oldMapping.key);
  }
  return notSelected;
};

export const isValidFieldSystemName = (value: string): boolean => new RegExp(FIELD_SYSTEM_NAME_PATTERN).test(value);

export const formatedValue = (field: CustomField, value: string) => (field.type === MainCustomFieldType.Atomic && field.atomicFieldParams.type === AtomicCustomFieldType.Date
  ? value ? formatDate(value) : ''
  : !isNil(value) ? `${value}` : '-');
