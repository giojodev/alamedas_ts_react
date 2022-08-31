import axios from "axios";
import { SessionData } from "../helpers";

class CondominoService{
        static async GetListCondomino(){
            const sessionData =SessionData() as IModelLoginRequest;
            let response:Array<IModelCondomino>= [] as Array<IModelCondomino>
            await axios.get(`${sessionData.url}Admin/ObtenerCondomino`)
            .then(responsePost=>{
                response=responsePost.data;
            })
            .catch(error=>{
                console.log("condomino.service.tsx ~ line 13 ~ CondominoService ~ GetListCondomino ~ error",error);
            });
            return response;
        } 
        static NewCondomino = async(model:IModelCondomino)=>{
             const sessionData= SessionData() as IModelLoginRequest;
            const {data} = await axios.post(`${sessionData.url}Admin/NuevoCondomino`,model);
            return data;
        }
        static EditCondomino = async (model: IModelCondomino)=>{
            const sessionData= SessionData() as IModelLoginRequest;
            const {data} = await axios.post(`${sessionData.url}Admin/ActualizarCondomino`,model);
            return data; 
        }
}

export {CondominoService}