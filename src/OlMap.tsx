import Map from 'ol/Map'
import { FC, useEffect, useRef } from 'react'
import { getMap, updateMap } from './utils'

interface Props {
  latitude: number
  longitude: number
  heading: number
}

export const OlMap: FC<Props> = ({ latitude, longitude, heading }) => {
  const mapRef = useRef<Map | null>(null)

  useEffect(() => {
    console.log(longitude, latitude, heading);
    
    if ((mapRef?.current) != null) {
      updateMap(longitude, latitude, heading)
    } else {
      mapRef.current = getMap(longitude, latitude)
    }
  }, [heading, latitude, longitude])

  return (
    <div id='map' />
  )
}
