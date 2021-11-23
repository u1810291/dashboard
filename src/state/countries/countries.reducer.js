import { LoadableAdapter } from 'lib/Loadable.adapter';
import { createReducer } from 'state/store.utils';
import { CountriesActionGroups, SliceNames } from './countries.store';

const initialState = {
  [SliceNames.AllCountries]: LoadableAdapter.createState([]),
  [SliceNames.CountryGeojsons]: LoadableAdapter.createState([]),
};

export default createReducer(initialState, {
  ...LoadableAdapter.createHandlers(CountriesActionGroups.AllCountries, SliceNames.AllCountries),
  ...LoadableAdapter.createHandlers(CountriesActionGroups.CountryGeojsons, SliceNames.CountryGeojsons),
});
