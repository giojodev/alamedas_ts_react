import React,{useEffect,useState} from 'react';
import { Button,Col,Divider,Row,Table,Modal,Input,Tag } from 'antd';
import { TipoIngresoCajaChicaService } from '../../services/tipoingresocajachica.services';
import { TipoIngresoCajaChicaModal } from './components';
import { EditOutlined,LoadingOutlined,SaveOutlined,CloseCircleOutlined } from "@ant-design/icons";
import { useForm } from 'antd/es/form/Form';

const Search = Input.Search;

const TipoIngresoCajaChicaPage = () =>{

    const [lstTipoIngresoCajaChica, setLstTipoIngresoCajaChica] = useState([] as Array<IModelTipoIngresoCajaChica>);
    const [lstFilter,setLstFilter] = useState([] as Array<IModelTipoIngresoCajaChica>);
    const [loading,setLoading] = useState(false);
    const [tipoIngresoCajaChica,setTipoIngresoCajaChica] = useState({} as IModelTipoIngresoCajaChica);
    const [isModalVisible,setIsModalVisible] = useState(false);
    const [isEdit,setIsEdit] = useState(false);

    useEffect(()=>{
        fetchListTipoIngresoCajaChica();
    },[]);

    const fetchListTipoIngresoCajaChica = async()=>{
        var result = TipoIngresoCajaChicaService.GetListTipoIngresoCajaChica(0);

        result.then((data:any)=>{
            setLstTipoIngresoCajaChica(data);
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
    const changeModal = ()=>{
        setIsModalVisible(!isModalVisible);
    }
    const editTipoIngresoCajaChica = (data:IModelTipoIngresoCajaChica)=>{
        setTipoIngresoCajaChica(data);
        setIsEdit(true);
        changeModal();
    }
    const newTipoIngresoCajaChica = () =>{
        var tipoIngresoIngresoCajaChica:IModelTipoIngresoCajaChica ={} as IModelTipoIngresoCajaChica;
        setTipoIngresoCajaChica(tipoIngresoCajaChica);
        setIsEdit(false);
        changeModal();
    }

    const save = (form:IModelTipoIngresoCajaChica)=>{
        const modal = Modal.success({
            icon:<LoadingOutlined/>,
            title:"Guardando...",
            centered:true,
            content:"Se esta guardando el tio de ingreso caja chica"
        });

        var result=isEdit? TipoIngresoCajaChicaService.EditTipoIngresoCajaChica(form) : TipoIngresoCajaChicaService.NewTipoIngresoCajaChica(form);
        result.then((data:any)=>{
            modal.update({
                icon:<SaveOutlined/>,
                title:"Guardado",
                content:data,
                onOk:changeModal
            });
            fetchListTipoIngresoCajaChica();
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
        const filterTable = lstTipoIngresoCajaChica.filter(o=>{
            const g = Object.keys as <T>(o:T)=>(Extract<keyof T,string>)[];
            return g(o).some(a=>{
                var isFind = String (o[a]).toLowerCase().includes(event.target.value);
                if(isFind) return o;
            })
        });
        setLstFilter(filterTable);
        setLoading(true);
    }
    
    return (
        <></>
    );
}

export {TipoIngresoCajaChicaPage}