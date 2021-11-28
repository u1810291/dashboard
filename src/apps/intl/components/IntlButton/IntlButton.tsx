import { Box, MenuItem } from '@material-ui/core';
import { LanguageList } from 'models/Intl.model';
import { QATags } from 'models/QA.model';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeLanguage } from 'state/merchant/merchant.actions';
import { selectLanguage } from 'state/merchant/merchant.selectors';
import { IoEarthOutline } from 'react-icons/all';
import { SelectLight, useStyles } from 'apps/intl/components/IntlButton/IntlButton.styles';

export function IntlButton({ isSync = true, fullLabel = false }: {isSync?: boolean; fullLabel?: boolean}) {
  const currentLocale = useSelector(selectLanguage);
  const dispatch = useDispatch();
  const classes = useStyles({ fullLabel });

  const handleLangChange = useCallback((e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    dispatch(changeLanguage(e.target.value, isSync));
  }, [dispatch, isSync]);

  const renderLocale = useCallback(() => (
    fullLabel ? LanguageList.find((obj) => obj.locale === currentLocale).label : currentLocale
  ), [currentLocale, fullLabel]);

  return (
    <Box mb={fullLabel ? 0 : 3.3} display="flex" className={classes.topMenuItem}>
      <IoEarthOutline className={classes.menuIcon} />
      <SelectLight
        disableUnderline
        className={classes.select}
        MenuProps={{ classes: { paper: classes.menuList } }}
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
    </Box>
  );
}
