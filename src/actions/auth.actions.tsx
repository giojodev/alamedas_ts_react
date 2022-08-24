
const InitSession=(model:IModelLoginRequest)=>{
    return {type:'@auth/init_session',payload:model} as IModelReducer;
}
const CloseSession=()=>{
    return {
        type:"@auth/close_session"
    } as IModelReducer;
}

export {InitSession,CloseSession};