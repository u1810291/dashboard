import { Switch } from '@material-ui/core';
import { ExtendedDescription } from 'apps/ui';
import { cloneDeep } from 'lodash';
import { ProductSettingsProps } from 'models/Product.model';
import React, { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { IpCheckSettingsTypes } from '../../models/IpCheck.model';

export function IpCheckSettings({ settings, onUpdate }: ProductSettingsProps<IpCheckSettingsTypes>) {
  const intl = useIntl();
  const [vpn, setVpn] = useState<boolean>(false);

  useEffect(() => {
    setVpn(settings?.vpnAndProxy.value);
  }, [settings]);

  const handleClick = useCallback((e) => {
    const newSettings = cloneDeep(settings);
    newSettings[IpCheckSettingsTypes.VpnAndProxy].value = e.target.checked;
    onUpdate(newSettings);
  }, [onUpdate, settings]);

  return (
    <ExtendedDescription
      title={intl.formatMessage({ id: `IpCheck.settings.${IpCheckSettingsTypes.VpnAndProxy}.title` })}
      text={intl.formatMessage({ id: `IpCheck.settings.${IpCheckSettingsTypes.VpnAndProxy}.description` })}
      postfix={(
        <Switch
          checked={vpn}
          onClick={handleClick}
          color="primary"
        />
      )}
    />
  );
}
