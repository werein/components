import { captureEvent, ErrorBoundary } from "@sentry/react";
import React, { useContext, useEffect, useState } from "react";
import { useLanguage } from "../utils/language";

export const Mapkit = React.createContext<any>({});
interface MapkitContexProps {
  mapkit: typeof mapkit;
  gMaps: typeof google.maps;
  map: mapkit.Map | undefined;
  geocoder: mapkit.Geocoder | undefined;
  setMap: (m: mapkit.Map) => void;
  isReady: boolean;
}

const { REACT_APP_GOOGLE_MAPS_KEY = "" } = process.env;

export function useMap(mapRef?: React.MutableRefObject<HTMLDivElement | null>) {
  const { mapkit, map, setMap, geocoder, gMaps, isReady } =
    useContext<MapkitContexProps>(Mapkit);

  useEffect(() => {
    if (isReady) {
      if (mapRef?.current) {
        const map = new mapkit.Map(mapRef.current);
        map.annotationForCluster = function (clusterAnnotation: any) {
          clusterAnnotation.color =
            clusterAnnotation.memberAnnotations[0].color;
        };
        setMap(map);
      }
    }
  }, [mapRef, isReady]);

  return {
    isReady,
    map,
    mapkit,
    geocoder,
    gMaps,
  };
}

const onLoad = (c: () => void) => {
  window.mapkit &&
    window.mapkit.init({
      authorizationCallback: async (cb: (token: string) => void) => {
        try {
          const result = await fetch("/apple-jwt");
          const { token } = await result.json();
          cb(token);
          c();
        } catch (error: any) {
          captureEvent(error);
        }
      },
    });
};

export const MapkitProvider = ({ children }: any) => {
  const [map, setMap] = useState<mapkit.Map | undefined>(undefined);
  const { lang } = useLanguage();
  const [isGoogleMapsLoaded, setGoogleMapsLoaded] = useState(false);
  const [isAppleMapsLoaded, setAppleMapsLoaded] = useState(false);

  useEffect(() => {
    if (window.mapkit) {
      window.mapkit.language = lang;
    }
  }, [lang]);

  useEffect(() => {
    (window as any).google = null;
    const script = document.createElement("script");

    script.src = `https://maps.googleapis.com/maps/api/js?key=${REACT_APP_GOOGLE_MAPS_KEY}&libraries=places,geocode&language=${lang}`;
    script.async = true;
    script.onload = () => {
      setGoogleMapsLoaded(true);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    (window as any).google = null;
    const script = document.createElement("script");

    script.src = `/mapkit.js`;
    script.async = true;
    script.onload = () => {
      onLoad(() => setAppleMapsLoaded(true));
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const mkit = window.mapkit;
  const gMaps = window.google?.maps;
  const places = gMaps ? gMaps.places : null;
  const geocoder = mkit ? new mkit.Geocoder() : null;

  return (
    <ErrorBoundary>
      <Mapkit.Provider
        value={{
          mapkit: mkit,
          gMaps,
          map,
          geocoder,
          setMap,
          isReady:
            isGoogleMapsLoaded &&
            isAppleMapsLoaded &&
            mkit &&
            geocoder &&
            places,
        }}
      >
        {children}
      </Mapkit.Provider>
    </ErrorBoundary>
  );
};

export default MapkitProvider;
