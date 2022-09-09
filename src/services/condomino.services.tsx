import axios from "axios";
import { SessionData } from "../helpers";

const GetBaseUrl=()=>{
    return localStorage.getItem("urlAPIALAMEDAS");
}
const urlBase=GetBaseUrl();
class CondominoService{
    
        static async GetListCondomino(){
            return new Promise((resolve, reject) => {
                const sessionData = SessionData() as IModelLoginRequest;
                let response:Array<IModelCondomino>= [] as Array<IModelCondomino>
                axios.get(urlBase + 'Alamedas/Catalog/CondominiumList', 
                {
                    headers: {
                    'Authorization': `Bearer ${sessionData.token}` 
                    }
                })
                .then(responsePost=>{
                    resolve(responsePost.data);
                })
                .catch(error=>{
                    reject(error);
                    console.log("condomino.service.tsx ~ line 10 ~ CondominoService ~ GetListCondomino ~ error",error);
                });
             });
        } 

        static NewCondomino = async(model:IModelCondomino)=>{
            return new Promise((resolve, reject) => {
                const sessionData = SessionData() as IModelLoginRequest;
                let response:Array<IModelBasedResul>= [] as Array<IModelBasedResul>
                axios.post(urlBase + 'Alamedas/Transactions/InsertCondominum',model, {
                    headers: {
                    'Authorization': `Bearer ${sessionData.token}` 
                    }
                })
                .then(responsePost=>{
                    resolve(responsePost.data);
                })
                .catch(error=>{
                    reject(error);
                    console.log("condomino.service.tsx ~ line 30  ~ CondominoService ~ NewCondomino ~ error:",error);
                });
            });
        }

        static EditCondomino = async (model: IModelCondomino)=>{
            return new Promise((resolve, reject) => {
                const sessionData = SessionData() as IModelLoginRequest;
                let response:Array<IModelBasedResul>= [] as Array<IModelBasedResul>
                axios.put(urlBase + 'Alamedas/Transactions/UpdateCondominium',model, {
                    headers: {
                    'Authorization': `Bearer ${sessionData.token}` 
                    }
                })
                .then(responsePost=>{
                    resolve(responsePost.data);
                })
                .catch(error=>{
                    reject(error);
                    console.log("condomino.service.tsx ~ line 49  ~ CondominoService ~ EditCondomino ~ error:",error);
                });
            });
        }
}

export {CondominoService}