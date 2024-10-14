import React from 'react';
import './App.css';
import UsersPage from "./components/UsersPage";
import {data} from "./components/data";

function App() {
  return (
    <div className="App">
        <UsersPage data={data}/>
    </div>
  );
}

export default App;
