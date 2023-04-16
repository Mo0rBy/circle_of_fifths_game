import { useState } from 'react';
import { arc } from 'd3';
import musicKeys from '../../MusicKeys';

// export default function CircleOfFifths({ outerRadius, numSectors }) {
export default function CircleOfFifths() {

  const outerRadius = 400;

  // const diameter = outerRadius * 2;
  const diameter = 980;
  const innerRadius = outerRadius * 0.6;

  const [musicKeysObject, setMusicKeysObject] = useState(musicKeys);

  const arcGenerator = arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

  const renderSegment = (musicKey) => {
    if (musicKey.segmentMetadata.selected === true) {
      return <path d={arcGenerator({ startAngle: musicKey.segmentMetadata.startAngle, endAngle: musicKey.segmentMetadata.endAngle })} />
    }
  }

  const onClickHandler = () => {
    console.log('Button was clicked!');
    let newMusicKeysObject = musicKeysObject;
    musicKeysObject.map((musicKey, index) => {
      if (index === 8 || index === 11) {
        newMusicKeysObject[index].segmentMetadata.selected = true;
        setMusicKeysObject([...newMusicKeysObject]);
      }
    })
  }

  return (
    <div>
      <svg
        height={diameter}
        width={diameter}>
        <g className='circle-container' transform='translate(400,400)'>
          <circle r={outerRadius} className="base-circle" />
          <g className='circle-segments-container' transform='rotate(-15)'>
            {musicKeysObject.map(musicKey => renderSegment(musicKey))}
          </g>
        </g>
      </svg>
      <button onClick={onClickHandler}>
        Click me!
      </button>
    </div>
  )
}