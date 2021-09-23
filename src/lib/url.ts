import { useLocation } from 'react-router-dom';
import { Routes } from 'models/Router.model';

export function useQuery() {
  const search = new URLSearchParams(useLocation().search);
  return Object.fromEntries(search) || {};
}

export function getQueryFromObject(queryParams: {[p: string]: string}): string | null {
  return Object.entries(queryParams).map(([key, value]) => key && value && `${key}=${value}`).filter(Boolean).join('&') || null;
}

export function goToStartPage() {
  window.location.replace(`${Routes.analytics.root}`);
}
