import axios from "axios";
import { SessionData } from "../helpers";

const GetBaseUrl=()=>{
    return localStorage.getItem("urlAPIALAMEDAS");
}

const urlBase=GetBaseUrl();
class TipoGastoCajaChicaService{
    
    static async GetListTipoGastoCajaChica( idtipogasto ){
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

}

export {TipoGastoCajaChicaService};