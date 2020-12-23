import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useFilterParser } from './filterURL.hook';

export function useFilterUpdate(filter, filterUpdate) {
  const dispatch = useDispatch();
  const [setInURL] = useFilterParser();

  const setFilter = useCallback((filterParams) => {
    const newFilter = {
      ...filter,
      ...filterParams,
    };
    dispatch(filterUpdate(newFilter));
    setInURL(newFilter);
  }, [filter, dispatch, filterUpdate, setInURL]);

  return [setFilter];
}
