import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { MerchantTags } from 'models/Merchant.model';
import { selectMerchantTags } from 'state/merchant/merchant.selectors';

export function useLongPolling(
  callback: (isReload: boolean) => void,
  interval: number = 20000,
  { isCheckMerchantTag = true, isUseFirstInvoke = true, isDone = false }: {
    isCheckMerchantTag?: boolean;
    isUseFirstInvoke?: boolean;
    isDone?: boolean;
  } = {},
) {
  const [isUseFirstInvokeDone, setIsUseFirstInvokeDone] = useState<boolean>(false);
  const tags = useSelector(selectMerchantTags);

  useEffect(() => {
    let result;
    let timer;

    if (!isCheckMerchantTag || tags.includes(MerchantTags.CanUseLongPolling)) {
      if (isUseFirstInvoke && !isUseFirstInvokeDone) {
        result = callback(true);
        setIsUseFirstInvokeDone(true);
      }

      if (isDone) {
        return callback(false);
      }

      timer = setInterval(() => {
        result = callback(true);
      }, interval);
      return () => {
        if (timer) {
          clearInterval(timer);
        }
        if (result && typeof result === 'function') {
          result();
        }
      };
    }
    return callback(false);
  }, [tags, callback, interval, isCheckMerchantTag, isUseFirstInvokeDone, isUseFirstInvoke, isDone]);
}
