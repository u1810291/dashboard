import { ICreateTemplateResponse, ITemplateMetadata, MetadataType } from 'apps/Templates/model/Templates.model';
import { createSelector } from 'reselect';
import { Loadable } from 'models/Loadable.model';
import { selectModelValue } from 'lib/loadable.selectors';
import { SliceNames, TemplatesStore, TEMPLATES_STORE_KEY } from './Templates.store';

export const selectTemplatesStore = (state) => state[TEMPLATES_STORE_KEY];

export const selectMetadataListModel = createSelector<any, TemplatesStore, Loadable<ITemplateMetadata[]>>(
  selectTemplatesStore,
  (store) => store[SliceNames.MetadataList],
);

export const selectIndustryMetadata = createSelector<any, any, ITemplateMetadata[]>(
  selectMetadataListModel,
  selectModelValue((model) => model.filter((value) => value.type === MetadataType.Industry)),
);

export const selectCountryMetadata = createSelector<any, any, ITemplateMetadata[]>(
  selectMetadataListModel,
  selectModelValue((model) => model.filter((value) => value.type === MetadataType.Country)),
);

export const selectMetadataListModelValues = createSelector<any, any, ITemplateMetadata[]>(
  selectMetadataListModel,
  selectModelValue(),
);

export const selectCurrentTemplateModel = createSelector<any, TemplatesStore, Loadable<ICreateTemplateResponse>>(
  selectTemplatesStore,
  (store) => store[SliceNames.CurrentTemplate],
);

export const selectCurrentTemplateModelValue = createSelector<any, any, ICreateTemplateResponse>(
  selectCurrentTemplateModel,
  selectModelValue(),
);
