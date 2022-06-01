import { LoadableAdapter } from 'lib/Loadable.adapter';
import { createReducer } from 'state/store.utils';
import { CountriesActionGroups, SliceNameTypes } from './countries.store';

const initialState = {
  [SliceNameTypes.AllCountries]: LoadableAdapter.createState([]),
  [SliceNameTypes.CountryGeojsons]: LoadableAdapter.createState([]),
};

export default createReducer(initialState, {
  ...LoadableAdapter.createHandlers(CountriesActionGroups.AllCountries, SliceNameTypes.AllCountries),
  ...LoadableAdapter.createHandlers(CountriesActionGroups.CountryGeojsons, SliceNameTypes.CountryGeojsons),
});
