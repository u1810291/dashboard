import { filterParse, filterSerialize } from 'apps/identity/models/filter.model';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { filterUpdate } from 'state/identities/identities.actions';
import { selectIdentityFilter } from 'state/identities/identities.selectors';

const syncedRef = React.createRef();

export function useFilter() {
  const dispatch = useDispatch();
  const history = useHistory();
  const filter = useSelector(selectIdentityFilter);

  useEffect(() => {
    // sync url and store once
    if (!syncedRef.current) {
      syncedRef.current = true;
      const fromURL = Object.fromEntries(new URLSearchParams(history.location.search));
      const parsed = filterParse(fromURL);
      dispatch(filterUpdate(parsed));
    }
  }, [dispatch, history.location.search]);

  const setFilter = useCallback((values) => {
    // here we push updates to store and url
    const newFilter = {
      ...filter,
      ...values,
    };
    dispatch(filterUpdate(newFilter));
    const newParams = filterSerialize(newFilter);
    const search = new URLSearchParams(newParams);
    history.push({
      pathname: history.location.pathname,
      search: search.toString(),
    });
  }, [dispatch, history, filter]);

  return [
    filter,
    setFilter,
  ];
}
