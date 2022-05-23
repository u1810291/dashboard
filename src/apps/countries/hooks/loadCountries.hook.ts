import { useDispatch, useSelector } from 'react-redux';
import { LoadableAdapter } from 'lib/Loadable.adapter';
import { selectAllCountriesModel } from 'state/countries/countries.selectors';
import { useEffect } from 'react';
import { loadCountries } from 'state/countries/countries.actions';

export function useCountriesLoad() {
  const dispatch = useDispatch();
  const countriesModel = useSelector(selectAllCountriesModel);

  useEffect(() => {
    const loadData = async () => {
      if (LoadableAdapter.isPristine(countriesModel)) {
        try {
          await dispatch(loadCountries());
        } catch (error) {
          console.error(error);
        }
      }
    };
    loadData();
  }, [dispatch, countriesModel]);
  return countriesModel;
}
