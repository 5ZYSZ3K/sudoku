import Cell from "./Cell";

function App() {
  const startingFill = [];
  for(let i=0; i<9; i++){
    startingFill.push([]);
    for(let j=0; j<9; j++){
      startingFill[i].push("");
    }
  }
  for(let i=0; i<30; i++){
    let x = Math.floor(Math.random()*9)
    let y = Math.floor(Math.random()*9)
    let v = Math.floor(Math.random()*9);
    while(!isMoveValid(startingFill, [x,y], v)){
      x = Math.floor(Math.random()*9)
      y = Math.floor(Math.random()*9)
      v = Math.floor(Math.random()*9);
    }
    startingFill[x][y] = v;
  }
  const arrayOfJSX = [];
  const handler = () => {}
  for(let i=0; i<9; i++){
    arrayOfJSX.push([]);
    for(let j=0; j<9; j++){
      arrayOfJSX[i].push(<Cell coords={[i,j]} key={`${i} ${j}`} inputHandler={handler} startingValue={startingFill[i][j]}/>);
    }
  }
  return (
    <div className="App">
      {
        arrayOfJSX.map(data => {
          const rowJsx = data.map(data1 => {
            return data1;
          })
          return rowJsx;
        })
      }
    </div>
  );
}
function isMoveValid(a, coords, value) {
  for(let i=0; i<9; i++){
    if(((i!==coords[0]) && (value === a[i][coords[1]])) || ((i!==coords[1]) && (value === a[coords[0]][i]))) return false;
  }
  for(let i=coords[0]-coords[0]%3; i<coords[0]-coords[0]%3+3; i++){
    for(let j=coords[1]-coords[1]%3; j<coords[1]-coords[1]%3+3; j++){
      if(!(i===coords[0] && j===coords[1]) && value === a[i][j]) return false;
    }
  }
  return true;
}
export default App;