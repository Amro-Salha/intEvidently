import axios from 'axios'
import GeoMap from 'GeoMap'
import { useEffect, useState } from 'react'
import { Topology } from 'topojson-specification'
import './App.css'
import {AxiosResponse} from "axios/index";

const App = () => {
  const [cities, setCities] = useState<Geo.CityState[]>([])

  useEffect(() => {
    axios.get('http://localhost:8331/api/cities')
      .then((response: AxiosResponse<Geo.CityResponse[]>) => {
        setCities(response.data.map((raw): Geo.CityState => ({
          meta: {
            labelRect: null,
          },
          city: {
            ...raw,
            coordinates: {
              longitude: raw.coord.lon,
              latitude: raw.coord.lat,
            },
          }
        })))
      })
  },[])


  if (cities.length === 0) {
    return null
  }

  return (
    <div className="app">
      <GeoMap cities={cities} />
    </div>
  )
}

export default App;
