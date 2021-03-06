import { useEffect, useState } from "react";
import Cell from "./Cell";

function App() {
  const [currentFill, setCurrentFill] = useState([]);
  const [startFill, setStartFill] = useState([]);
  useEffect(() => {
    const startingFill = [];
    const startingFillBoolean = [];
    for(let i=0; i<9; i++){
      startingFill.push([]);
      startingFillBoolean.push([]);
      for(let j=0; j<9; j++){
        startingFillBoolean[i].push(false)
        startingFill[i].push("");
      }
    }
    for(let i=0; i<30; i++){
      let x = (Math.floor(Math.random()*9));
      let y = (Math.floor(Math.random()*9));
      let v = (Math.floor(Math.random()*9)+1);
      while(!isMoveValid(startingFill, [x,y], v)){
        x = (Math.floor(Math.random()*9));
        y = (Math.floor(Math.random()*9));
        v = (Math.floor(Math.random()*9)+1);
      }
      startingFillBoolean[x][y] = true;
      startingFill[x][y] = v;
    }
    setStartFill(startingFillBoolean)
    setCurrentFill(startingFill);
  }, [])
  const handler = (inputValue, coords) => {
    const currentFillTemp = [...currentFill];
    currentFillTemp[coords[0]][coords[1]] = inputValue;
    setCurrentFill(currentFillTemp);
  }
  return (
    <div className="App">
      {
        currentFill.map((data,i) => {
          const JSX = data.map((data1,j) => {
            return <Cell key={`${i} ${j}`} coords={[i,j]} readonly={startFill[i][j]?true:false} inputHandler={handler} startingValue={data1} color={isMoveValid(currentFill, [i,j], data1)?"#fff":"#faa"} />
          })
          return JSX;
        })
      }
    </div>
  );
}
function isMoveValid(a, coords, value) {
  const arrayOfMistakes = [];
  const arrayOfGoodMoves = [];
  if(value === "") return true;
  for(let i=0; i<9; i++){
    if((i!==coords[0]) && (value === a[i][coords[1]])) return false;
    else if  ((i!==coords[1]) && (value === a[coords[0]][i])) return false;
  }
  for(let i=coords[0]-coords[0]%3; i<coords[0]-coords[0]%3+3; i++){
    for(let j=coords[1]-coords[1]%3; j<coords[1]-coords[1]%3+3; j++){
      if(!(i===coords[0] && j===coords[1]) && value === a[i][j]) return false;
    }
  }
  return true;
}
export default App;