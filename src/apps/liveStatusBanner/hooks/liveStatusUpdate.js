import { requestStatus } from 'apps/liveStatusBanner/api/liveStatus.api';
import { findStatus, LiveStatusTypes } from 'apps/liveStatusBanner/models/liveStatus.model';
import { useCallback, useEffect, useState } from 'react';

export function useLiveStatusUpdate(updateIntervalMs = 120000) {
  const [status, setStatus] = useState(LiveStatusTypes.Loading);

  const updateStatus = useCallback(async () => {
    try {
      const { data } = await requestStatus();
      const foundStatus = findStatus(data?.status?.description);
      setStatus(foundStatus);
    } catch (error) {
      setStatus(LiveStatusTypes.Loading);
    }
  }, []);

  useEffect(() => {
    updateStatus();

    const interval = setInterval(() => updateStatus(), updateIntervalMs);

    return () => clearInterval(interval);
  }, [updateIntervalMs, updateStatus]);

  return [status];
}
