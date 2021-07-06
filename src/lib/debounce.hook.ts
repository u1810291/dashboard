import { debounce } from 'lodash';
import { useMemo } from 'react';

export function useDebounce(wait = 300) {
  return useMemo(() => debounce((action: Function) => action(), wait), [wait]);
}
