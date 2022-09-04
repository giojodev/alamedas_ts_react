interface IModelLogin {
    username: string='' ;
    password: string='' ;
  }
  interface IModelLoginRequest{
      username:string ="";
      url:string | null ="";
      token:string | null ="";
      message:string|null="";
      authenticate:boolean =false;
  }
  interface IModelAlert{
      message:string;
      type:string="error"|"success"|"info"|"warning"|undefined;
  }
  
  interface IModelReducer{
      type:string;
      payload:IModelLoginRequest;
  }
  interface ImodelItemMenu{
      icon:any;
      title:string;
      path:string;
      key:string;
  }
  interface IModelAuthorized{
      auth:boolean;
  }

  interface IModelCondomino{
    idCondomino:int=0;
    nombreCompleto:string="";
    nombreInquilino:string="";
    correo:string="";
    telefono:string="";
    activo:Boolean=false;
  }

  interface PropCondo{
    showModal: boolean;
    formData:IModelCondomino;
    onChange:(event:React.MouseEvent) =>void;
    isEditData:boolean;
    onSave:(form:any)=>void;
  }

  interface IModelBasedResul{
    Message:string="";
  }