import { Switch } from '@material-ui/core';
import { ExtendedDescription } from 'apps/ui';
import React from 'react';
import { useIntl } from 'react-intl';
import { DeviceFingerPrintSettingTypes } from '../../models/DeviceFingerPrint.model';

export function DeviceFingerPrintSettings() {
  const intl = useIntl();

  return (
    <ExtendedDescription
      title={intl.formatMessage({ id: `DeviceFingerPrint.settings.${DeviceFingerPrintSettingTypes.Advanced}.title` })}
      text={intl.formatMessage({ id: `DeviceFingerPrint.settings.${DeviceFingerPrintSettingTypes.Advanced}.description` })}
      isDisabled
      postfix={(
        <Switch
          checked={false}
          color="primary"
          disabled
        />
      )}
    />
  );
}
