import { useEffect, useState } from "react";
import "./App.css";
import { OlMap } from "./OlMap";

function App() {
  const [coords, setCoords] = useState({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    let watchId: any = null
    if ("geolocation" in navigator) {
      watchId = navigator.geolocation.watchPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setCoords({
          latitude,
          longitude,
        });

      }, (err) => {
        console.error(`ERROR(${err.code}): ${err.message}`);
      }, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      });
    } else {
      alert("Ваше устройство не поддерживает API геолокации.");
    }

    return () => {
      navigator.geolocation.clearWatch(watchId);
    }
  }, []);


  useEffect(() => {
    if ('geolocation' in navigator) {
      console.log('geolocation in navigator');
      
      // Проверяем, включена ли геолокация в настройках браузера
      if (navigator.permissions && navigator.permissions.query) {
        navigator.permissions.query({ name: 'geolocation' }).then((permissionStatus) => {
          console.log('state: ', permissionStatus.state);
          
          if (permissionStatus.state === 'denied') {
            // Геолокация отключена пользователем
            console.log('Геолокация отключена. Для корректной работы приложения включите геолокацию в настройках телефона.');
          }
        });
      }
    } else {
      // Геолокация не поддерживается в этом браузере
      console.error('Геолокация не поддерживается в этом браузере');
    }
  }, []);

  return <OlMap latitude={coords.latitude} longitude={coords.longitude} />;
}

export default App;
