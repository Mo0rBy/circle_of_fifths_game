import { useEffect, useState } from 'react';
import musicKeys from '../../MusicKeys';
import * as d3 from 'd3';

// export default function CircleOfFifths({ outerRadius, numSectors }) {
export default function CircleOfFifths() {

  const outerRadius = 400;

  // const diameter = outerRadius * 2;
  const diameter = 980;
  const innerRadius = outerRadius * 0.6;

  const [musicKeysObject, setMusicKeysObject] = useState(musicKeys);

  useEffect(() => {
    let newMusicKeysObject = musicKeysObject;
    for (let i=0; i<newMusicKeysObject.length; i++) {
      newMusicKeysObject[i].segmentMetadata.selected = true;
    }
    setMusicKeysObject([...newMusicKeysObject]);
  }, [])

  const onMouseUpHandler = (index) => {
    let newMusicKeysObject = musicKeysObject;
    if (newMusicKeysObject[index].segmentMetadata.selected) {
      newMusicKeysObject[index].segmentMetadata.selected = false;
    } else {
      newMusicKeysObject[index].segmentMetadata.selected = true;
    }
    setMusicKeysObject([...newMusicKeysObject]);
  }

  const calculateArc = (startAngle, endAngle) => {
    return d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)
      .startAngle(startAngle)
      .endAngle(endAngle);
  }

  const renderSegment = (musicKey, index) => {
    let arc = calculateArc(musicKey.segmentMetadata.startAngle, musicKey.segmentMetadata.endAngle);
    let [arcCenterX, arcCenterY] = arc.centroid();
    if (musicKey.segmentMetadata.selected === true) {
      return <g key={index} onMouseUp={() => onMouseUpHandler(index)}>
              <path 
                d={arc.apply()} // apply() is needed to generate the string that goes into the 'd' attribute
                stroke='red'
                fillOpacity={0.05}
              />
              <text x={arcCenterX} y={arcCenterY} rotate={15}>
                {musicKey.chords[0].replace('Major', '')}
              </text>
            </g>
    }
  }

  return (
    <div>
      <svg
        height={diameter}
        width={diameter}>
        <g className='circle-container' transform='translate(400,400)'>
          <circle r={outerRadius} className="base-circle" fillOpacity={0.1}/>
          <g className='circle-segments-container' transform='rotate(-15)'>
            {musicKeysObject.map((musicKey, index) => renderSegment(musicKey, index))}
          </g>
        </g>
      </svg>
    </div>
  )
}