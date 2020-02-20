import { useLocation } from 'react-router-dom';

export function useQuery() {
  const search = new URLSearchParams(useLocation().search);
  return Object.fromEntries(search) || {};
}
