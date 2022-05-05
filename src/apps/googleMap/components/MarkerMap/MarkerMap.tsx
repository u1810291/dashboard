// eslint-disable-next-line no-undef
import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';

// eslint-disable-next-line no-undef
const Marker: React.FC<google.maps.MarkerOptions> = (options) => {
  // eslint-disable-next-line no-undef
  const [marker, setMarker] = React.useState<google.maps.Marker>(null);
  useEffect(() => {
    if (!marker) {
      // eslint-disable-next-line no-undef
      setMarker(new google.maps.Marker());
    }
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }
  }, [marker, options]);

  return null;
};

// eslint-disable-next-line no-undef
interface MarkerMapProps extends google.maps.MapOptions {
  // eslint-disable-next-line no-undef
  position: google.maps.LatLngLiteral;
  className: string;
}

export const MarkerMap: React.FC<MarkerMapProps> = ({ center, position, className }) => {
  // eslint-disable-next-line no-undef
  const [map, setMap] = useState<google.maps.Map>(null);

  useEffect(() => {
    if (!map) {
      // @ts-ignore
      setMap(new window.google.maps.Map(document.getElementById('map'), {
        center,
        zoom: 10,
        zoomControl: true,
        // eslint-disable-next-line no-undef
        zoomControlOptions: { position: google.maps.ControlPosition.RIGHT_BOTTOM },
      }));
    }
  }, [map]);

  useEffect(() => {
    setMap(new window.google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      disableDefaultUI: true,
      center,
    }));
  }, [center]);
  return (
    <Box id="map" borderRadius={5} className={className}>
      <Marker position={position} map={map} />
    </Box>
  );
};
