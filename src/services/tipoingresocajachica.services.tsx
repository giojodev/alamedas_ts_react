import axios from 'axios';
import { SessionData } from '../helpers';

const GetBaseUrl=()=>{
    return localStorage.getItem("urlAPIALAMEDAS");
}

const urlBase=GetBaseUrl();

class TipoIngresoCajaChicaService{
    static async GetListTipoIngresoCajaChica(idtipoingreso:any){
        return new Promise((resolve,reject)=>{
            const sessionData = SessionData() as IModelLoginRequest;
            axios.get(urlBase+'Alamedas/Catalog/TiccList',{
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
                console.log("TipoIngresoCajaChicaService.service.tsx ~ line 25 ~ TipoIngresoCajaChicaService ~ GetListTipoIngresoCajaChica ~ error",error);
            })
        })
    }

    static NewTipoIngresoCajaChica = async(model:IModelTipoIngresoCajaChica)=>{
        return new Promise((resolve,reject)=>{
            const sessionData= SessionData() as IModelLoginRequest;
            axios.post(urlBase+'Alamedas/Transactions/InsertTICC',model,{
                headers: {
                    'Authorization': `Bearer ${sessionData.token}` 
                    } 
            })
            .then(responsePost=>{
                resolve(responsePost.data);
            })
            .catch(error=>{
                reject(error);
                console.log("TipoIngresoCajaChicaService.service.tsx ~ line 43 ~ TipoIngresoCajaChicaService ~ NewTipoIngresoCajaChica ~ error:",error)               
            })
        })
    }
    static EditTipoIngresoCajaChica = async(model:IModelTipoIngresoCajaChica)=>{
        return new Promise((resolve,reject)=>{
            const sessionData=SessionData() as IModelLoginRequest;
            axios.put(urlBase+'Alamedas/Transactions/UpdateTICC',model,{
                headers: {
                    'Authorization': `Bearer ${sessionData.token}` 
                    } 
            })
            .then(responsePut=>{
                resolve(responsePut.data);
            })
            .catch(error=>{
                reject(error);
                console.log("TipoIngresoCajaChicaService.service.tsx ~ line 60 ~ TipoIngresoCajaChicaService ~ EditTipoIngresoCajaChica ~ error:",error)   
            })
        })
    }
    static DeleteTipoIngresoCajaChica = async(idTipoIngreso:any)=>{
        return new Promise((resolve,reject)=>{
            const sessionData = SessionData() as IModelLoginRequest;
            axios.delete(urlBase+'Alamedas/Transactions/DeleteTICC',{
                headers:{
                    'Authorization': `Bearer ${sessionData.token}` 
                },
                params:{
                    IdTGCC:idTipoIngreso
                }
            }).then(responseDelete=>{
                resolve(responseDelete.data);
            }).catch(error=>{
                reject(error);
                console.log("TipoIngresoCajaChicaService.service.tsx ~ line 78 ~ TipoIngresoCajaChicaService ~ DeleteTipoIngresoCajaChica ~ error:",error)
            })
        })
    }
}

export {TipoIngresoCajaChicaService}