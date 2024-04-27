import { useEffect, useRef, useState } from 'react'
import './App.css'
import { OlMap } from './OlMap'

function App () {
  const [isTracking, setIsTracking] = useState(false);
  const [coords, setCoords] = useState({
    latitude: 0,
    longitude: 0,
    heading: 0,
  })
  const watchId = useRef<number>()

  const toggleTracking = () => {
    setIsTracking(!isTracking);
    if (!isTracking) {
      // Начинаем отслеживать движение
      watchId.current = navigator.geolocation.watchPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const heading = position.coords.heading || coords.heading;

        setCoords({
          latitude,
          longitude,
          heading,
        });
      }, (err) => {
        console.error(`ERROR(${err.code}): ${err.message}`);
      }, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      });
    } else {
      // Останавливаем отслеживание движения
      watchId?.current && navigator.geolocation.clearWatch(watchId.current);
    }
  };

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude

        setCoords({
          latitude,
          longitude,
          heading: 0,
        })
      }, (err) => {
        console.error(`ERROR(${err.code}): ${err.message}`)
      }, {
        enableHighAccuracy: true,
      })
    } else {
      alert('Ваше устройство не поддерживает API геолокации.')
    }
  }, [])

  useEffect(() => {
    if ('geolocation' in navigator) {
      console.log('geolocation in navigator')

      // Проверяем, включена ли геолокация в настройках браузера
      if (navigator.permissions && navigator.permissions.query) {
        navigator.permissions.query({ name: 'geolocation' }).then((permissionStatus) => {
          console.log('state: ', permissionStatus.state)

          if (permissionStatus.state === 'denied') {
            // Геолокация отключена пользователем
            console.log('Геолокация отключена. Для корректной работы приложения включите геолокацию в настройках телефона.')

            // Предлагаем пользователю перейти в настройки
            if (window.confirm('Геолокация отключена. Хотите перейти в настройки?')) {
              window.open('app-settings:') // Для iOS
              // Для Android и некоторых браузеров
              window.open('intent://#Intent;package=com.android.settings;scheme=android_settings;end')
            }
          }
        })
      }
    } else {
      // Геолокация не поддерживается в этом браузере
      console.error('Геолокация не поддерживается в этом браузере')
    }
  }, [])

  return (
  <div className='container'>
      <button className='btn-watch' onClick={toggleTracking}>
        {isTracking ? 'Остановить отслеживание' : 'Начать отслеживание'}
      </button>
      <OlMap latitude={coords.latitude} longitude={coords.longitude} heading={coords.heading} />
  </div>
  )
}

export default App
