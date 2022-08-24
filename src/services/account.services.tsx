import axios from "axios";
import { url } from "inspector";
import { stringify } from "querystring";
import { REPL_MODE_SLOPPY } from "repl";

const GetBaseUrl=()=>{
    return localStorage.getItem("APIALAMEDAS");
}

class AccountService{
    static async Authenticate(model:IModelLogin)
    {
        const urlBase=GetBaseUrl();
        const response:IModelLoginRequest = {} as IModelLoginRequest;
        response.url=urlBase;
        response.username=model.username;

        await axios.post(`${urlBase}Account/Login/`,model)
        .then(responsePost=>{
            response.authenticate=true;
            response.message=responsePost.data.message;
        })
        .catch(error=>{
            response.authenticate=false;
            response.username=error.response.data;
        })
        return response;
    }
}
export {AccountService};