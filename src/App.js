import './App.css'
import CircleOfFifths from "./components/CircleOfFifths/CircleOfFifths";

const circleRadius = 400

export default function App() {
  return (
    <CircleOfFifths outerRadius={circleRadius}/>
  );
}
