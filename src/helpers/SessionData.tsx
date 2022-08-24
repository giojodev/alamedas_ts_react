const SessionData=()=>{
    try{
        const SessionData:IModelLoginRequest | undefined =JSON.parse(sessionStorage.getItem("sessionUser") as string) as IModelLoginRequest

        if(!SessionData){
            return null;
        }
        return SessionData;
    }catch{
        return null;
    }
}
export {SessionData};