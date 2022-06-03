import { createSelector } from 'reselect';
import { Loadable } from 'models/Loadable.model';
import { selectModelValue } from 'lib/loadable.selectors';
import { fromIsoPeriod } from 'lib/date';
import { DigitalSignatureProvider } from 'models/DigitalSignature.model';
import { SliceNameTypes, TemplatesStore, TEMPLATES_STORE_KEY } from './Templates.store';
import { ITemplate, ITemplateMetadata, MetadataType, ITemplatesList } from '../model/Templates.model';

export const selectTemplatesStore = (state: {TEMPLATES_STORE_KEY: TemplatesStore}): TemplatesStore => state[TEMPLATES_STORE_KEY];

export const selectMetadataListModel = createSelector<[typeof selectTemplatesStore], Loadable<ITemplateMetadata[]>>(
  selectTemplatesStore,
  (store) => store[SliceNameTypes.MetadataList],
);

export const selectTemplateApplicationState = createSelector<[typeof selectTemplatesStore], boolean>(
  selectTemplatesStore,
  (store) => store?.isTemplateApplying,
);

export const selectTemplatesListModel = createSelector<[typeof selectTemplatesStore], Loadable<ITemplatesList>>(
  selectTemplatesStore,
  (store) => store[SliceNameTypes.TemplatesList],
);

export const selectTemplatesListModelValues = createSelector<[typeof selectTemplatesListModel], ITemplatesList>(
  selectTemplatesListModel,
  selectModelValue((value) => ({ ...value, rows: value.rows.sort((a, b) => a.name.localeCompare(b.name)) })),
);

export const selectMetadataListModelValues = createSelector<[typeof selectMetadataListModel], ITemplateMetadata[]>(
  selectMetadataListModel,
  selectModelValue(),
);

export const selectIndustryMetadata = createSelector<[typeof selectMetadataListModel], ITemplateMetadata[]>(
  selectMetadataListModel,
  selectModelValue((model) => model.filter((value) => value.type === MetadataType.Industry)),
);

export const selectCountryMetadata = createSelector<[typeof selectMetadataListModel], ITemplateMetadata[]>(
  selectMetadataListModel,
  selectModelValue((model) => model.filter((value) => value.type === MetadataType.Country)),
);

export const selectCurrentTemplateModel = createSelector<[typeof selectTemplatesStore], Loadable<ITemplate>>(
  selectTemplatesStore,
  (store) => store[SliceNameTypes.CurrentTemplate],
);

export const selectCurrentTemplateModelValue = createSelector<[typeof selectCurrentTemplateModel], ITemplate>(
  selectCurrentTemplateModel,
  selectModelValue(),
);

export const selectTemplatesModel = createSelector<[typeof selectTemplatesStore], Loadable<Record<string, ITemplate[]>>>(
  selectTemplatesStore,
  (store) => store[SliceNameTypes.Templates],
);

export const selectTemplates = createSelector<[typeof selectTemplatesModel], ITemplate[]>(
  selectTemplatesModel,
  selectModelValue(),
);

export const selectCurrentTemplatePolicyInterval = createSelector<[typeof selectCurrentTemplateModel], string>(
  selectCurrentTemplateModel,
  selectModelValue((template) => fromIsoPeriod(template.flow?.policyInterval)),
);

export const selectCurrentTemplateNom151Check = createSelector<[typeof selectCurrentTemplateModel], DigitalSignatureProvider>(
  selectCurrentTemplateModel,
  selectModelValue((template) => template.flow?.digitalSignature),
);
