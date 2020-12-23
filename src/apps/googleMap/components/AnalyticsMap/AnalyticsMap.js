import { Box, Paper } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { GeographicalAreasControlForward } from './GeographicalAreasControl/GeographicalAreasControl';
import { InformationSourceControlForward } from './InformationSourceControl/InformationSourceControl';
import { CountriesControlForward } from './CountriesControl/CountriesControl';
import { useStyles } from './AnalyticsMap.styles';
import { GOOGLE_MAP_REQUIRED_CONTAINER_ID, InformationSourceTypes } from '../../models/googleMap.model';

export const AnalyticsMap = () => {
  const geocoder = window?.google?.maps && new window.google.maps.Geocoder();
  const intl = useIntl();
  const geographicalAreasControlRef = useRef();
  const informationSourceControlRef = useRef();
  const countriesControlRef = useRef();
  const mapRef = useRef();
  const classes = useStyles();
  const [isCountriesControlOpen, setIsCountriesControlOpen] = useState(false);
  const [informationSource, setInformationSource] = useState(InformationSourceTypes.Documents);

  useEffect(() => {
    mapRef.current = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 4,
      disableDefaultUI: true,
    });
    // [intl] is needed for changing language of map controls
  }, [intl]);

  useEffect(() => {
    const mapRefCurrent = mapRef.current;
    if (mapRefCurrent) {
      mapRefCurrent.controls[window.google.maps.ControlPosition.TOP_LEFT].push(geographicalAreasControlRef.current);
      mapRefCurrent.controls[window.google.maps.ControlPosition.LEFT_BOTTOM].push(informationSourceControlRef.current);
      mapRefCurrent.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(countriesControlRef.current);
    }
    // [intl] is needed for changing language of map controls
  }, [intl]);

  if (!window?.google?.maps) {
    return null;
  }

  return (
    <Paper>
      <Box id={GOOGLE_MAP_REQUIRED_CONTAINER_ID} height={500} borderRadius={5} />
      <Box className={classes.hiddenControlForwards}>
        <GeographicalAreasControlForward ref={geographicalAreasControlRef} isCountriesControlOpen={isCountriesControlOpen} />
        <InformationSourceControlForward
          ref={informationSourceControlRef}
          isCountriesControlOpen={isCountriesControlOpen}
          informationSource={informationSource}
          setInformationSource={setInformationSource}
        />
        <CountriesControlForward
          ref={countriesControlRef}
          geocoder={geocoder}
          map={mapRef.current}
          isCountriesControlOpen={isCountriesControlOpen}
          setIsCountriesControlOpen={setIsCountriesControlOpen}
          informationSource={informationSource}
        />
      </Box>
    </Paper>
  );
};
