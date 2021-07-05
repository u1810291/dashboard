import { Box, Button, Grid } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { selectChartStatisticsModel, selectIpCheckStatistics } from 'apps/Analytics/state/Analytics.selectors';
import { appPalette } from 'apps/theme/app.palette';
import cn from 'classnames';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FiChevronDown, FiMenu, FiX } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { selectCountriesList } from 'state/countries/countries.selectors';
import markerIcon from '../../assets/marker.svg';
import { changeCountriesStructureForCountriesControl, getGeoStatisticsLabel, InformationSourceTypes } from '../../models/googleMap.model';
import { useStyles } from './CountriesControl.styles';

export function CountriesControl({ geocoder, map, setIsCountriesControlOpen, isCountriesControlOpen, informationSource }, ref) {
  const intl = useIntl();
  const classes = useStyles();
  const markersRef = useRef();
  const countriesList = useSelector(selectCountriesList);
  const { value: statistics } = useSelector(selectChartStatisticsModel);
  const [countries, setCountries] = useState([]);
  const [activeCountryId, setActiveCountryId] = useState(null);
  const [areCitiesVisible, setAreCitiesVisible] = useState(true);
  const isDesktop = useMediaQuery('(min-width:960px)', { noSsr: true });
  const { value: ipCheckStatistics } = useSelector(selectIpCheckStatistics);
  const geoJsonRef = useRef();

  const centerMap = useCallback((location, geojson) => {
    const markers = markersRef.current || [];
    map.setCenter(location);

    if (geoJsonRef.current && geoJsonRef.current.setMap) {
      geoJsonRef.current.setMap(null);
    }
    geoJsonRef.current = new window.google.maps.Data({ map });
    geoJsonRef.current.addGeoJson(geojson);
    geoJsonRef.current.setStyle({
      fillOpacity: 0,
      strokeColor: appPalette.redorange,
      strokeWeight: 0.8,
    });

    markers.forEach((marker) => marker.setMap(null));
    markers.push(
      new window.google.maps.Marker({
        position: location,
        icon: markerIcon,
        map,
      }),
    );
    markersRef.current = markers;
  }, [map]);

  // TODO @grigorev add IpCheck
  // useEffect(() => {
  //   dispatch(getIpCheckStatistics(metricsFilter));
  // }, [dispatch, metricsFilter]);

  useEffect(() => {
    if (informationSource === InformationSourceTypes.Documents) {
      setCountries(changeCountriesStructureForCountriesControl(statistics.byCountry));
    } else {
      setCountries(ipCheckStatistics);
    }
  }, [statistics, ipCheckStatistics, informationSource]);

  useEffect(() => {
    setActiveCountryId(countries[0]?.code);
  }, [countries]);

  useEffect(() => {
    const country = countriesList.find((item) => item.id === activeCountryId);
    if (country && country.name && geocoder?.geocode) {
      geocoder.geocode({ address: country.name }, (res) => {
        if (map && res && res[0]) {
          centerMap(res[0].geometry.location, country?.geojson);
        }
      });
    }
  }, [activeCountryId, geocoder, map, centerMap, countriesList]);

  const handleCountryClick = useCallback((id) => {
    if (id === activeCountryId) {
      setAreCitiesVisible((prev) => !prev);
    } else {
      setActiveCountryId(id);
      setAreCitiesVisible(true);
    }
  }, [activeCountryId]);

  const toggleIsOpen = useCallback(() => {
    setIsCountriesControlOpen((prev) => !prev);
  }, [setIsCountriesControlOpen]);

  if (!countries?.length) {
    return <Box ref={ref} />;
  }

  return (
    <Box ref={ref} className={classes.wrapper}>
      {!isDesktop && (
        isCountriesControlOpen ? (
          <Button className={classes.buttonClose} onClick={toggleIsOpen}>
            <FiX />
          </Button>
        ) : (
          <Button className={classes.button} onClick={toggleIsOpen}>
            <FiMenu />
          </Button>
        )
      )}
      {(isDesktop || isCountriesControlOpen) && (
        <Box className={classes.countriesControlWrapper}>
          {countries.map((country, index) => (
            <Box key={country.code}>
              <Grid
                container
                wrap="nowrap"
                className={cn(classes.countriesControl, {
                  [classes.countriesControlActive]: country.code === activeCountryId,
                })}
                onClick={() => handleCountryClick(country.code)}
              >
                <Box mr={2} fontSize={14} color="common.black7">
                  {`${index + 1}. `}
                  {intl.formatMessage({ id: `Countries.${country.code}` })}
                </Box>
                <Box ml="auto" mr={2.7} fontSize={14} color="common.black7" whiteSpace="nowrap">
                  {getGeoStatisticsLabel(country.percentage, country.count)}
                </Box>
                {country.cities && (
                  <Box
                    color="common.black7"
                    className={cn(classes.countriesArrow, {
                      [classes.countriesArrowExpanded]: country.code === activeCountryId && areCitiesVisible,
                    })}
                  >
                    <FiChevronDown />
                  </Box>
                )}
              </Grid>
              <Box>
                {country.cities && country.code === activeCountryId && areCitiesVisible && country.cities.map((city) => (
                  <Grid container wrap="nowrap" className={classes.countriesCities} key={city.name}>
                    <Box mx={2} fontSize={14} color="common.black7">
                      {city.name}
                    </Box>
                    <Box ml="auto" mr={2.7} fontSize={14} color="common.black7" whiteSpace="nowrap">
                      {getGeoStatisticsLabel(city.percentage, city.count)}
                    </Box>
                  </Grid>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}

export const CountriesControlForward = React.forwardRef(CountriesControl);
