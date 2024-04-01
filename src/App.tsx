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
        // Получение координат пользователя
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setCoords({
          latitude,
          longitude,
        });

        // Отправка координат в сервис-воркер
        // if (navigator.serviceWorker.controller) {
        //   navigator.serviceWorker.controller.postMessage({
        //     type: "geolocation",
        //     coords: { latitude, longitude },
        //   });
        // }
      }, (err) => {
        console.error(`ERROR(${err.code}): ${err.message}`);
      }, {
        enableHighAccuracy: false,
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
    Notification.permission;
  }, []);

  return <OlMap latitude={coords.latitude} longitude={coords.longitude} />;
}

export default App;
