import './App.css'
import {Routes} from "./routing/Routes";

const setUrl = async ()=>{
    const environment = require("./env.json");
    localStorage.setItem("urlAPIALAMEDAS",environment.urlAPIALAMEDAS);
}

setUrl();

const App=()=><Routes/>

export default App;