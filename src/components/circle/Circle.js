import './Circle.css'

export default function Circle({radius}) {

  const outerRadius = radius
  const innerRadius = radius * 0.75
  const centerRadius = radius * 0.5

  return (
  <div className='circle-of-fifths-outer' style={{width: outerRadius, height: outerRadius}}>
    <div className='circle-of-fifths-inner' style={{width: innerRadius, height: innerRadius}}>
      <div className='circle-of-fifths-center' style={{width: centerRadius, height: centerRadius}}>
        circle of fifths
      </div>
    </div>
  </div>
  )
}