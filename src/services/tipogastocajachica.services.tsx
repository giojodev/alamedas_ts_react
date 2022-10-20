import axios from "axios";
import { SessionData } from "../helpers";

const GetBaseUrl=()=>{
    return localStorage.getItem("urlAPIALAMEDAS");
}

const urlBase=GetBaseUrl();
class TipoGastoCajaChicaService{
    // static async GetListTipoGastoCajaChica( idtipogasto:any ){
    static async GetListTipoGastoCajaChica( idtipogasto:any ){
        return new Promise((resolve,reject)=>{
            const sessionData = SessionData() as IModelLoginRequest;
            axios.get(urlBase + 'Alamedas/Catalog/TgccList',{
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
                console.log("TipoGastoCajaChicaService.service.tsx ~ line 22 ~ TipoGastoCajaChicaService ~ GetListTipoGastoCajaChica ~ error",error);
            })
        })
    }

    static NewTipoGastoCajaChica = async(model:IModelTipoGastoCajaChica)=>{
        return new Promise((resolve,reject)=>{
            const sessionData = SessionData() as IModelLoginRequest;
            let response:Array<IModelBasedResul>= [] as Array <IModelBasedResul>;
            axios.post(urlBase + 'Alamedas/Transactions/InsertTGCC',model,{
                headers: {
                    'Authorization': `Bearer ${sessionData.token}` 
                    } 
            })
            .then(responsePost=>{
                resolve(responsePost.data);
            })
            .catch(error=>{
                reject(error);
                console.log("tipocajachica.service.tsx ~ line 44  ~ TipoGastoCajaChicaService ~ NewTipoGastoCajaChica ~ error:",error)
            })
        });
    }
    static EditTipoGastoCajaChica = async(model:IModelTipoGastoCajaChica)=>{
        return new Promise((resolve,reject)=>{
            const sessionData= SessionData() as IModelLoginRequest;
            let response:Array<IModelBasedResul> = [] as Array<IModelBasedResul>;
            axios.put(urlBase+ 'Alamedas/Transactions/UpdateTGCC',model,{
                headers: {
                    'Authorization': `Bearer ${sessionData.token}` 
                    } 
            })
            .then(responsePost=>{
                resolve(responsePost.data);
            })
            .catch(error=>{
                reject(error);
                console.log("tipocajachica.service.tsx ~ line 62  ~ TipoGastoCajaChicaService ~ EditTipoGastoCajaChica ~ error:",error)
            })
        })
    }
}

export {TipoGastoCajaChicaService};