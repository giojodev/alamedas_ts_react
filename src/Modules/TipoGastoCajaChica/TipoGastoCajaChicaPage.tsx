import React,{useEffect,useState} from 'react';
import { Button,Col,Divider,Row,Table,Modal,Input,Tag } from 'antd';
import { TipoGastoCajaChicaService } from '../../services';
import {TipoGastoCajaChicaModal} from './components';
import { EditOutlined,LoadingOutlined,SaveOutlined,CloseCircleOutlined } from "@ant-design/icons";

const Search= Input.Search;


const   TipoGastoCajaChicaPage = ()=> {

    const [lstTipoGastoCajaChica,setLstTipoGastoCajaChica] = useState([] as Array <IModelTipoGastoCajaChica>);
    const [lstFilter,setLstFilter] = useState([] as Array<IModelTipoGastoCajaChica>);
    const [loading,setLoading] = useState(false);
    const [tipoGastoCajaChica,setTipoGastoCajaChica] = useState({}as IModelTipoGastoCajaChica);
    const [isModalVisible,setIsModalVisible] = useState(false);
    const [isEdit,setIsEdit] = useState(false);

    useEffect(()=>{
        fetchListTipoGastoCajaChica();
    },[]);

    const fetchListTipoGastoCajaChica = async()=>{
        var result = TipoGastoCajaChicaService.GetListTipoGastoCajaChica(0);

        result.then((data:any)=>{
            setLstTipoGastoCajaChica(data);
        })
        .catch((error:any)=>{
            Modal.error({
                icon:<CloseCircleOutlined/>,
                type:"error",
                title:"Error",
                content:error.response.data
            });
        }).finally(()=>{setLoading(false);});

    }

    const changeModal = () =>{
        setIsModalVisible(!isModalVisible);
    }

    const editTipoGastaCajaChica = (data:IModelTipoGastoCajaChica)=>{
        setTipoGastoCajaChica(data);
        setIsEdit(true);
        changeModal();
    }

    const newTipoGastoCajaChica = ()=>{
        var tipoGastoCajaChica:IModelTipoGastoCajaChica={} as IModelTipoGastoCajaChica;
        setTipoGastoCajaChica(tipoGastoCajaChica);
        setIsEdit(false);
        setIsEdit(false);
        changeModal();
    }
    const save=(form:IModelTipoGastoCajaChica)=>{
        const modal=Modal.success({
            icon:<LoadingOutlined/>,
            title:"Guardando...",
            centered:true,
            content:"Se esta guardando el tipo de gasto caja chica"
        });

        var result=isEdit? TipoGastoCajaChicaService.EditTipoGastoCajaChica(form) : TipoGastoCajaChicaService.NewTipoGastoCajaChica(form);
        
        result.then((data:any)=>{
            modal.update({
                icon:<SaveOutlined/>,
                title:"Guardado",
                content:data,
                onOk:changeModal
            });
            fetchListTipoGastoCajaChica();
        }).catch((error:any)=>{
            modal.update({
                icon:<CloseCircleOutlined/>,
                type:"error",
                title:"Error",
                content:error.response.data
            });
        })
    }

    const search=(event:any)=>{
        setLoading(true);
        const filterTable = lstTipoGastoCajaChica.filter(o=>{
            const g=Object.keys as <T>(o:T)=>(Extract<keyof T,string>)[];
            return g(o).some(a=>{
                var isFind = String(o[a]).toLowerCase().includes(event.target.value);
                if(isFind) return o;
            })
        });
        setLstFilter(filterTable);
        setLoading(false);
    }
    return(

<></>
    );
}

export {TipoGastoCajaChicaPage};