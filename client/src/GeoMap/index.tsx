import axios from "axios";
import { geoPath, rgb, select } from "d3";
import { useCallback, useEffect, useRef, useState, type FC } from "react";
import { feature } from "topojson-client";
import "./Map.css";
import createCities from "./createCities";

type GeoMapProps = {
  cities: Geo.CityState[];
};

const path = geoPath();

const GeoMap: FC<GeoMapProps> = (props) => {
  const { cities } = props;
  const containerRef = useRef<SVGSVGElement | null>(null);
  const [states, setStates] = useState<string[]>([]);
  const [isMapHovered, setIsMapHovered] = useState(false);
  const [isStateHovered, setStateIsHovered] = useState(false);

  const draw = useCallback(async () => {
    const { data } = await axios.get("http://localhost:8331/api/map");

    const nextStates = data.objects.states.geometries.map((state: Parameters<typeof feature>[1]) => path(feature(data, state)))
    setStates(nextStates);

    const { current } = containerRef;
    if (current) {
      const svg = select(current);
      createCities(cities, svg);
    }
  }, []);


  useEffect(() => {
    draw().catch((error) => {
      throw new Error(`Failed to Draws: ${error}`);
    });
  }, [draw]);

  const onMouseEnterMap = useCallback(() => {
    setIsMapHovered(true)
  }, []);

  const onMouseLeaveMap = useCallback(() => {
    setIsMapHovered(false)
  }, []);


  const onMouseEnterState = useCallback(() => {
    setStateIsHovered(true)
  }, []);

  const onMouseLeaveState = useCallback(() => {
    setStateIsHovered(false)
  }, []);

  return (
      <svg
        className="map"
        ref={containerRef}
        viewBox="0 0 1000 600"
      >
        <g onMouseEnter={onMouseEnterMap} onMouseLeave={onMouseLeaveMap} fill="#EFF7CF" stroke="#A53860" strokeLinejoin="round" strokeLinecap="round">
          {states.map((state) => (
            <path
              key={state}
              onMouseEnter={onMouseEnterState}
              onMouseLeave={onMouseLeaveState}
              fill={!isStateHovered && isMapHovered ? '#CED5B2' : "#EFF7CF"}
              strokeWidth="1"
              d={state}
            />
          ))}
        </g>
      </svg>
  );
};

export default GeoMap;
