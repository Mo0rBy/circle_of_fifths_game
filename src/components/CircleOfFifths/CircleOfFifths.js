import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { C_Major, G_Major } from '../../MusicKeys';

// export default function CircleOfFifths({ outerRadius, numSectors }) {
export default function CircleOfFifths() {

  const outerRadius = 400;
  const numSectors = 12;

  // const diameter = outerRadius * 2;
  const diameter = 2000;
  const innerRadius = outerRadius * 0.6;
  const sectorAngle = (Math.PI * 2) / numSectors
  // const data = Object.values(C_Major);
  const data = ["C", "G", "D", "A", "E", "B", "F#", "C#", "A♭", "E♭", "B♭", "F"]
  // const data = [25, 50, 30, 46];
  var angles = [];

  const svgRef = useRef();

  // Adds the startAngle and endAngle of each segment to an array
  // Uses cumulativeAngle to keep track of each segment
  var cumulativeAngle = 0;
  for (let i =0; i<data.length; i++) {
    let startAngle = cumulativeAngle;
    cumulativeAngle += sectorAngle;
    let endAngle = cumulativeAngle;
    angles.push({startAngle, endAngle});
  }

  const arcGenerator = d3.arc()
                      .innerRadius(innerRadius)
                      .outerRadius(outerRadius);

  useEffect(() => {
    const circleSegments = d3.selectAll('.circle-segment');

    circleSegments
      .data(angles)
      .attr('d', function(angle){ 
        return arcGenerator(
          {startAngle: angle.startAngle, endAngle: angle.endAngle}
        );}
      );
  }, [])

  // TODO: Import music keys data (just try 1 array of chords first e.g. C Major)
  //       Map the chords to segments of the circle. Does D3 make this easier to 
  //       calculate the pathData that goes in the 'd' attribute??

  // TODO: Create/remove segements when new music key data is used

  return (
    <svg ref={svgRef}
      height={diameter}
      width={diameter}>
        <g transform='translate(400,400)'>
          {angles.map(angle => <path className='circle-segment' stroke='red'/>)}
        </g>
      {/* <circle
        r={radius}
        cx={radius} cy={radius}
        className="base-circle">
      </circle> */}
    </svg>
  )
}