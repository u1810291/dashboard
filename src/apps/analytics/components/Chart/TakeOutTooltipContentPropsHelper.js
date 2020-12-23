import React, { useEffect } from 'react';

export const TakeOutTooltipContentPropsHelper = ({ payload, setTooltipValue }) => {
  useEffect(() => {
    if (payload[0]) {
      setTooltipValue(payload[0].value);
    }
  }, [payload, setTooltipValue]);

  return (<></>);
};
