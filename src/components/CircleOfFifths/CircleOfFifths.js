import './CircleOfFifths.css';
import { useState } from 'react';
import { arc } from 'd3';
import musicKeys from './MusicKeys';
import classNames from 'classnames';

export default function CircleOfFifths({ outerRadius }) {

  // TODO:
  // PLAN
  // 1. If player is correct, start a new round
  // 2. If player is correct, whole circle turns green for 0.5 seconds, then start new round
  // 3. If player is wrong, circle flashes red twice

  const diameter = outerRadius * 2;
  const innerRadius = outerRadius * 0.7;
  const innerRadius2 = outerRadius * 0.4;

  const READY = 'ready';
  const PLAYING = 'playing';
  const CORRECT = 'correct';
  const WRONG = 'wrong';

  const [mode, setMode] = useState(READY);
  const [musicKeysObject, setMusicKeysObject] = useState(musicKeys);
  const [hiddenSegment, setHiddenSegment] = useState(null);
  const [userAnswer, setUserAnswer] = useState(null);

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

    var segmentClasses = classNames(
      'circle-segment',
      {'isVisible': musicKey.segmentMetadata.majorCircle.isVisible},
      {'correct-answer': userAnswer === CORRECT},
      {'wrong-answer': userAnswer === WRONG}
    );

    return <g className={segmentClasses} key={index}>
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

    var segmentClasses = classNames(
      'circle-segment',
      {'isVisible': musicKey.segmentMetadata.minorCircle.isVisible},
      {'correct-answer': userAnswer === CORRECT},
      {'wrong-answer': userAnswer === WRONG}
    );

    return <g className={segmentClasses} key={index}>
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
    // Reset segment visibilties (show all segments)
    for (let i=0; i<newMusicKeysObject.length; i++) {
      newMusicKeysObject[i].segmentMetadata.majorCircle.isVisible = true;
      newMusicKeysObject[i].segmentMetadata.minorCircle.isVisible = true;
    }

    // Hide 1 segment
    let segmentIndex = Math.round(Math.random() * 11);
    if ((Math.random() - 1) >= 0) { // Modify the Major circle
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
        // Show the correct answer segment (can modify both major and minor circle, 1 will already be visible anyway)
        hiddenSegment.segmentMetadata.majorCircle.isVisible = true;
        hiddenSegment.segmentMetadata.minorCircle.isVisible = true;
        setUserAnswer(CORRECT);
        setTimeout(() => {
          setUserAnswer(null);
          startRound();
        }, 1000);
      } else {
        setUserAnswer(WRONG);
        setTimeout(() => {
          setUserAnswer(null);
        }, 1000);
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