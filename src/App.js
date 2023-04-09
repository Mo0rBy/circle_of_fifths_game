import * as d3 from "d3";
import './App.css'

import CircleOfFifths from "./components/CircleOfFifths/CircleOfFifths";
import './components/CircleOfFifths/CircleOfFifths.css'

const circleRadius = 400
const numSectors = 12

export default function App() {
  const diameter = circleRadius * 2
  return (
    <div className="svg-container">
      <CircleOfFifths outerRadius={circleRadius} numSectors={numSectors}/>
    </div>
  );
}
