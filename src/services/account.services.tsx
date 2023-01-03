import axios from "axios";
import { url } from "inspector";
import { stringify } from "querystring";
import { REPL_MODE_SLOPPY } from "repl";
import { SessionData } from "../helpers";

const GetBaseUrl=()=>{
    return localStorage.getItem("urlAPIALAMEDAS");
}
const urlBase=GetBaseUrl();

class AccountService{

    static async Authenticate(model:IModelLogin)
    {
        const response:IModelLoginRequest = {} as IModelLoginRequest;

        await axios.post(urlBase + "Account/Login",model)
        .then(responsePost=>{
            response.iduser=responsePost.data.iduser;
            response.authenticate=true;
            response.username = responsePost.data.username;
            response.token = responsePost.data.token;
            response.message=responsePost.data.message;
        })
        .catch(error=>{
            response.iduser=0;
            response.authenticate=false;
            response.username = "";
            response.token = "";
            response.message=error.response.data.message;
        })
        return response;
    }

    static async GetListUser(){
        return new Promise((resolve, reject) => {
            const sessionData = SessionData() as IModelLoginRequest;
            let response:Array<IModelUserApp>= [] as Array<IModelUserApp>
            axios.get(urlBase + 'Alamedas/Security/UserList', 
            {
                headers: {
                'Authorization': `Bearer ${sessionData.token}` 
                }
            })
            .then(responsePost=>{
                console.log(responsePost);
                resolve(responsePost.data);
            })
            .catch(error=>{
                reject(error);
                console.log("AccountService.service.tsx ~ line 36 ~ AccountService ~ GetListUser ~ error",error);
            });
         });
    } 

    static NewUser = async(model:IModelUserApp)=>{
        return new Promise((resolve, reject) => {
            const sessionData = SessionData() as IModelLoginRequest;
            let response:Array<IModelBasedResul>= [] as Array<IModelBasedResul>
            axios.post(urlBase + 'Alamedas/Security/InsertUser',model, {
                headers: {
                'Authorization': `Bearer ${sessionData.token}` 
                }
            })
            .then(responsePost=>{
                resolve(responsePost.data);
            })
            .catch(error=>{
                reject(error);
                console.log("AccountService.service.tsx ~ line 56  ~ AccountService ~ NewUser ~ error:",error);
            });
        });
    }

    static EditUser = async (model: IModelUserApp)=>{
        return new Promise((resolve, reject) => {
            const sessionData = SessionData() as IModelLoginRequest;
            let response:Array<IModelBasedResul>= [] as Array<IModelBasedResul>
            axios.put(urlBase + 'Alamedas/Security/UpdateUser',model, {
                headers: {
                'Authorization': `Bearer ${sessionData.token}` 
                }
            })
            .then(responsePost=>{
                resolve(responsePost.data);
            })
            .catch(error=>{
                reject(error);
                console.log("AccountService.service.tsx ~ line 75  ~ AccountService ~ EditUser ~ error:",error);
            });
        });
    }

    /****role*** */
    
    static async GetListRole(){
        return new Promise((resolve, reject) => {
            const sessionData = SessionData() as IModelLoginRequest;
            let response:Array<IModelRole>= [] as Array<IModelRole>
            axios.get(urlBase + 'Alamedas/Security/RoleList', 
            {
                headers: {
                'Authorization': `Bearer ${sessionData.token}` 
                }
            })
            .then(responsePost=>{
                console.log(responsePost);
                resolve(responsePost.data);
            })
            .catch(error=>{
                reject(error);
                console.log("AccountService.service.tsx ~ line 97 ~ AccountService ~ GetListRole ~ error",error);
            });
         });
    } 

    static NewRol = async(model:IModelRole)=>{
        return new Promise((resolve, reject) => {
            const sessionData = SessionData() as IModelLoginRequest;
            let response:Array<IModelRole>= [] as Array<IModelRole>
            axios.post(urlBase + 'Alamedas/Security/InsertRole',model, {
                headers: {
                'Authorization': `Bearer ${sessionData.token}` 
                }
            })
            .then(responsePost=>{
                resolve(responsePost.data);
            })
            .catch(error=>{
                reject(error);
                console.log("AccountService.service.tsx ~ line 118  ~ AccountService ~ NewRol ~ error:",error);
            });
        });
    }

    static EditRole = async (model: IModelRole)=>{
        return new Promise((resolve, reject) => {
            const sessionData = SessionData() as IModelLoginRequest;
            let response:Array<IModelRole>= [] as Array<IModelRole>
            axios.put(urlBase + 'Alamedas/Security/EditRole',model, {
                headers: {
                'Authorization': `Bearer ${sessionData.token}` 
                }
            })
            .then(responsePost=>{
                resolve(responsePost.data);
            })
            .catch(error=>{
                reject(error);
                console.log("AccountService.service.tsx ~ line 137  ~ AccountService ~ EditRole ~ error:",error);
            });
        });
    }

}
export {AccountService};