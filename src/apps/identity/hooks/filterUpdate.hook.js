import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterUpdate } from '../../../state/identities/identities.actions';
import { selectIdentityFilter } from '../../../state/identities/identities.selectors';
import { useFilterParser } from './filterURL.hook';

export function useFilterUpdate() {
  const dispatch = useDispatch();
  const identityFilter = useSelector(selectIdentityFilter);
  const [setInURL] = useFilterParser();

  const setFilter = useCallback((filterParams) => {
    const newFilter = {
      ...identityFilter,
      ...filterParams,
    };
    dispatch(filterUpdate(newFilter));
    setInURL(newFilter);
  }, [dispatch, identityFilter, setInURL]);

  return [setFilter, identityFilter];
}
