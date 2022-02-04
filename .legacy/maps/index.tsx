import React, { PropsWithChildren, useEffect, useRef } from "react";
import { StyleObject, useStyletron } from "styletron-react";
import { useMap } from "./mapkit-provider";
export { default as Annotations } from "./annotations";
export { default as Circles } from "./circles";

export type MapProps = {
  latitude?: number;
  longitude?: number;
  latitudeDelta?: number;
  longitudeDelta?: number;
  style?: StyleObject;
};

export default function Maps(props: PropsWithChildren<MapProps>) {
  const { latitude, longitude, latitudeDelta, longitudeDelta, style } = props;
  const [css] = useStyletron();
  const mapRef = useRef<HTMLDivElement | null>(null);
  const { map } = useMap(mapRef);

  useEffect(() => {
    if (map && latitude && longitude) {
      if (
        !map.region.center.equals(new mapkit.Coordinate(latitude, longitude))
      ) {
        if (latitudeDelta && longitudeDelta) {
          map.region = new mapkit.CoordinateRegion(
            new mapkit.Coordinate(latitude, longitude),
            new mapkit.CoordinateSpan(latitudeDelta, longitudeDelta)
          );
        } else {
          console.log("ALERT");
          map.region = new mapkit.CoordinateRegion(
            new mapkit.Coordinate(latitude, longitude),
            new mapkit.CoordinateSpan(0.12, 0.12)
          );
        }
      } else {
        console.log("SAME");
      }
    }
  }, [map, latitude, longitude, latitudeDelta, longitudeDelta]);

  return (
    <div
      ref={mapRef}
      className={css({
        width: "100%",
        height: "100%",
        position: "absolute",
        ...style,
      })}
    >
      {props.children}
    </div>
  );
}
