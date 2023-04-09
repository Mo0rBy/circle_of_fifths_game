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

  // useEffect(() => {
  //   const svg = d3.select(svgRef.current);
  //   svg
  //     .selectAll("circle")
  //     .data(data)
  //     .join("circle")
  //     .attr("cx", "200")
  //     .attr("cy", "200")
  //     .attr("r", "50")
  //     .attr("stroke", "red");
  // }, [data])

  var cumulativeAngle = 0;
  for (let i =0; i<data.length; i++) {
    cumulativeAngle += sectorAngle;
    angles.push(cumulativeAngle);
  }

  const arc = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius)
    .startAngle(0)
    .endAngle(sectorAngle);

  console.log(arc);

  // TODO: Import music keys data (just try 1 array of chords first e.g. C Major)
  //       Map the chords to segments of the circle. Does D3 make this easier to 
  //       calculate the pathData that goes in the 'd' attribute??

  // TODO: Create/remove segements when new music key data is used

  return (
    <svg ref={svgRef}
      height={diameter}
      width={diameter}>
        <g transform='translate(400,400)'>
          {angles.map(angle => <path d={d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius)
    .startAngle(0)
    .endAngle(sectorAngle)} stroke='red'/>)}
          {/* <path d={arc()} stroke='red'/> */}
        </g>
      {/* <circle
        r={radius}
        cx={radius} cy={radius}
        className="base-circle">
      </circle> */}
    </svg>
  )
}