import './CircleOfFifths.css';
import { useState } from 'react';
import { arc } from 'd3';
import musicKeys from './MusicKeys';

export default function CircleOfFifths({ outerRadius }) {

  // TODO:
  // PLAN
  // 1. Clicking 'PLAY GAME' button causes game to start (half done)
  // 2. When game starts, 1 segment disappears, set this into app state
  // 3. Player gives an answer, compare that to missing object stored in state.
  // 4. If it is correct, something to indicate that the player is correct, then play again
  // 5. If the player is correct, something to show they are wrong, keep playing

  const diameter = outerRadius * 2;
  const innerRadius = outerRadius * 0.7;
  const innerRadius2 = outerRadius * 0.4;

  const READY = 'ready';
  const PLAYING = 'playing';

  const [mode, setMode] = useState(READY);
  const [musicKeysObject, setMusicKeysObject] = useState(musicKeys);
  const [hiddenSegment, setHiddenSegment] = useState(null);

  const calculateArc = (innerRadius, outerRadius, startAngle, endAngle) => {
    return arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)
      .startAngle(startAngle)
      .endAngle(endAngle);
  }

  /* ---------------------------- Render functions ---------------------------- */
  const renderMajorSegment = (musicKey, index) => {
    let arc = calculateArc(outerRadius, innerRadius, musicKey.segmentMetadata.startAngle, musicKey.segmentMetadata.endAngle);
    let [arcCenterX, arcCenterY] = arc.centroid();

    return <g className={`circle-segment ${musicKey.segmentMetadata.majorCircle.isVisible ? 'isVisible': ''}`} 
              key={index}>
            <path 
              d={arc.apply()} // apply() is needed to generate the string that goes into the 'd' attribute
            />
            <text x={arcCenterX} y={arcCenterY} transform={`rotate(15, ${arcCenterX}, ${arcCenterY})`}>
              {abbreviateKeyFromChord(musicKey.chords[0])}
            </text>
          </g>
  }

  const renderMinorSegment = (musicKey, index) => {
    let arc = calculateArc(innerRadius, innerRadius2, musicKey.segmentMetadata.startAngle, musicKey.segmentMetadata.endAngle);
    let [arcCenterX, arcCenterY] = arc.centroid();

    return <g className={`circle-segment ${musicKey.segmentMetadata.minorCircle.isVisible ? 'isVisible': ''}`} 
              key={index}>
            <path 
              d={arc.apply()} // apply() is needed to generate the string that goes into the 'd' attribute
            />
            <text x={arcCenterX} y={arcCenterY} transform={`rotate(15, ${arcCenterX}, ${arcCenterY})`}>
              {abbreviateKeyFromChord(musicKey.chords[5])}
            </text>
          </g>
  }
  /* ------------------------------------ - ----------------------------------- */
  const abbreviateKeyFromChord = (chordName) => {
    return chordName.replace(' Major', '').replace(' minor', 'm');
  }

  const startRound = () => {
    let newMusicKeysObject = musicKeysObject;
    let segmentIndex = Math.round(Math.random() * 11);
    if (Math.random() >= 0.5) { // Modify the Major circle
      newMusicKeysObject[segmentIndex].segmentMetadata.majorCircle.isVisible = false;
      setHiddenSegment({...newMusicKeysObject[segmentIndex], major: true})
    } else { // Modify the minor circle
      newMusicKeysObject[segmentIndex].segmentMetadata.minorCircle.isVisible = false;
      setHiddenSegment({...newMusicKeysObject[segmentIndex], major: false})
    }
    setMusicKeysObject([...newMusicKeysObject])
    setMode(PLAYING)
  }

  const handleInput = (event) => {
    var index;
    if (hiddenSegment.major) {
      index = 0;
    } else {
      index = 5;
    }

    if (event.key === 'Enter') {
      if (event.target.value === abbreviateKeyFromChord(hiddenSegment.chords[index])) {
        console.log('CORRECT');
      } else {
        console.log('WRONG');
      }
    }
  };


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
          {mode === READY && 
            <g id='play-button-container' onMouseUp={startRound}>
              <circle r={innerRadius2} id='play-button'/>
              <text id='play-button-text' transform='rotate(15)'>PLAY GAME</text>
            </g>}
        </g>
      </svg>
      {mode === PLAYING &&
        <input placeholder='Your answer' onKeyDown={handleInput}></input>
      }
    </div>
  )
}