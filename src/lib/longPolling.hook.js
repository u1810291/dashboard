import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { MerchantTags } from 'models/Merchant.model';
import { selectMerchantTags } from 'state/merchant/merchant.selectors';

export function useLongPolling(callback, interval = 20000, { isCheckMerchantTag = true, isUseFirstInvoke = true, isDone = false } = {}) {
  const tags = useSelector(selectMerchantTags);

  useEffect(() => {
    let result;
    let timer;

    if (!isCheckMerchantTag || tags.includes(MerchantTags.CanUseLongPolling)) {
      if (isDone) {
        return callback(false);
      }
      console.log('tags', tags);
      if (isUseFirstInvoke) {
        // first invoke
        result = callback(false);
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
  }, [tags, callback, interval, isCheckMerchantTag, isUseFirstInvoke, isDone]);
}
