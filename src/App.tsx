import React from 'react'
import './App.css'
import {Routes} from "./routing/Routes";
import axios,{Axios} from 'axios';

const setUrl=async ()=>{
    const {data} =await axios ("/env.json");
    const {urlApiAlamedas}=data;
    localStorage.setItem("urlAPIALAMEDAS",urlApiAlamedas);
}

setUrl();

const App=()=><Routes/>

export default App;