import CircleEqualSectors from './components/CircleEqualSectors/CircleEqualSectors';

const circleRadius = 400
const numSectors = 12

export default function App() {
  return (
    <div className="App">
      <CircleEqualSectors radius={circleRadius} numSectors={numSectors}/>
    </div>
  );
}
