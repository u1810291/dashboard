import { useLocation } from 'react-router-dom';

export function useQuery() {
  const search = new URLSearchParams(useLocation().search);
  return Object.fromEntries(search) || {};
}

export function getQueryFromObject(queryParams) {
  return Object.entries(queryParams).map(([key, value]) => key && value && `${key}=${value}`).filter(Boolean).join('&') || null;
}
