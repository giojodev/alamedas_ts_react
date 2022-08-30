import axios from "axios";
import { url } from "inspector";
import { stringify } from "querystring";
import { REPL_MODE_SLOPPY } from "repl";

const GetBaseUrl=()=>{
    return localStorage.getItem("urlAPIALAMEDAS");
}

class AccountService{
    static async Authenticate(model:IModelLogin)
    {""
        const urlBase=GetBaseUrl();
        const response:IModelLoginRequest = {} as IModelLoginRequest;

        await axios.post(urlBase + "Account/Login",model)
        .then(responsePost=>{
            response.authenticate=true;
            response.username = responsePost.data.username;
            response.token = responsePost.data.token;
            response.message=responsePost.data.message;
        })
        .catch(error=>{
            response.authenticate=false;
            response.username = "";
            response.token = "";
            response.message=error.response.data.message;
        })
        return response;
    }
}
export {AccountService};