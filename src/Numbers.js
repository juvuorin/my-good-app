import React from 'react';
import logo, { ReactComponent } from './logo.svg';
//import './Numbers.css';

function Numbers(props) {
//useState???


    return <div className="container">{props.values.map(value=>(<button onClick={()=>{props.buttonClicked(value)}}>{value}</button>))}</div>
}
export default Numbers;
