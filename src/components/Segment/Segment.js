export default function Segment({ pathData, keyName }) {
  return (
    <path d={pathData} fill='blue' stroke='red'>
      <p>{keyName}</p>
    </path>
  )
}