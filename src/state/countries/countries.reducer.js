import { createReducer } from 'state/utils';
import { LoadableAdapter } from 'lib/Loadable.adapter';
import { CountriesActionGroups } from './countries.store';

const initialState = LoadableAdapter.createState([]);

export default createReducer(initialState, {
  ...LoadableAdapter.createHandlers(CountriesActionGroups.Countries),
});
