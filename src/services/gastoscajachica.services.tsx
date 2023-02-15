import axios from 'axios';
import { SessionData } from '../helpers';

const GetBaseUrl=()=>{return localStorage.getItem('urlAPIALAMEDAS');}
const urlBase=GetBaseUrl();

class GastoCajaChica {
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
}