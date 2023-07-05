declare namespace Geo {
  type City = {
    id: number
    name: string
    country: string
    coordinates: Coordinates
  }

  type Coordinates = {
    latitude: number
    longitude: number
  }

  type CityMeta = {
    labelRect: DOMRect | null
  }

  type CityState = {
    city: City
    meta: CityMeta
  }

  type CoordResponse = {
    lat: number
    lon: number
  }

  type CityResponse = {
    id: number
    name: string
    country: string
    coord: CoordResponse
  }
}
