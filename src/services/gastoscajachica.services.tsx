import axios from 'axios';
import { SessionData } from '../helpers';

const GetBaseUrl=()=>{return localStorage.getItem('urlAPIALAMEDAS');}
const urlBase=GetBaseUrl();

class GastoCajaChicaService {
    static async GetListGastosCC(){
        return new Promise((resolve,reject)=>{
            const sessionData= SessionData() as IModelLoginRequest;
            axios.get(urlBase+"Alamedas/Catalog/GccList",{
                headers:{
                    'Authorization': `Bearer ${sessionData.token}` 
                }
            }).then(response=>{
                resolve(response.data);
            }).catch(error=>{
                reject(error);
                console.log("Gastocajachica.service.tsx ¬ line 19 ¬ GetListGastosCC ¬ error",error)
            })
        })
    }

    static NewGastoCC = async(model:IModelGastoCC)=>{
        return new Promise((resolve,reject)=>{
            const sessionData= SessionData() as IModelLoginRequest;
            axios.post(urlBase + "Alamedas/Transactions/InsertGCC",model,{
                headers: {
                    'Authorization': `Bearer ${sessionData.token}` 
                    } 
            })
            .then(responsePost=>{
                resolve(responsePost.data);
            })
            .catch(error=>{
                reject(error);
                console.log("gastoCajaChica.Service.tsx ¬ line 37 ¬ NewGastoCCC ¬ error: ",error);
            })
        })
    }
    static UpdateGastoCC = async(model:IModelGastoCC)=>{
        return new Promise((resolve,reject)=>{
            const sessionData= SessionData() as IModelLoginRequest;
            axios.post(urlBase + "Alamedas/Transactions/InsertGCC",model,{
                headers: {
                    'Authorization': `Bearer ${sessionData.token}` 
                    } 
            })
            .then(responsePost=>{
                resolve(responsePost.data);
            })
            .catch(error=>{
                reject(error);
                console.log("gastoCajaChica.Service.tsx ¬ line 37 ¬ UpdateGastoCC ¬ error: ",error);
            })
        })
    }
}

export {GastoCajaChicaService};