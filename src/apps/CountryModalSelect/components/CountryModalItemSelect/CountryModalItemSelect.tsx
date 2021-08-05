import React, { useMemo } from 'react';
import { Box, ListItem, FormLabel, FormControl } from '@material-ui/core';
import { useIntl } from 'react-intl';
import classnames from 'classnames';
import { FixedSizeNodeComponentProps } from 'react-vtree';
import { FiPlusCircle, FiMinusCircle } from 'react-icons/fi';
import { ReactComponent as CheckboxOff } from 'assets/icon-checkbox-off.svg';
import { ReactComponent as CheckboxPartial } from 'assets/icon-checkbox-partial.svg';
import { ReactComponent as CheckboxOn } from 'assets/icon-checkbox-on.svg';
import { useStyles, StyledCheckbox } from './CountryModalItemSelect.styles';
import { SelectedCountries } from '../../models/CountryModalSelect.model';

export interface CountryModalSelectItemProps extends FixedSizeNodeComponentProps<{
  isLeaf: boolean;
  name: string;
  countryCode?: string;
  id: string | symbol;
  isOpenByDefault: boolean;
 }> {
  treeData?: {
    selectedCountries: SelectedCountries;
    allRegionsSelected: {
      [country: string]: boolean;
    };
    firstCountryId: string;
    handleSelectCountry: (country: string, region?: string) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
}
export const CountryModalItemSelect = ({
  style,
  isOpen,
  toggle,
  data,
  treeData,
}: CountryModalSelectItemProps) => {
  const intl = useIntl();
  const classes = useStyles();
  const { isLeaf, name, countryCode } = data;
  const { selectedCountries, handleSelectCountry, allRegionsSelected, firstCountryId } = treeData;

  const parentCheckIcon = useMemo(() => {
    if (Object.prototype.hasOwnProperty.call(allRegionsSelected, name)) {
      return allRegionsSelected[name] ? <CheckboxOn /> : <CheckboxPartial />;
    }
    return <CheckboxOn />;
  }, [allRegionsSelected, name]);
  return (
    <ListItem style={style} className={classnames(classes.listItem, { [classes.listItemChild]: isLeaf }, { [classes.lineConnected]: !isLeaf && (firstCountryId !== name) })}>
      {!isLeaf && (
        <Box mr={0.5} className={classes.iconButton} onClick={toggle}>
          {isOpen ? <FiMinusCircle className={classes.icon} /> : <FiPlusCircle className={classes.icon} />}
        </Box>
      )}
      <FormLabel className={classnames(classes.listName, { [classes.listNameChild]: isLeaf })}>
        {isLeaf ? `${name.toUpperCase()}: "${intl.formatMessage({ id: `Regions.${countryCode}.${name}` })}"` : intl.formatMessage({ id: `Countries.${name}` }) }
      </FormLabel>
      <Box ml={2}>
        <FormControl>
          <StyledCheckbox
            disableRipple
            onChange={isLeaf ? handleSelectCountry(countryCode, name) : handleSelectCountry(name)}
            value={name}
            checked={isLeaf ? !!selectedCountries[countryCode]?.[name] : !!selectedCountries[name]}
            color="primary"
            checkedIcon={parentCheckIcon}
            icon={<CheckboxOff />}
          />
        </FormControl>
      </Box>
    </ListItem>
  );
};
