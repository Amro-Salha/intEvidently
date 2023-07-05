declare namespace Weather {
  /** Average weather measurement for data over time */
  type Average = {
    day: number
    high: number
    low: number
    rain: number
  }

  type Code =
    | '01'
    | '02'
    | '03'
    | '04'
    | '09'
    | '10'
    | '11'
    | '13'
    | '50'

  /** Human readable information on the weather */
  type Readable = {
    main: string
    description: string
    icon: `${Code}${'d' | 'n'}`
  }

  type Temperature = {
    /** kelvin */
    day: number
    /** kelvin */
    max: number
    /** kelvin */
    min: number
  }

  /** A weather measurement for a city at a time */
  export type Recording = {
    dateTime?: number
    /** hPa */
    pressure?: number
    /** percent */
    humidity?: number
    /** meters/second */
    windSpeed: number
    /** percent */
    clouds: number
    /** millimeters/hour */
    snow?:number
    /** millimeters/hour */
    rain?: number
    /** ultraviolet index */
    uvIndex?: number
    temperature: Temperature
    readable: Readable[]
  }
}
