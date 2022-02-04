import { useState } from "react";
import Geocode from "react-geocode";
import { useMap } from "../maps/mapkit-provider";
import { useLanguage } from "./language";

export type GeocoderPlace = {
  formattedAddress: string;
  placeId: string;
  geometry: any;
};

export async function getPlaceFromLocation({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}): Promise<GeocoderPlace | undefined> {
  try {
    const response = await Geocode.fromLatLng(
      latitude.toString(),
      longitude.toString()
    );

    const [result] = response.results;

    return {
      formattedAddress: result.formatted_address,
      placeId: result.place_id,
      geometry: result.geometry,
    };
  } catch (error) {}
}

export async function getPlaceFromAddress(
  address: string
): Promise<GeocoderPlace | undefined> {
  try {
    const response = await Geocode.fromAddress(address);

    const [result] = response.results;

    return {
      formattedAddress: result.formatted_address,
      placeId: result.place_id,
      geometry: result.geometry,
    };
  } catch (error) {}
}

export default function useGeocode(lang = "cs") {
  const { REACT_APP_GOOGLE_MAPS_KEY = "" } = process.env;

  Geocode.setApiKey(REACT_APP_GOOGLE_MAPS_KEY);

  Geocode.setLanguage(lang);
  Geocode.enableDebug();

  const [place, setPlace] = useState<GeocoderPlace | undefined>(undefined);

  async function placeFromLocation({
    latitude,
    longitude,
  }: {
    latitude: number;
    longitude: number;
  }) {
    const result = await getPlaceFromLocation({ latitude, longitude });
    setPlace(result);
    return result;
  }

  async function fromAddress(address: string) {
    const result = await getPlaceFromAddress(address);
    setPlace(result);
    return result;
  }

  return {
    place,
    placeFromLocation,
    fromAddress,
  };
}

type Address = {
  formattedAddres: string;
  longitude: number;
  latitude: number;
};

export function useMapkitGeocode() {
  const [place, setPlace] = useState<mapkit.Place | undefined>(undefined);
  const { geocoder, mapkit } = useMap();
  const { lang } = useLanguage();

  async function placeFromLocation({
    latitude,
    longitude,
  }: {
    latitude: number;
    longitude: number;
  }) {
    if (geocoder) {
      const result = await new Promise<mapkit.Place>((resolve, reject) => {
        geocoder.reverseLookup(
          new mapkit.Coordinate(latitude, longitude),
          (error, data) => {
            if (error) reject(error);

            resolve(data.results[0]);
          },
          { language: lang }
        );
      });
      setPlace(result);
      return result;
    }
    return undefined;
  }

  async function fromAddress(address: string) {
    if (geocoder) {
      const result = await new Promise<mapkit.Place>((resolve, reject) => {
        geocoder.lookup(
          address,
          (error, data) => {
            if (error) reject(error);

            resolve(data.results[0]);
          },
          { language: lang }
        );
      });
      setPlace(result);
      return result;
    }
    return undefined;
  }

  return {
    place,
    placeFromLocation,
    fromAddress,
  };
}
