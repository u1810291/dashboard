import { appPalette } from 'apps/theme';

export const LiveStatusPageLink = 'https://status.metamap.com/';
export const DashboardComponentId = process.env.REACT_APP_STATUSPAGE_DASHBOARD_ID;
export const ApiSdkComponentId = process.env.REACT_APP_STATUSPAGE_API_WEBSDK_ID;
export const DefaultUpdateTime = 60000;

export enum LiveStatuses{
  Operational = 'operational',
  PartialOutage = 'partial_outage',
  MajorOutage = 'major_outage',
  Initialization = 'initialization'
}

export enum IncidentStatuses{
  Investigating = 'investigating',
  Identified = 'identified',
  Monitoring = 'monitoring',
  Resolved = 'resolved',
  Scheduled = 'scheduled',
  InProgress = 'in_progress',
  Verifying = 'verifying',
  Completed = 'completed'
}

export const LiveStatusesData: Record<LiveStatuses, { color: appPalette; messageId: string }> = {
  [LiveStatuses.Operational]: {
    color: appPalette.green,
    messageId: 'LiveStatus.tooltip.noIncidents',
  },
  [LiveStatuses.PartialOutage]: {
    color: appPalette.yellow,
    messageId: 'LiveStatus.tooltip.activeIncidents',
  },
  [LiveStatuses.MajorOutage]: {
    color: appPalette.red,
    messageId: 'LiveStatus.tooltip.activeIncidents',
  },
  [LiveStatuses.Initialization]: {
    color: appPalette.gray,
    messageId: null,
  },
};

/* eslint-disable camelcase */
export interface Incident{
  id: string;
  name: string;
  status: IncidentStatuses;
  created_at: string;
  updated_at: string;
  monitoring_at: string;
  resolved_at: string;
  impact: string;
  shortlink: string;
  started_at: string;
  page_id: string;
  incident_updates: any[];
  components: StatusComponent[];
}

export interface StatusComponent{
  id: string;
  name: string;
  status: string;
  created_at: string;
  updated_at: string;
  position: number;
  description: string;
  showcase: boolean;
  start_date: string;
  group_id: string;
  page_id: string;
  group: string;
  only_show_if_degraded: boolean;
}
/* eslint-enable camelcase */

export interface IncidentsUnresolvedRequest{
  page: any;
  incidents: Incident[];
}

export function checkLiveStatus(statusPageSummary: IncidentsUnresolvedRequest): LiveStatuses {
  if (!statusPageSummary || !Array.isArray(statusPageSummary.incidents)) {
    return null;
  }

  const { incidents } = statusPageSummary;

  if (incidents.length === 0) {
    return LiveStatuses.Operational;
  }

  return incidents.reduce<LiveStatuses>((result, current) => {
    if (result === LiveStatuses.MajorOutage) {
      return result;
    }

    const hasPrioritizedComponents = current.components.some((item) => [DashboardComponentId, ApiSdkComponentId].includes(item.id));
    if (hasPrioritizedComponents) {
      return LiveStatuses.MajorOutage;
    }

    return LiveStatuses.PartialOutage;
  }, LiveStatuses.Operational);
}
