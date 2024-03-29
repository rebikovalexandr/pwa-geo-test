import Map from 'ol/Map';
import { FC, useEffect, useRef } from 'react';
import { getMap } from './utils';

type Props = {
  latitude: number;
  longitude: number;
}


export const OlMap: FC<Props> = ({latitude, longitude}) => {
  const mapRef = useRef<Map | null>(null);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current = null
    }
    if (latitude && longitude) {
      const map = getMap(longitude,latitude);
      mapRef.current = map;
    }
  }, [latitude, longitude]);

  return (
    <div id="map"></div>
  );
};

