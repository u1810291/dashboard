import { useCallback, useEffect, useState } from 'react';
import { getSettingsValueByType } from 'apps/flowBuilder/models/FlowBuilder.model';

export function useSettingsBuffer<T extends string, S = any>(settings, initActions): [Record<T, any>, (settingId: T, newValue: S) => void] {
  const [isBufferInit, setIsBufferInit] = useState(false);
  const [bufferedSettings, setBufferedSettings] = useState<Record<T, any>>({} as Record<T, any>);

  const updateBufferedSettings = useCallback((settingId: T, newValue: S) => {
    setBufferedSettings(((prevState) => {
      const newState = { ...prevState };
      newState[settingId] = newValue;
      return newState;
    }));
  }, []);

  useEffect(() => {
    if (!isBufferInit && settings) {
      setBufferedSettings(getSettingsValueByType(settings));
      initActions();
      setIsBufferInit(true);
    }
  }, [isBufferInit, settings, initActions]);

  return [bufferedSettings, updateBufferedSettings];
}
