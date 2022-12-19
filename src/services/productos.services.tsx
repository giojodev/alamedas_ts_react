import axios from 'axios';
import { SessionData } from '../helpers';

const GetBaseUrl=()=>{return localStorage.getItem('urlAPIALAMEDAS');}
const urlBase=GetBaseUrl();

class ProductosService{

    //gatos
    static async GetListGastoCC(){
        return new Promise((resolve,reject)=>{
            const sessionData=SessionData() as IModelLoginRequest;
            axios.get(urlBase+"Alamedas/Catalog/ProdExpenseList",{
                headers:{
                    'Authorization': `Bearer ${sessionData.token}` 
                }
            }).then(response=>{
                resolve(response.data);
            }).catch(error=>{
                reject(error);
                console.log("ProductosService.service.tsx ¬ line 10 ¬ GetListGastoCC ¬ error",error);
            })
        })
    }

    static NewGastoCC = async(model:IModelProductoGastoCC)=>{
        return new Promise((resolve,reject)=>{
            const sessionData=SessionData() as IModelLoginRequest;
            axios.post(urlBase+"Alamedas/Transactions/InsertProdExpense",model,{
                headers: {
                    'Authorization': `Bearer ${sessionData.token}` 
                    } 
            })
            .then(responsePost=>{
                resolve(responsePost.data);
            })
            .catch(error=>{
                reject(error);
                console.log("GastosService ¬ line 26 ¬ NewGastoCC ¬ error",error);
            })
        })
    }

    static EditGastoCC = async(model:IModelProductoGastoCC)=>{
        return new Promise((resolve,reject)=>{
            const sessionData=SessionData() as IModelLoginRequest;
            axios.put(urlBase+"Alamedas/Transactions/UpdateProdExpense",model,{
                headers: {
                    'Authorization': `Bearer ${sessionData.token}` 
                    } 
            })
            .then(responsePost=>{
                resolve(responsePost.data);
            })
            .catch(error=>{
                reject(error);
                console.log("GastosService ¬ line 44 ¬ EditGastoCC ¬ error",error);
            })
        })
    }

    //ingresos
    static async GetListIngresoCC(){
        return new Promise((resolve,reject)=>{
            const sessionData=SessionData() as IModelLoginRequest;
            axios.get(urlBase+"Alamedas/Catalog/ProdEntryList",{
                headers:{
                    'Authorization': `Bearer ${sessionData.token}` 
                }
            }).then(response=>{
                resolve(response.data);
            }).catch(error=>{
                reject(error);
                console.log("ProductosService.service.tsx ¬ line 63 ¬ GetListIngresoCC ¬ error",error);
            })
        })
    }

    static NewIngresoCC = async(model:IModelProductoIngresoCC)=>{
        return new Promise((resolve,reject)=>{
            const sessionData=SessionData() as IModelLoginRequest;
            axios.post(urlBase+"Alamedas/Transactions/InsertProdEntry",model,{
                headers: {
                    'Authorization': `Bearer ${sessionData.token}` 
                    } 
            })
            .then(responsePost=>{
                resolve(responsePost.data);
            })
            .catch(error=>{
                reject(error);
                console.log("GastosService ¬ line 79 ¬ NewIngresoCC ¬ error",error);
            })
        })
    }

    static EditIngresoCC = async(model:IModelProductoIngresoCC)=>{
        return new Promise((resolve,reject)=>{
            const sessionData=SessionData() as IModelLoginRequest;
            axios.put(urlBase+"Alamedas/Transactions/UpdateProdEntry",model,{
                headers: {
                    'Authorization': `Bearer ${sessionData.token}` 
                    } 
            })
            .then(responsePost=>{
                resolve(responsePost.data);
            })
            .catch(error=>{
                reject(error);
                console.log("GastosService ¬ line 97 ¬ EditIngresoCC ¬ error",error);
            })
        })
    }

}

export {ProductosService};