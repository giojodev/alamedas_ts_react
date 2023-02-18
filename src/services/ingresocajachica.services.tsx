import axios from 'axios';
import { SessionData } from '../helpers';

const GetBaseUrl=()=>{return localStorage.getItem('urlAPIALAMEDAS');}
const urlBase=GetBaseUrl();

class Ingresocajachica {

    static async GetListIngresoCC(){
        return new Promise((resolve,reject)=>{
            const sessionData=SessionData() as IModelLoginRequest;
            axios.get(urlBase+"Alamedas/Catalog/IccList",{
                headers:{
                    'Authorization': `Bearer ${sessionData.token}` 
                }
            }).then(response=>{
                resolve(response.data);
            }).catch(error=>{
                reject(error);
                console.log("Ingresocajachica.service.tsx ¬ line 9 ¬ GetListIngresoCC ¬ error",error);
            })
        })
    }

}

export {Ingresocajachica};