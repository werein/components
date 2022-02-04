import React, { Fragment, useEffect } from "react";
import { useMap } from "./mapkit-provider";

export type AnnotationType = {
  key?: string | number;
  latitude: number;
  longitude: number;
} & mapkit.MarkerAnnotationConstructorOptions;

export type MapsAnnotationsProps = {
  annotations: Array<AnnotationType>;
};

export default function MapsAnnotations(props: MapsAnnotationsProps) {
  const { map, mapkit } = useMap();
  const { annotations } = props;

  useEffect(() => {
    if (map) {
      const mapAnnotations = annotations.map(
        ({ latitude, longitude, key, ...rest }) =>
          new mapkit.MarkerAnnotation(
            new mapkit.Coordinate(latitude, longitude),
            {
              clusteringIdentifier: `${latitude}x${longitude}`,
              ...rest,
              data: { ...rest.data, key },
            }
          )
      );

      const currentKeys = map.annotations.map((a) => a.data.key);
      const keys = annotations.map((a) => a.key);

      map.annotations
        .filter((a) => !keys.includes(a.data.key))
        .forEach((a) => map.removeAnnotation(a));
      mapAnnotations
        .filter((a) => !currentKeys.includes(a.data.key))
        .forEach((a) => map.addAnnotation(a));
    }
  }, [map, annotations]);

  return <Fragment />;
}
