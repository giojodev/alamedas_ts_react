import axios from "axios";
import { SessionData } from "../helpers";

const GetBaseUrl=()=>{
    return localStorage.getItem("urlAPIALAMEDAS");
}
const urlBase=GetBaseUrl();
class CondominoService{
        static async GetListCondomino(){
            const sessionData = SessionData() as IModelLoginRequest;
            let response:Array<IModelCondomino>= [] as Array<IModelCondomino>
            await axios.get(urlBase + 'Alamedas/Catalog/CondominiumList', 
            {
                headers: {
                  'Authorization': `Bearer ${sessionData.token}` 
                }
            })
            .then(responsePost=>{
                response=responsePost.data;
            })
            .catch(error=>{
                console.log("condomino.service.tsx ~ line 9 ~ CondominoService ~ GetListCondomino ~ error",error);
            });
            return response;
        } 
        static NewCondomino = async(model:IModelCondomino)=>{
            const sessionData = SessionData() as IModelLoginRequest;
            let response:Array<IModelBasedResul>= [] as Array<IModelBasedResul>
            await axios.post(urlBase + 'Alamedas/Transactions/InsertCondominum',model, {
                headers: {
                  'Authorization': `Bearer ${sessionData.token}` 
                }
            })
            .then(responsePost=>{
                response=responsePost.data;
            })
            .catch(error=>{
                console.log("condomino.service.tsx ~ line 26  ~ CondominoService ~ NewCondomino ~ error",error);
            });
            return response;
        }
        static EditCondomino = async (model: IModelCondomino)=>{
            const {data} = await axios.post(urlBase + 'Alamedas/Catalog/ActualizarCondomino',model);
            return data; 
        }
}

export {CondominoService}