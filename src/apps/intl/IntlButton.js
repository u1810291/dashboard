import { MenuItem } from '@material-ui/core';
import { TopMenuItem } from 'apps/navigation';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dashboardUpdate } from 'state/merchant/merchant.actions';
import { selectLanguage } from 'state/merchant/merchant.selectors';
import { LanguageList } from './Intl.model';
import { SelectLight, useStyles } from './IntlButton.styles';

export function IntlButton() {
  const currentLocale = useSelector(selectLanguage);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleLangChange = useCallback((e) => {
    dispatch(dashboardUpdate({
      language: e.target.value,
    }));
  }, [dispatch]);

  return (
    <TopMenuItem>
      <SelectLight
        disableUnderline
        className={classes.select}
        value={currentLocale}
        renderValue={() => currentLocale.toUpperCase()}
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
