import { useCallback, useEffect, useState } from 'react';
import { requestUnresolvedIncidents } from '../api/liveStatus.api';
import { checkLiveStatus, DefaultUpdateTime, LiveStatuses } from '../models/liveStatus.model';

export function useLiveStatusUpdate(updateIntervalMs = DefaultUpdateTime): LiveStatuses {
  const [status, setStatus] = useState<LiveStatuses>(LiveStatuses.Initialization);

  const updateStatus = useCallback(async () => {
    try {
      const { data } = await requestUnresolvedIncidents();
      const newStatus = checkLiveStatus(data);
      setStatus(newStatus);
    } catch (error) {
      setStatus(LiveStatuses.Initialization);
    }
  }, []);

  useEffect(() => {
    updateStatus();

    const interval = setInterval(() => updateStatus(), updateIntervalMs);

    return () => clearInterval(interval);
  }, [updateIntervalMs, updateStatus]);

  return status;
}
