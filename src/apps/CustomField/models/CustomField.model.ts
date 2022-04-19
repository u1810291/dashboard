import { ProductSettings, ProductSettingsProps } from 'models/Product.model';
import uniqBy from 'lodash/uniqBy';
import cloneDeep from 'lodash/cloneDeep';
import { changeDateFormat, DateFormat } from 'lib/date';
import { parseDate } from 'apps/ui/models/ReactDayPicker.model';
import { SupportedLocales, SupportedLocalesToLocaleAsPopup } from 'models/Intl.model';
import { AtomicCustomFieldType, ICustomField, IMapping, ISelectOptions, MainCustomFieldType } from 'models/CustomField.model';

export const FIELD_SYSTEM_NAME_PATTERN = '^([a-zA-Z-_0-9]+)?$';

export const REGEXP_BANNED_SYMBOLS_IN_FIELD_SYSTEM_NAME = /[^a-zA-Z-_0-9]/g;

export const REPLACEMENT_SYMBOL = '_';

export const MAX_THUMBNAIL_SIZE = 64;

export const MAIN_DROPPABLE_ID = 'MAIN_DROPPABLE_ID';

export const MAIN_DROPPABLE_TYPE = MAIN_DROPPABLE_ID;

export const MIN_SELECT_OPTIONS = 2;

export const MAX_TEXT_INPUT_LENGTH = 40;

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
  CertificateOfTaxTINTin = 'certificate-of-tax.TIN.tin',
  CertificateOfIncorporationCACRcBnNumber = 'certificate-of-incorporation.CAC.rc-bn-number',
}

export interface ICustomFieldConfig {
  regex: string;
  type: AtomicCustomFieldType;
}

export const CONFIG_BY_KEY: Record<string, ICustomFieldConfig> = {
  [MappingValueKey.NationalIdNINDocumentNumber]: {
    regex: '^[0-9]{11}$',
    type: AtomicCustomFieldType.Text,
  },
  [MappingValueKey.NationalIdBVNDocumentNumber]: {
    regex: '^[0-9]{11}$',
    type: AtomicCustomFieldType.Text,
  },
  [MappingValueKey.NationalIdVINDocumentNumber]: {
    regex: '^[a-zA-Z0-9]{19}$',
    type: AtomicCustomFieldType.Text,
  },
  [MappingValueKey.CertificateOfTaxTINTin]: {
    regex: '^[0-9]{10}$|^[0-9]{8}-?[0-9]{4}$',
    type: AtomicCustomFieldType.Text,
  },
  [MappingValueKey.CertificateOfIncorporationCACRcBnNumber]: {
    regex: '^[a-zA-Z]{2}?\\s?[0-9]{6,7}$',
    type: AtomicCustomFieldType.Text,
  },
  [MappingValueKey.NationalIdFirstName]: {
    regex: '',
    type: AtomicCustomFieldType.Text,
  },
  [MappingValueKey.NationalIdLastName]: {
    regex: '',
    type: AtomicCustomFieldType.Text,
  },
  [MappingValueKey.NationalIdDateOfBirth]: {
    regex: '',
    type: AtomicCustomFieldType.Date,
  },
};

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
    MappingValueKey.CertificateOfTaxTINTin,
    MappingValueKey.CertificateOfIncorporationCACRcBnNumber,
  ],
};

export const INPUT_TYPE_WITH_DROPPABLE = [MainCustomFieldType.Group, MainCustomFieldType.Select];

export const AllowedGroupDrop = [MAIN_DROPPABLE_ID, MainCustomFieldType.Select];
export const AllowedFieldDrop = [MAIN_DROPPABLE_ID, MainCustomFieldType.Group];
export const AllowedSectionDrop = [MAIN_DROPPABLE_ID];

export interface IFlattenCustomField extends ICustomField {
  value: string;
}

export const EMPTY_OPTION: ISelectOptions = {
  label: '',
  value: '',
};

export const EMPTY_SELECT_OPTIONS: ISelectOptions[] = [
  { ...EMPTY_OPTION },
  { ...EMPTY_OPTION },
];

export const EMPTY_MAPPING: IMapping = {
  country: '',
  key: '',
  shouldCheckFormat: false,
  shouldFilter: false,
};

export const EMPTY_CUSTOM_ATOMIC_FIELD: ICustomField = {
  name: '',
  label: '',
  type: MainCustomFieldType.Atomic,
  isMandatory: false,
  atomicFieldParams: {
    placeholder: '',
    regex: '',
    mapping: null,
    selectOptions: [...EMPTY_SELECT_OPTIONS],
    type: null,
  },
};

export const EMPTY_CUSTOM_GROUP_FIELD: ICustomField = {
  name: '',
  label: '',
  type: MainCustomFieldType.Group,
  children: [],
  isMandatory: false,
};

export const EMPTY_CUSTOM_SELECT_FIELD: ICustomField = {
  name: '',
  label: '',
  type: MainCustomFieldType.Select,
  children: [],
  isMandatory: false,
  selectedGroup: null,
};

export type HandleUpdateFields = (fields: ICustomField[]) => void;

export type HandleOpenModal = (modalType: CustomFieldModalTypes, editedField?: ICustomField, index?: number, parent?: string) => () => void;

export const checkIsDropDisabled = (draggableId: string, droppableId: string, fields: ICustomField[]): boolean => {
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
  items: ICustomField[],
  parent: string | null = MAIN_DROPPABLE_ID,
): IFlattenCustomField[] => {
  if (!items) {
    return [];
  }
  return items.reduce((acc, item) => {
    let flattenChildren: ICustomField[] = [];
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

export const findItem = (items: ICustomField[], itemName: string): ICustomField => items.find(({ name }) => name === itemName);

function removeEmpty<T>(obj: T): T {
  return <T>Object.fromEntries(
    Object.entries(obj)
      .filter(([, value]) => value !== null && value !== '')
      .map(([key, value]) => [key, (value instanceof Object && !(value instanceof Array)) ? removeEmpty(value) : value]),
  );
}

export function mutableFindChildren(fields: ICustomField[], parentName: string): ICustomField[] {
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

export function findAndDelete(fields: ICustomField[], name: string): ICustomField[] {
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

export function findAndSetValues(fields: ICustomField[], names: string[], values: (string | boolean | Date)[], locale: SupportedLocales): ICustomField[] {
  for (let fieldIdx = 0; fields.length > fieldIdx; fieldIdx += 1) {
    if (!names.length) {
      break;
    }
    const field = fields[fieldIdx];
    const index = names.indexOf(field.name);
    if (index !== -1) {
      names.splice(index, 1);
      const value = values.splice(index, 1)[0];
      if (value) {
        if (field.type === MainCustomFieldType.Select) {
          field.selectedGroup = value as string;
        } else if (field.atomicFieldParams.type === AtomicCustomFieldType.Date) {
          field.atomicFieldParams.value = changeDateFormat(value as string, DateFormat.LocalizedDayMonthYearSlashes, locale);
        } else {
          field.atomicFieldParams.value = value as string;
        }
      }
      if (!value) {
        if (field.type === MainCustomFieldType.Select) {
          delete field.selectedGroup;
        } else if (field.atomicFieldParams.type === AtomicCustomFieldType.Checkbox) {
          field.atomicFieldParams.value = value as string;
        } else {
          delete field.atomicFieldParams.value;
        }
      }
    }
    if (field.type !== MainCustomFieldType.Atomic) {
      findAndSetValues(field.children, names, values, locale);
    }
  }
  return fields;
}

export const fillFieldsWithData = (data: unknown, fields: ICustomField[], locale: SupportedLocales): ICustomField[] => {
  const names: string[] = Object.keys(data);
  const values: (string | boolean | Date)[] = Object.values(data);
  return findAndSetValues(cloneDeep(fields), names, values, locale);
};

export const prepareCustomField = (customField: ICustomField): ICustomField => {
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

export const isNameUniq = (listFlattenFields: ICustomField[], oldName: string, newName: string): boolean => {
  const duplicateNameFields = listFlattenFields.filter((field) => field.name === newName);
  if (duplicateNameFields.length === 1 && oldName === newName) {
    return true;
  }
  return duplicateNameFields.length === 0;
};

export const isAllOptionsUniq = (selectOptions: ISelectOptions[]): boolean => uniqBy(selectOptions, 'value').length === selectOptions.length;

export const isAllOptionsFielded = (selectOptions: ISelectOptions[]): boolean => selectOptions.every((option) => option.value && option.label);

export const validateDateInput = (str: string, field: ICustomField, locale: string): boolean => {
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

export const fieldIsValid = (isUploadingThumbnail: boolean, selectedCustomField: ICustomField, listFlattenFields: ICustomField[], oldName: string): boolean => {
  if (isUploadingThumbnail) {
    return false;
  }
  if (!isSetMainData(selectedCustomField.name, selectedCustomField.label)) {
    return false;
  }
  return isNameUniq(listFlattenFields, oldName, selectedCustomField.name);
};

export const atomicFieldIsValid = (selectedCustomField: ICustomField, listFlattenFields: ICustomField[], oldName: string): boolean => {
  if (!selectedCustomField.atomicFieldParams.type) {
    return false;
  }
  if (!isSetMainData(selectedCustomField.name, selectedCustomField.label)) {
    return false;
  }
  if (selectedCustomField.atomicFieldParams.regex && !selectedCustomField.atomicFieldParams.placeholder) {
    return false;
  }
  if (selectedCustomField.atomicFieldParams.type === AtomicCustomFieldType.Select) {
    return isNameUniq(listFlattenFields, oldName, selectedCustomField.name) && isAllOptionsUniq(selectedCustomField.atomicFieldParams.selectOptions) && isAllOptionsFielded(selectedCustomField.atomicFieldParams.selectOptions);
  }
  return isNameUniq(listFlattenFields, oldName, selectedCustomField.name);
};

export const getNotSelectedMapping = (listFlattenFields: ICustomField[], mapping: IMapping, oldMapping: IMapping): MappingValueKey[] => {
  if (!mapping?.country) {
    return [];
  }
  const notSelected = MAPPING_OPTIONS[mapping?.country].filter((option) => !listFlattenFields.find((field) => field?.atomicFieldParams?.mapping?.key === option)) || [];
  if (oldMapping.country === mapping.country && !notSelected.includes(oldMapping.key)) {
    notSelected.push(oldMapping.key);
  }
  return notSelected;
};

export const isValidFieldSystemName = (value: string): boolean => new RegExp(FIELD_SYSTEM_NAME_PATTERN).test(value);

export const isTypeFromConfig = (selectedFieldMapping: IMapping): boolean => !!CONFIG_BY_KEY[selectedFieldMapping?.key]?.type;

export const generatePreviewModeURL = (listFields: ICustomField[], currentLocale: SupportedLocales): string => {
  const previewUrl = new URL(`${process.env.REACT_APP_PRODUCT_REGISTRY_URL}/custom-input-product/`);

  previewUrl.searchParams.append('isPreviewMode', 'true');
  previewUrl.searchParams.append('fields', JSON.stringify(listFields));
  previewUrl.searchParams.append('locale', SupportedLocalesToLocaleAsPopup[currentLocale]);

  return previewUrl.href;
};
