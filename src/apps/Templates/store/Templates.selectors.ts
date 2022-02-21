import { createSelector } from 'reselect';
import { Loadable } from 'models/Loadable.model';
import { selectModelValue } from 'lib/loadable.selectors';
import { SliceNames, TemplatesStore, TEMPLATES_STORE_KEY } from './Templates.store';
import { ITemplate, ITemplateMetadata, MetadataType } from '../model/Templates.model';

export const selectTemplatesStore = (state) => state[TEMPLATES_STORE_KEY];

export const selectMetadataListModel = createSelector<any, TemplatesStore, Loadable<ITemplateMetadata[]>>(
  selectTemplatesStore,
  (store) => store[SliceNames.MetadataList],
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

export const selectTemplatesListModel = createSelector<any, any, Loadable<ITemplate[]>>(
  selectTemplatesStore,
  (store) => store[SliceNames.Templates],
);

export const selectTemplatesList = createSelector<any, any, ITemplate[]>(
  selectTemplatesListModel,
  selectModelValue(),
);

export const selectTemplatesListFlat = createSelector<any, any, ITemplate[]>(
  selectTemplatesListModel,
  selectModelValue((object) => {
    const flatArray = [];
    Object.keys(object).forEach((key) => flatArray.push(...object[key]));
    return flatArray;
  }),
);
