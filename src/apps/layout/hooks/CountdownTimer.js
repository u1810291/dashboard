import { useCallback, useEffect, useState } from 'react';

export function useCountdownTimer(timeoutSeconds = 3, onTimerEnd, updateTickMs = 1000, isCanceled) {
  const [progressPercent, setProgressPercent] = useState(0);
  const [progressLabel, setProgressLabel] = useState(timeoutSeconds);
  const [msPassed, setMsPassed] = useState(0);
  const [isTimerEnded, setIsTimerEnded] = useState(false);
  const [intervalTimer, setIntervalTimer] = useState(null);
  const calculateProgress = useCallback((passed, timeout) => ((passed / 1000) / timeout) * 100, []);

  useEffect(() => {
    if (intervalTimer && isCanceled) {
      clearInterval(intervalTimer);
    }
  }, [intervalTimer, isCanceled]);

  useEffect(() => {
    const newTimer = setInterval(() => {
      const newMsSecond = msPassed + updateTickMs;
      setMsPassed(newMsSecond);

      if (msPassed / 1000 >= timeoutSeconds) {
        clearInterval(newTimer);
        if (onTimerEnd && !isTimerEnded && !isCanceled) {
          setIsTimerEnded(true);
          onTimerEnd();
        }
        setProgressPercent(100);
        return;
      }

      if (newMsSecond % 1000 === 0) {
        setProgressLabel((prevProgressLabel) => prevProgressLabel - 1);
      }

      setProgressPercent(calculateProgress(msPassed, timeoutSeconds));
    }, updateTickMs);

    setIntervalTimer(newTimer);

    return () => {
      clearInterval(newTimer);
      setIntervalTimer(null);
    };
  }, [calculateProgress, isCanceled, isTimerEnded, msPassed, onTimerEnd, progressLabel, progressPercent, timeoutSeconds, updateTickMs]);

  return [progressLabel, progressPercent];
}
