const InitValue=sessionStorage.getItem("sessionUser")?true:false;

const authReducer=(state:boolean=InitValue,action:IModelReducer)=>{
    if(action.type==="@auth/init_session"){
        sessionStorage.setItem("sessionUser",JSON.stringify(action.payload));
        return true;
    }
    if(action.type==="@auth/close_session"){
        sessionStorage.removeItem("sessionUser");
        return false;
    }
    return state;
}
export {authReducer};