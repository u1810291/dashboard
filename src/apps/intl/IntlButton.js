import { MenuItem } from '@material-ui/core';
import { TopMenuItem } from 'apps/navigation';
import { get } from 'lodash';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveConfiguration } from 'state/merchant';
import { LanguageList } from './Intl.model';
import { SelectLight, useStyles } from './IntlButton.styles';

export function IntlButton() {
  const currentLocale = useSelector((state) => get(state, 'merchant.configuration.dashboard.language'));
  const dashboard = useSelector((state) => get(state, 'merchant.configuration.dashboard'));
  const token = useSelector((state) => get(state, 'auth.token'));
  const dispatch = useDispatch();
  const classes = useStyles();

  function handleLangChange(e) {
    dispatch(saveConfiguration(token, {
      dashboard: {
        ...dashboard,
        language: e.target.value,
      },
    }));
  }

  function getLocale() {
    return currentLocale.toUpperCase();
  }

  return (
    <TopMenuItem>
      <SelectLight
        className={classes.select}
        value={currentLocale}
        renderValue={getLocale}
        onChange={handleLangChange}
      >
        {LanguageList.map((item) => (
          <MenuItem key={item.locale} value={item.locale}>
            {item.label}
          </MenuItem>
        ))}
      </SelectLight>
    </TopMenuItem>
  );
}
