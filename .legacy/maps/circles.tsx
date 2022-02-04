import React, { Fragment, useEffect } from "react";
import { useMap } from "./mapkit-provider";

export type MapsCirclesProps = {
  circles: Array<{
    latitude: number;
    longitude: number;
    radius?: number;
  }>;
};

export default function MapsCircles(props: MapsCirclesProps) {
  const { map, mapkit } = useMap();
  const { circles } = props;

  useEffect(() => {
    if (map) {
      const mapCircles = circles.map(
        (c) =>
          new mapkit.CircleOverlay(
            new mapkit.Coordinate(c.latitude, c.longitude),
            c.radius || 1000
          )
      );

      map.removeOverlays(map.overlays);
      map.addOverlays(mapCircles);
    }
  }, [map, circles]);

  return <Fragment />;
}
