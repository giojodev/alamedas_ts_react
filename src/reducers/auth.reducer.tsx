const InitValue=sessionStorage.getItem("username")?true:false;

const authReducer=(state:boolean=InitValue,action:IModelReducer)=>{
    if(action.type==="@auth/init_session"){
        sessionStorage.setItem("username",action.payload.username);
        return true;
    }
    if(action.type==="@auth/close_session"){
        sessionStorage.removeItem("username");
        return false;
    }
    return state;
}
export {authReducer};