import './CircleOfFifths.css';
import { useEffect, useState } from 'react';
import * as d3 from 'd3';
import musicKeys from '../../MusicKeys';

export default function CircleOfFifths({ outerRadius }) {

  const diameter = outerRadius * 2;
  const innerRadius = outerRadius * 0.7;
  const innerRadius2 = outerRadius * 0.4;

  const [musicKeysObject, setMusicKeysObject] = useState(musicKeys);

  useEffect(() => {
    let newMusicKeysObject = musicKeysObject;
    for (let i=0; i<newMusicKeysObject.length; i++) {
      newMusicKeysObject[i].segmentMetadata.majorCircle.isVisible = true;
      newMusicKeysObject[i].segmentMetadata.minorCircle.isVisible = true;
    }
    setMusicKeysObject([...newMusicKeysObject]);
  }, [])

  const majorOnMouseUpHandler = (index) => {
    let newMusicKeysObject = musicKeysObject;
    if (newMusicKeysObject[index].segmentMetadata.majorCircle.isVisible) {
      newMusicKeysObject[index].segmentMetadata.majorCircle.isVisible = false;
    } else {
      newMusicKeysObject[index].segmentMetadata.majorCircle.isVisible = true;
    }
    setMusicKeysObject([...newMusicKeysObject]);
  }

  const minorOnMouseUpHandler = (index) => {
    let newMusicKeysObject = musicKeysObject;
    if (newMusicKeysObject[index].segmentMetadata.minorCircle.isVisible) {
      newMusicKeysObject[index].segmentMetadata.minorCircle.isVisible = false;
    } else {
      newMusicKeysObject[index].segmentMetadata.minorCircle.isVisible = true;
    }
    setMusicKeysObject([...newMusicKeysObject]);
  }

  const calculateArc = (innerRadius, outerRadius, startAngle, endAngle) => {
    return d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)
      .startAngle(startAngle)
      .endAngle(endAngle);
  }

  const renderMajorSegment = (musicKey, index) => {
    let arc = calculateArc(outerRadius, innerRadius, musicKey.segmentMetadata.startAngle, musicKey.segmentMetadata.endAngle);
    let [arcCenterX, arcCenterY] = arc.centroid();

    return <g className={`circle-segment ${musicKey.segmentMetadata.majorCircle.isVisible ? 'isVisible': ''}`} key={index} onMouseUp={() => majorOnMouseUpHandler(index)}>
            <path 
              d={arc.apply()} // apply() is needed to generate the string that goes into the 'd' attribute
            />
            {/* Need to adjust center X position due to increased font-size */}
            <text x={arcCenterX-10} y={arcCenterY} rotate={15}>
              {musicKey.chords[0].replace('Major', '')}
            </text>
          </g>
  }

  const renderMinorSegment = (musicKey, index) => {
    let arc = calculateArc(innerRadius, innerRadius2, musicKey.segmentMetadata.startAngle, musicKey.segmentMetadata.endAngle);
    let [arcCenterX, arcCenterY] = arc.centroid();

    return <g className={`circle-segment ${musicKey.segmentMetadata.minorCircle.isVisible ? 'isVisible': ''}`} key={index} onMouseUp={() => minorOnMouseUpHandler(index)}>
            <path 
              d={arc.apply()} // apply() is needed to generate the string that goes into the 'd' attribute
            />
            {/* Need to adjust center X position due to increased font-size */}
            <text x={arcCenterX-10} y={arcCenterY} rotate={15}>
              {musicKey.chords[5].replace('minor', '')}
            </text>
          </g>
  }

  return (
    <div className='circle-of-fifths-container'>
      <svg
        height={diameter*1.1}
        width={diameter*1.1}>
        <g className='circle-container' transform={`translate(${diameter/2 + 25},${diameter/2 + 25})`}>
          <circle r={outerRadius} className="base-circle"/>
          <g className='outer-circle-segments-container' transform='rotate(-15)'>
            {musicKeysObject.map((musicKey, index) => renderMajorSegment(musicKey, index))}
          </g>
          <g className='inner-circle-segments-container' transform='rotate(-15)'>
            {musicKeysObject.map((musicKey, index) => renderMinorSegment(musicKey, index))}
          </g>
        </g>
      </svg>
    </div>
  )
}