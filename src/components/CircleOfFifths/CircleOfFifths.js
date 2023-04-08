export default function CircleOfFifths({radius}) {

  const diameter = radius * 2

  // TODO: Import music keys data (just try 1 array of chords first e.g. C Major)
  //       Map the chords to segments of the circle. Does D3 make this easier to 
  //       calculate the pathData that goes in the 'd' attribute??

  // TODO: Create/remove segements when new music key data is used

  return (
    <svg // Base circle
      height={diameter}
      width={diameter}>
      <circle
        r={radius}
        cx={radius} cy={radius}
        className="base-circle">
      </circle>
    </svg>
  )
}