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
    IdCondomino:int=0;
    nombreCompleto:string="";
    nombreInquilino:string="";
    correo:string="";
    telefono:string="";
    activo:Boolean=false;
  }

  interface IModelTipoGastoCajaChica{
    idTipoGastoCajaChica:int = 0;
    nombreTipoGastoCajachica:string = "";
    activo:boolean = false;
  }
  interface IModelTipoIngresoCajaChica{
    idTipoIngresoaCajaChica:int = 0;
    nombreTipoIngresoCajaChica:string = "";
    activo:boolean = false;
  }

  interface PropCondo{
    showModal: boolean;
    formData:IModelCondomino;
    onChange:(event:React.MouseEvent) =>void;
    isEditData:boolean;
    onSave:(form:any)=>void;
  }

  interface PropTipoGastoCajaChica{
    showModal: boolean;
    formData:IModelTipoGastoCajaChica;
    onChange:(event:React.MouseEvent) =>void;
    isEditData:boolean;
    onSave:(form:any)=>void;
  }
  interface PropTipoIngresoCajaChica{
    showModal: boolean;
    formData:IModelTipoIngresoCajaChica;
    onChange:(event:React.MouseEvent) =>void;
    isEditData:boolean;
    onSave:(form:any)=>void;
  }
  interface IModelTipoGasto{
    id_ingreso:int = 0;
    nombre_ingreso:string = "";
    activo:boolean = false;
  }
  interface IModelTiPoIngreso{
    id_gasto:int = 0;
    nombre_gasto:string = "";
    activo:boolean = false;
  }
  interface PropTipoIngreso{
    showModal: boolean;
    formData:IModelTiPoIngreso;
    onChange:(event:React.MouseEvent) =>void;
    isEditData:boolean;
    onSave:(form:any)=>void;
  }
  interface PropTipoGasto{
    showModal: boolean;
    formData:IModelTipoGasto;
    onChange:(event:React.MouseEvent) =>void;
    isEditData:boolean;
    onSave:(form:any)=>void;
  }
  interface IModelBasedResul{
    Message:string="";
  }