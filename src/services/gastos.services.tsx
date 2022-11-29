import axios from 'axios';
import { IModelGasto, IModelLoginRequest } from '../@types/global';
import { SessionData } from '../helpers';

const GetBaseUrl=()=>{
    return localStorage.getItem('urlAPIALAMEDAS');
}

const urlBase=GetBaseUrl();

class GastoService{
    static async GetListGasto(idGasto:any){
        return new Promise((resolve,reject)=>{
            const sessionData=SessionData() as IModelLoginRequest;
            axios.get(urlBase+"Alamedas/Catalog/GetExpense",{
                headers:{
                    'Authorization': `Bearer ${sessionData.token}` 
                },
                params:{
                    Id:idGasto
                }
            }).then(response=>{
                resolve(response.data);
            }).catch(error=>{
                reject(error);
                console.log("GastosService.service.tsx ¬ line 26 ¬ GetListGasto ¬ error",error);
            })
        })
        
    }

    static NewGasto = async(model:IModelGasto)=>{
        return new Promise((resolve,reject)=>{
            const sessionData=SessionData() as IModelLoginRequest;
            axios.post(urlBase+"Alamedas/Transactions/InsertExpense",model,{
                headers: {
                    'Authorization': `Bearer ${sessionData.token}` 
                    } 
            })
            .then(responsePost=>{
                resolve(responsePost.data);
            })
            .catch(error=>{
                reject(error);
                console.log("GastosService ¬ line 45 ¬ NewGasto ¬ error",error);
            })
        })
    }

    static EditGasto = async(model:IModelGasto)=>{
        return new Promise((resolve,reject)=>{
            const sessionData= SessionData() as IModelLoginRequest;
            axios.put(urlBase+"Alamedas/Transactions/EditExpense",model,{
                headers: {
                    'Authorization': `Bearer ${sessionData.token}` 
                    } 
            })
            .then(responsePut=>{
                resolve(responsePut.data);
            })
            .catch(error=>{
                reject(error);
                console.log("GastosService ¬ line 45 ¬ EditGasto ¬ error",error);
            })
        })
    }
}