import { Switch } from '@material-ui/core';
import { IpCheckConfig } from 'apps/ipCheck/models/IpCheck.model';
import { ProductSettingsProps } from 'models/Product.model';
import React, { useCallback } from 'react';

export function IpCheckSettings({ product, settings, onUpdate }: ProductSettingsProps<IpCheckConfig>) {
  // eslint-disable-next-line no-console
  console.log('--ipchekc settings', settings);

  const handleClick = useCallback(() => {
    onUpdate({
      value: 123,
    });
  }, [onUpdate]);

  return (
    <div>
      <div>{product.getTitle()}</div>
      <Switch
        name="ipCheck"
        color="primary"
        size="small"
        onChange={handleClick}
      />
    </div>
  );
}
