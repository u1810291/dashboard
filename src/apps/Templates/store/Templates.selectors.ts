import { createSelector } from 'reselect';
import { Loadable } from 'models/Loadable.model';
import { selectModelValue } from 'lib/loadable.selectors';
import { SliceNames, TemplatesStore, TEMPLATES_STORE_KEY } from './Templates.store';
import { ITemplate, ITemplateMetadata, MetadataType, ITemplatesList } from '../model/Templates.model';

export const selectTemplatesStore = (state) => state[TEMPLATES_STORE_KEY];

export const selectMetadataListModel = createSelector<any, TemplatesStore, Loadable<ITemplateMetadata[]>>(
  selectTemplatesStore,
  (store) => store[SliceNames.MetadataList],
);

export const selectTemplatesListModel = createSelector<any, TemplatesStore, Loadable<ITemplatesList>>(
  selectTemplatesStore,
  (store) => store[SliceNames.TemplatesList],
);

export const selectTemplatesListModelValues = createSelector<any, any, ITemplatesList>(
  selectTemplatesListModel,
  selectModelValue(),
);

export const selectMetadataListModelValues = createSelector<any, any, ITemplateMetadata[]>(
  selectMetadataListModel,
  selectModelValue(),
);

export const selectIndustryMetadata = createSelector<any, any, ITemplateMetadata[]>(
  selectMetadataListModel,
  selectModelValue((model) => model.filter((value) => value.type === MetadataType.Industry)),
);

export const selectCountryMetadata = createSelector<any, any, ITemplateMetadata[]>(
  selectMetadataListModel,
  selectModelValue((model) => model.filter((value) => value.type === MetadataType.Country)),
);

export const selectCurrentTemplateModel = createSelector<any, TemplatesStore, Loadable<ITemplate>>(
  selectTemplatesStore,
  (store) => store[SliceNames.CurrentTemplate],
);

export const selectCurrentTemplateModelValue = createSelector<any, any, ITemplate>(
  selectCurrentTemplateModel,
  selectModelValue(),
);

export const selectTemplatesModel = createSelector<any, any, Loadable<ITemplate[]>>(
  selectTemplatesStore,
  (store) => store[SliceNames.Templates],
);

export const selectTemplates = createSelector<any, any, ITemplate[]>(
  selectTemplatesModel,
  selectModelValue(),
);
