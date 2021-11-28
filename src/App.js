import { useEffect, useState } from "react";
import Cell from "./Cell";

function App() {
  const [currentFill, setCurrentFill] = useState([]);
  const [startFill, setStartFill] = useState([]);
  const [validness, setValidness] = useState([]);
  useEffect(() => {
    const startingFill = [];
    const startingFillBoolean = [];
    const validnessTemp = [];
    for(let i=0; i<9; i++){
      startingFill.push([]);
      startingFillBoolean.push([]);
      validnessTemp.push([])
      for(let j=0; j<9; j++){
        validnessTemp[i].push(true)
        startingFillBoolean[i].push(false)
        startingFill[i].push("");
      }
    }
    for(let i=0; i<30; i++){
      let x = (Math.floor(Math.random()*9));
      let y = (Math.floor(Math.random()*9));
      let v = (Math.floor(Math.random()*9)+1);
      while(!isMoveValid(startingFill, [x,y], v)[0]){
        x = (Math.floor(Math.random()*9));
        y = (Math.floor(Math.random()*9));
        v = (Math.floor(Math.random()*9)+1);
      }
      console.log(isMoveValid(startingFill, [x,y], v)[0])
      validnessTemp[x][y] = true;
      startingFillBoolean[x][y] = true;
      startingFill[x][y] = v;
    }
    setStartFill(startingFillBoolean)
    setValidness(validnessTemp)
    setCurrentFill(startingFill);
  }, [])
  const handler = (inputValue, coords) => {
    const currentFillTemp = currentFill;
    const validnessTemp = validness;
    const mistakes = isMoveValid(currentFill, [coords[0], coords[1]], inputValue);
    if(mistakes[1].length !== 0) mistakes[1].forEach(v => validnessTemp[v[0]][v[1]] = false)
    if(mistakes[2].length !== 0) mistakes[2].forEach(v => validnessTemp[v[0]][v[1]] = true)
    if(!mistakes[0]) validnessTemp[coords[0]][coords[1]] = false;
    currentFillTemp[coords[0]][coords[1]] = inputValue;
    setCurrentFill(currentFillTemp);
    setValidness(validnessTemp);
  }
  return (
    <div className="App">
      {
        currentFill.map((data,i) => {
          const JSX = data.map((data1,j) => {
            console.log(isMoveValid(currentFill, [i,j], data1)[0]?"#fff":"#faa")
            return <Cell key={`${i} ${j}`} coords={[i,j]} readonly={startFill[i][j]?true:false} inputHandler={handler} startingValue={data1} color={isMoveValid(currentFill, [i,j], data1)[0]?"#fff":"#faa"} />
          })
          return JSX;
        })
      }
    </div>
  );
}
function isMoveValid(a, coords, value) {
  const arrayOfMistakes = []
  const arrayOfGoodMoves = []
  if(value === "") return [true, [],[]]
  for(let i=0; i<9; i++){
    if((i!==coords[0])){
      if((value === a[i][coords[1]])) arrayOfMistakes.push([i,coords[1]]);
      else if  ((i!==coords[1]) && (value === a[coords[0]][i])) arrayOfMistakes.push([coords[0],i]);
      else arrayOfGoodMoves.push([i,coords[1]], [coords[0],i]);
    }
  }
  for(let i=coords[0]-coords[0]%3; i<coords[0]-coords[0]%3+3; i++){
    for(let j=coords[1]-coords[1]%3; j<coords[1]-coords[1]%3+3; j++){
      if(!(i===coords[0] && j===coords[1]) && value === a[i][j]) arrayOfMistakes.push([i, j]);
      else arrayOfGoodMoves.push([i, j]);
    }
  }
  if(arrayOfMistakes.length === 0) return [true, arrayOfMistakes, arrayOfGoodMoves]
  else return [false, arrayOfMistakes, arrayOfGoodMoves]
}
export default App;