import Map from 'ol/Map'
import { FC, useEffect, useRef } from 'react'
import { getMap, updateMap } from './utils'

interface Props {
  latitude: number
  longitude: number
}

export const OlMap: FC<Props> = ({ latitude, longitude }) => {
  const mapRef = useRef<Map | null>(null)

  useEffect(() => {
    console.log(longitude, latitude);
    
    if ((mapRef?.current) != null) {
      updateMap(longitude, latitude)
    } else {
      mapRef.current = getMap(longitude, latitude)
    }
  }, [latitude, longitude])

  return (
    <div id='map' />
  )
}
