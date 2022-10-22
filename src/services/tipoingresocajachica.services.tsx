import axios from 'axios';
import { SessionData } from '../helpers';

const GetBaseUrl=()=>{
    return localStorage.getItem("urlAPIALAMEDAS");
}

const urlBase=GetBaseUrl();

class TipoIngresoCajaChicaService{
    
}

export {TipoIngresoCajaChicaService}