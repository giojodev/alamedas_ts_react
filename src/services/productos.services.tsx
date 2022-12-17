import axios from 'axios';
import { SessionData } from '../helpers';

const GetBaseUrl=()=>{return localStorage.getItem('urlAPIALAMEDAS');}
const urlBase=GetBaseUrl();

class ProductosService{

    //gatos
    static async GetListGasto(){
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
                console.log("ProductosService.service.tsx ¬ line 9 ¬ GetListGasto ¬ error",error);
            })
        })
    }

    static NewGasto = async(model:IModelProductoGasto)=>{
        return new Promise((resolve,reject)=>{
            const sessionData=SessionData() as IModelLoginRequest;
            axios.post(urlBase+"Alamedas/Transactions/InsertExpense",model,{
                headers: {
                    'Authorization': `Bearer ${sessionData.token}` 
                    } 
            })
            .then(responsePost=>{
                resolve(responsePost.data);
            })
            .catch(error=>{
                reject(error);
                console.log("GastosService ¬ line 45 ¬ NewGasto ¬ error",error);
            })
        })
    }

    //ingresos
    static async GetListIngreso(){
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
                console.log("ProductosService.service.tsx ¬ line 9 ¬ GetListGasto ¬ error",error);
            })
        })
    }

}
