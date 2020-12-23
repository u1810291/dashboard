import { LoadableAdapter } from 'lib/Loadable.adapter';
import { createReducer } from 'state/utils';
import { CountriesActionGroups, SliceNames } from './countries.store';

const initialState = {
  [SliceNames.AllCountries]: LoadableAdapter.createState([]),
  [SliceNames.CountriesOnlyExisting]: LoadableAdapter.createState([]),
  [SliceNames.CountryGeojsons]: LoadableAdapter.createState([]),
};

export default createReducer(initialState, {
  ...LoadableAdapter.createHandlers(CountriesActionGroups.AllCountries, SliceNames.AllCountries),
  ...LoadableAdapter.createHandlers(CountriesActionGroups.CountriesOnlyExisting, SliceNames.CountriesOnlyExisting),
  ...LoadableAdapter.createHandlers(CountriesActionGroups.CountryGeojsons, SliceNames.CountryGeojsons),
});
