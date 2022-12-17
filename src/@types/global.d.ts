//import internal from "stream";

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
    idGastoCajaChica:int = 0;
    nombreGastoCajachica:string = "";
    activo:boolean = false;
  }
  interface IModelGasto{
    consecutivo:int=0;
    usuario:int=1;
    gasto:int=0;
    fecha:Date;
    concepto:string="";
    mes:int=1;
    anio:int=2023;
  }
  interface IModelTipoIngresoCajaChica{
    idIngresoaCajaChica:int = 0;
    nombreIngresoCajaChica:string = "";
    activo:boolean = false;
  }
  interface IModelTipoIngreso{  
    idIngreso:int= 0,
    nombreIngreso:string="",
    activo:boolean= true
  }

  interface IModelTipoGasto{
    idGasto:int= 0,
    nombreGasto:string="",
    activo:boolean= true
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
  interface PropGasto{
    showModal: boolean;
    formData:IModelGasto;
    onChange:(event:React.MouseEvent) =>void;
    isEditData:boolean;
    onSave:(form:any)=>void;
  }

  interface IModelBasedResul{
    Message:string="";
  }

  interface IModelProductoGasto{
    id:int= 0,
    concepto:string="",
    valor:doblue
  }