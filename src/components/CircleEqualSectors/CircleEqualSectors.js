export default function CircleEqualSectors({ radius, numSectors }) {

  const diameter = radius * 2

  // Using 2Pi Radians here, not 360 degrees
  function getCoordinatesForPercent(percent) {
    // Need to add coordinates for the center of the circle
    const x = radius + (Math.cos(2 * Math.PI * percent) * radius)
    const y = radius + (Math.sin(2 * Math.PI * percent) * radius)
    return [x, y]
  }

  var sectors = []
  let cumulativePercent = 0
  const percentRoundCircle = 1 / numSectors

  for (let i = 0; i < numSectors; i++) {
    const [startX, startY] = getCoordinatesForPercent(cumulativePercent)
    cumulativePercent += percentRoundCircle
    const [endX, endY] = getCoordinatesForPercent(cumulativePercent)

    const xAxisRotation = 0
    const largeArcFlag = percentRoundCircle > 0.5 ? 1 : 0
    const sweepFlag = 1
    const pathData = [
      `M ${radius} ${radius}`, // Move to centre of circle
      `L ${startX} ${startY}`, // Draw line to first point
      `A ${radius} ${radius} ${xAxisRotation} ${largeArcFlag} ${sweepFlag} ${endX} ${endY}`, // Draw arc to next point
      `L ${radius} ${radius}` // Draw line back to centre of circle
    ].join(' ')
    sectors.push({ key: i, pathData: pathData })
  }

  return (
    <div>
      <svg height={diameter} width={diameter}>
        <circle r={radius} cx={radius} cy={radius} fill="grey"/>
        <path d={sectors[0].pathData}/>
        {sectors.map(sector => 
          <path d={sector.pathData} stroke="red" fill='blue'/>
        )}
      </svg>
    </div>
  )
}