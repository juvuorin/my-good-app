import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Numbers from './Numbers.js';
import Display from './Display.js'

//Container keeps track of the state of an application
function App() {

  const [numbers, setNumbers] = useState(["1", "2", "3", "4", "5", "6", "7", "8", "9", "0",
    "+", "-", "*", "/", "="])
  const [display, setDisplay] = useState("");

  const buttonClicked = (value) => {
    if (value == "=") setDisplay(eval(display)); else {
      let newValue = display + value
      setDisplay(newValue)
    }
  }

  return <div><Display displayText={display}></Display><Numbers values={numbers} buttonClicked={buttonClicked}></Numbers></div>
}
export default App;
