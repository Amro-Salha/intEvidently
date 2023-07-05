import { geoAlbersUsa, select, type Selection, type BaseType } from 'd3'

const width = 975
const height = 610
const projection = geoAlbersUsa()
  .scale(1300)
  .translate([width / 2, height / 2])

const transformCity = <T extends Geo.CityState>(topCity: T) => {
  const { latitude, longitude } = topCity.city.coordinates
  const coord = projection([longitude, latitude])
  return `translate(${coord?.join(',') ?? 0})`
}

const createTooltip = (cities: Selection<BaseType | SVGGElement, Geo.CityState, d3.BaseType, unknown>) => {

  const tooltip = cities
    .append('g')
    .classed('tooltip', true)
    .attr('x', (topCity) => {
      const { labelRect } = topCity.meta
      if (!labelRect) {
        return 0
      }

      return labelRect.width / -2
    })
    .attr('cursor', 'default')
    .attr('display', 'none')

  tooltip
    .append('rect')
    .attr('width', (topCity) => {
      const { labelRect } = topCity.meta
      if (!labelRect) {
        return 0
      }

      return labelRect.width + 6
    })
    .attr('rx', 2)
    .attr('height', (topCity) => {
      const { labelRect } = topCity.meta
      if (!labelRect) {
        return 0
      }

      return labelRect.height + 2
    })
    .attr('position', 'relative')
    .attr('fill', '#0B4F6C')
    .attr('transform', (topCity) => {
      const { labelRect } = topCity.meta
      if (!labelRect) {
        return 'unset'
      }
      return `translate(${(labelRect.width / -2) - 3}, ${(labelRect.height / -1) - 5})`
    })

  tooltip
    .append('text')
    .attr('fill', '#FDCA40')
    .attr('font-family', 'sans-serif')
    .attr('font-size', 12)
    .attr('y', -7)
    .text((topCity) => topCity.city.name)
    .attr('text-anchor', 'middle')
}

const createCities = (cities: Geo.CityState[], svg: d3.Selection<SVGSVGElement, unknown, null, undefined>) => {
  const citiesSVG = svg
    .selectAll('.city')
    .data(cities)
    .join('g')
    .attr('transform', transformCity)
    .classed('city', true)

  const text = citiesSVG
    .append('text')
    .attr('font-family', 'sans-serif')
    .attr('font-size', 12)
    .text((city) => city.city.name)

  text
    .each(function (data) {
      data.meta.labelRect = this.getBBox()
    })

  svg
    .selectAll('text')
    .remove()

  createTooltip(citiesSVG)

  citiesSVG
    .append('circle')
    .attr('r', 2)
    .attr('fill', '#0B4F6C')

  citiesSVG
    .append('circle')
    .attr('r', 4)
    .attr('fill', 'transparent')
    .on('mouseover', function (u,d) {
      if (this.parentNode instanceof Element) {
        select(this.parentNode)
          .selectAll('.tooltip')
          .attr('display', 'block')
      }
    })
    .on('mouseout', function () {
      if (this.parentNode instanceof Element) {
        select(this.parentNode)
          .selectAll('.tooltip')
          .attr('display', 'none')
      }
    })
}

export default createCities