import { MenuItem } from '@material-ui/core';
import { TopMenuItem } from 'apps/layout';
import { LanguageList } from 'models/Intl.model';
import { QATags } from 'models/QA.model';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeLanguage } from 'state/merchant/merchant.actions';
import { selectLanguage } from 'state/merchant/merchant.selectors';
import { SelectLight, useStyles } from './IntlButton.styles';

export function IntlButton({ isSync = true, fullLabel = false }) {
  const currentLocale = useSelector(selectLanguage);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleLangChange = useCallback((e) => {
    dispatch(changeLanguage(e.target.value, isSync));
  }, [dispatch, isSync]);

  const renderLocale = useCallback(() => (
    fullLabel ? LanguageList.find((obj) => obj.locale === currentLocale).label : currentLocale
  ), [currentLocale, fullLabel]);

  return (
    <TopMenuItem className={classes.topMenuItem}>
      <SelectLight
        disableUnderline
        className={classes.select}
        value={currentLocale}
        renderValue={renderLocale}
        onChange={handleLangChange}
        data-value={currentLocale}
        data-qa={QATags.Menu.LanguageSelect}
      >
        {LanguageList.map((item) => (
          <MenuItem key={item.locale} value={item.locale} className={classes.selectItem}>
            {item.label}
          </MenuItem>
        ))}
      </SelectLight>
    </TopMenuItem>
  );
}
