import {useState} from 'react';

export default function Cell({coords, inputHandler, startingValue, color, readonly}){
    const [value, setValue] = useState(startingValue);
    const handler = (data) => {
        const num = parseInt(data.target.value);
        if(num){
            if(num < 1) setValue(1);
            else if(num > 9) setValue(9);
            else{
                setValue(num);
                inputHandler(num, coords);
            }
        }
        else setValue("");
    }
    console.log(color)
    const JSX = readonly ?
    <input type="text" value={value} className="cell" onChange={handler} readOnly style={{background: color}} />
    :<input type="text" value={value} className="cell" onChange={handler} style={{background: color}} />
    return JSX;
}