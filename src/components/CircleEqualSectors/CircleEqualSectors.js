import Segment from "../Segment/Segment"

export default function CircleEqualSectors({ outerRadius, numSectors }) {

  const diameter = outerRadius * 2
  const innerRadius = outerRadius * 0.6

  // Using 2Pi Radians here, not 360 degrees
  function getCoordinatesForPercent(percent, circleRadius) {
    // Need to add coordinates for the center of the main circle (determined by outerRadius)
    const x = outerRadius + (Math.cos(2 * Math.PI * percent) * circleRadius)
    const y = outerRadius + (Math.sin(2 * Math.PI * percent) * circleRadius)
    return [x, y]
  }

  var segments = []
  let cumulativePercent = 0
  const percentRoundCircle = 1 / numSectors

  for (let i = 0; i < numSectors; i++) {
    const [X1, Y1] = getCoordinatesForPercent(cumulativePercent, innerRadius)
    const [X2, Y2] = getCoordinatesForPercent(cumulativePercent, outerRadius)
    cumulativePercent += percentRoundCircle
    const [X3, Y3] = getCoordinatesForPercent(cumulativePercent, outerRadius)
    const [X4, Y4] = getCoordinatesForPercent(cumulativePercent, innerRadius)

    const xAxisRotation = 0
    const largeArcFlag = percentRoundCircle > 0.5 ? 1 : 0
    const pathData = [
      `M ${X1} ${Y1}`, // Move to innerRadius coordinate
      `L ${X2} ${Y2}`, // Draw line to outerRadius coordinate
      `A ${outerRadius} ${outerRadius} ${xAxisRotation} ${largeArcFlag} 1 ${X3} ${Y3}`, // Draw arc to next point (along outerRadius)
      `L ${X4} ${Y4}`, // Draw line innerRadius coordinate
      `A ${innerRadius} ${innerRadius} ${xAxisRotation} ${largeArcFlag} 0 ${X1} ${Y1}` // Draw arc back to starting point (along innerRadius)
    ].join(' ')
    segments.push({ key: i, pathData: pathData })
  }

  return (
    <div>
      <svg height={diameter} width={diameter}>
        <circle r={outerRadius} cx={outerRadius} cy={outerRadius} fill="grey"/>
        <path d={segments[0].pathData}/>
        {segments.map(segment => 
          <Segment pathData={segment.pathData}/>
        )}
      </svg>
    </div>
  )
}