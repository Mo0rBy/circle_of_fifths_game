import './CircleOfFifths.css';
import { useEffect, useState } from 'react';
import { arc } from 'd3';
import musicKeys from '../../MusicKeys';

export default function CircleOfFifths({ outerRadius }) {

  const diameter = outerRadius * 2;
  const innerRadius = outerRadius * 0.7;
  const innerRadius2 = outerRadius * 0.4;

  const [mode, setMode] = useState('ready');
  const [musicKeysObject, setMusicKeysObject] = useState(musicKeys);
  const [userAnswer, setUserAnswer] = useState(null);

  useEffect(() => {
    let newMusicKeysObject = musicKeysObject;
    for (let i=0; i<newMusicKeysObject.length; i++) {
      newMusicKeysObject[i].segmentMetadata.majorCircle.isVisible = true;
      newMusicKeysObject[i].segmentMetadata.minorCircle.isVisible = true;
    }
    setMusicKeysObject([...newMusicKeysObject]);
  }, [])

  const calculateArc = (innerRadius, outerRadius, startAngle, endAngle) => {
    return arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)
      .startAngle(startAngle)
      .endAngle(endAngle);
  }

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

  const renderMajorSegment = (musicKey, index) => {
    let arc = calculateArc(outerRadius, innerRadius, musicKey.segmentMetadata.startAngle, musicKey.segmentMetadata.endAngle);
    let [arcCenterX, arcCenterY] = arc.centroid();

    return <g className={`circle-segment ${musicKey.segmentMetadata.majorCircle.isVisible ? 'isVisible': ''}`} key={index} onMouseUp={() => majorOnMouseUpHandler(index)}>
            <path 
              d={arc.apply()} // apply() is needed to generate the string that goes into the 'd' attribute
            />
            <text x={arcCenterX} y={arcCenterY} transform={`rotate(15, ${arcCenterX}, ${arcCenterY})`}>
              {musicKey.chords[0].replace(' Major', '')}
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
            <text x={arcCenterX} y={arcCenterY} transform={`rotate(15, ${arcCenterX}, ${arcCenterY})`}>
              {musicKey.chords[5].replace(' minor', 'm')}
            </text>
          </g>
  }

  const playFunction = () => {
    let newMusicKeysObject = musicKeysObject;
    let segmentIndex = Math.round(Math.random() * 11);
    if (Math.random() >= 0.5) { // Modify the Major circle
      newMusicKeysObject[segmentIndex].segmentMetadata.majorCircle.isVisible = false;
    } else { // Modify the minor circle
      newMusicKeysObject[segmentIndex].segmentMetadata.minorCircle.isVisible = false;
    }
  }

  const handle = (event) => {
    setUserAnswer(event.target.value)
    console.log(event.target.value)
  }

  return (
    <div className='circle-of-fifths-container'>
      <svg
        height={diameter*1.1}
        width={diameter*1.1}>
        <g className='circle-container' transform={`translate(${diameter/2 + 25},${diameter/2 + 25}) rotate(-15)`}>
          <circle r={outerRadius} className='base-circle'/>
          <g className='outer-circle-segments-container'>
            {musicKeysObject.map((musicKey, index) => renderMajorSegment(musicKey, index))}
          </g>
          <g className='inner-circle-segments-container'>
            {musicKeysObject.map((musicKey, index) => renderMinorSegment(musicKey, index))}
          </g>
          {mode === 'ready' && 
            <g id='play-button-container' onMouseUp={() => {setMode('playing')}}>
              <circle r={innerRadius2} id='play-button'/>
              <text id='play-button-text' transform='rotate(15)'>PLAY GAME</text>
            </g>}
          {mode === 'playing' ? playFunction() : null}
        </g>
      </svg>
      {mode === 'playing' &&
        <input type='text' onChange={(event) => handle(event)}/>
      }
    </div>
  )
}