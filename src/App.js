import React, { useState, useEffect /*useReducer*/ } from 'react';
//import logo from './logo.svg';
import axios from 'axios';
import './App.css';

var db = openDatabase("my.db", '1.0', "My WebSQL Database", 2 * 1024 * 1024);

function App() {

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [names, setNames] = useState([])

  const create = () => {
     db.transaction((tx) => {   
      tx.executeSql("CREATE TABLE IF NOT EXISTS customer_ (identity integer primary key, firstname text, lastname text)");
    });
    db.transaction((tx) => {   
      tx.executeSql("CREATE TABLE IF NOT EXISTS order_ (identity integer primary key,customer_id integer, product_name text,FOREIGN KEY(customer_id) REFERENCES customer(identity))");

    }); 

  }

  useEffect(()=>{
    create();
    select();
  },[])

  const select = () => {
    db.transaction((tx) => {
      tx.executeSql("SELECT firstname, lastname FROM customer", [], function (tx, results) {
        if (results.rows.length > 0) {
      //    setNames(results.rows);
       
          setNames(createMappableArrayFromSqlResultList(results.rows));
        } else { setNames([]) }
      });
    });
  }


  const insert = (firstname, lastname) => {

    db.transaction((tx) => {
      tx.executeSql("INSERT INTO customer (firstname, lastname) VALUES (?,?)", [firstname, lastname], function (tx, results) {
        if (results.insertId!=null) {
          setNames(names.concat([{firstname:firstName, lastname:lastname}]))
        } else {console.log("added Not ok") }
      });
    });
  }

  const add = () => {

    insert(firstName, lastName)
    
  }

  const onLastNameChanged = (event)=> {
    setLastName(event.target.value)
    
  }
  const onFirstNameChanged = (event)=> {
    setFirstName(event.target.value)
  }

  const createMappableArrayFromSqlResultList = (resultList)=> {
    let resultArray=[]
    for (let n=0;n<resultList.length;n++) {
      resultArray.push(resultList.item(n))
    }
    return resultArray;
  } 

  return (
    <div>

      firstname:<input value={firstName} onChange={(e)=>onFirstNameChanged(e)} type="text"></input>
      lastname:<input value={lastName} onChange={(e)=>onLastNameChanged(e)} type="text"></input>
      <button onClick={add}>Add to database</button>
      {names.map(item=><div>{item.firstname} {item.lastname}</div>)}
    </div>
  );
}
export default App;