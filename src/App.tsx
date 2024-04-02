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
    Notification.permission;
  }, []);

  return <OlMap latitude={coords.latitude} longitude={coords.longitude} />;
}

export default App;
