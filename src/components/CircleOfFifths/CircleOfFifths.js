import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import musicKeys from '../../MusicKeys'

// export default function CircleOfFifths({ outerRadius, numSectors }) {
export default function CircleOfFifths() {

  const outerRadius = 400;

  // const diameter = outerRadius * 2;
  const diameter = 2000;
  const innerRadius = outerRadius * 0.6;
  const data = ["C", "G", "D", "A", "E", "B", "F#", "C#", "A♭", "E♭", "B♭", "F"]

  const svgRef = useRef();

  console.log(musicKeys)

  const arcGenerator = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

  useEffect(() => {
    const circleSegments = d3.selectAll('.circle-segment');

    circleSegments
      .data(musicKeys)
      .attr('d', function(key){ 
        return arcGenerator(
          {startAngle: key.segmentMetadata.startAngle, endAngle: key.segmentMetadata.endAngle}
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
      <g className='circle-container' transform='translate(400,400)'>
        <circle r={outerRadius} className="base-circle" />
        <g className='circle-segments-container' transform='rotate(-15)'>
          {musicKeys.map(key => <path className='circle-segment' stroke='red'/>)}
        </g>
      </g>
    </svg>
  )
}