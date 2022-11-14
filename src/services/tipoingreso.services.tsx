import axios from "axios";
import { SessionData } from "../helpers";

const GetBaseUrl=()=>{
    return localStorage.getItem("urlAPIALAMEDAS");
}

const urlBase=GetBaseUrl();

class TipoIngresoService{
    static async GetListTipoIngreso(idtipoingreso:any){
        return new Promise((resolve,reject)=>{
            const sessionData= SessionData() as IModelLoginRequest;
            axios.get(urlBase + "Alamedas/Catalog/IncomeList",{
                headers:{
                    'Authorization': `Bearer ${sessionData.token}` 
                },
                params:{
                    IdTGCC:idtipoingreso
                }
            }).then(response=>{
                resolve(response.data);
            }).catch(error=>{
                reject(error);
                console.log("TipoIngresoService.service.tsx ~ line 22 ~ TipoIngresoService ~ GetListTipoIngreso ~ error",error);
            })
        })
    }

    static NewTipoIngreso = async(model:IModelTipoIngreso)=>{
        return new Promise((resolve,reject)=>{
            const sessionData= SessionData() as IModelLoginRequest;
            axios.post(urlBase + "Alamedas/Transactions/InsertTypeIncome",model,{
                headers: {
                    'Authorization': `Bearer ${sessionData.token}` 
                    } 
            })
            .then(responsePost=>{
                resolve(responsePost.data);
            })
            .catch(error=>{
                reject(error);
                console.log("tipoingreso.service.tsx ~ line 62  ~ TipoIngresoService ~ NewTipoIngreso ~ error:",error)
            })
        })
    }
    static EditTipoIngreso = async(model:IModelTipoIngreso)=>{
        return new Promise((resolve,reject)=>{
            const sessionData=SessionData() as IModelLoginRequest;
            axios.put(urlBase+"Alamedas/Transactions/UpdateIncomeType",model,{
                headers: {
                    'Authorization': `Bearer ${sessionData.token}` 
                    } 
            })
            .then(responsePost=>{
                resolve(responsePost.data);
            })
            .catch(error=>{
                reject(error);
                console.log("tipoingreso.service.tsx ~ line 62  ~ TipoIngresoService ~ EditTipoGIngreso ~ error:",error)
            })
        })
    }
}


export {TipoIngresoService}