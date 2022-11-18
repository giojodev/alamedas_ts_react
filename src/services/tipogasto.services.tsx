import axios from "axios";
import { SessionData } from "../helpers";

const GetBaseUrl=()=>{
    return localStorage.getItem("urlAPIALAMEDAS");
}

const urlBase=GetBaseUrl();

class TipoGastoService{
    static async GetListTipoGasto(idtipogasto:any){
        return new Promise((resolve,reject)=>{
            const sessionData= SessionData() as IModelLoginRequest;
            axios.get(urlBase + "Alamedas/Catalog/ExpenseList",{
                headers:{
                    'Authorization': `Bearer ${sessionData.token}` 
                },
                params:{
                    IdTGCC:idtipogasto
                }
            }).then(response=>{
                resolve(response.data);
            }).catch(error=>{
                reject(error);
                console.log("TipoGastoService.service.tsx ~ line 22 ~ TipoGastoService ~ GetListTipoGasto ~ error",error);
            })
        })
    }

    static NewTipoGasto = async(model:IModelTipoGasto)=>{
        return new Promise((resolve,reject)=>{
            const sessionData= SessionData() as IModelLoginRequest;
            axios.post(urlBase + "Alamedas/Transactions/InsertTypeExpense",model,{
                headers: {
                    'Authorization': `Bearer ${sessionData.token}` 
                    } 
            })
            .then(responsePost=>{
                resolve(responsePost.data);
            })
            .catch(error=>{
                reject(error);
                console.log("tipogasto.service.tsx ~ line 44  ~ TipoGastoService ~ NewTipoGasto ~ error:",error)
            })
        })
    }
    static EditTipoGasto=async(model:IModelTipoGasto)=>{
        
    }
}

export {TipoGastoService};
