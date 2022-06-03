import React, { useMemo } from 'react';
import { Box, ListItem, FormLabel, FormControl } from '@material-ui/core';
import classnames from 'classnames';
import { FixedSizeNodeComponentProps } from 'react-vtree';
import { FiPlusCircle, FiMinusCircle } from 'react-icons/fi';
import { ReactComponent as CheckboxOff } from 'assets/icon-checkbox-off.svg';
import { ReactComponent as CheckboxPartial } from 'assets/icon-checkbox-partial.svg';
import { ReactComponent as CheckboxOn } from 'assets/icon-checkbox-on.svg';
import { useStyles, StyledCheckbox } from './CountryModalItemSelect.styles';
import { IListItemData } from '../../models/CountryModalSelect.model';

interface ICountryModalSelectItemProps extends FixedSizeNodeComponentProps<{
  hasChildren: boolean;
  location: string;
  countryCode?: string;
  id: string | symbol;
  isOpenByDefault: boolean;
  label: string;
}> {
  treeData?: IListItemData;
}
export const CountryModalItemSelect = ({
  style,
  isOpen,
  toggle,
  data,
  treeData,
}: ICountryModalSelectItemProps) => {
  const classes = useStyles();
  const { hasChildren, location, countryCode, label } = data;
  const { selectedCountries, handleSelectCountry, allRegionsSelected, flat } = treeData;

  const parentCheckIcon = useMemo(() => {
    if (Object.prototype.hasOwnProperty.call(allRegionsSelected, location)) {
      return allRegionsSelected[location] ? <CheckboxOn /> : <CheckboxPartial />;
    }
    return <CheckboxOn />;
  }, [allRegionsSelected, location]);

  return (
    <ListItem style={style} className={classnames(classes.listItem, { [classes.listItemChild]: countryCode }, { [classes.lineConnected]: !countryCode && !flat })}>
      {hasChildren && (
        <Box mr={0.5} className={classes.iconButton} onClick={toggle}>
          {isOpen ? <FiMinusCircle className={classes.icon} /> : <FiPlusCircle className={classes.icon} />}
        </Box>
      )}
      <FormLabel
        className={classnames(classes.listName, { [classes.listNameChild]: countryCode, [classes.noRegions]: !countryCode && !hasChildren, [classes.listNameChildFlat]: flat })}
        htmlFor="name"
      >
        {label}
      </FormLabel>
      <Box ml={0.5}>
        <FormControl>
          <StyledCheckbox
            disableRipple
            onChange={(_, checked) => handleSelectCountry(checked, location, countryCode)}
            name={location}
            checked={countryCode ? Boolean(selectedCountries[countryCode]?.[location]) : Boolean(selectedCountries[location])}
            color="primary"
            checkedIcon={parentCheckIcon}
            icon={<CheckboxOff />}
          />
        </FormControl>
      </Box>
    </ListItem>
  );
};
