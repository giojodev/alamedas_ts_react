import React,{useEffect,useState} from 'react';
import { Button,Col,Divider,Row,Table,Modal,Input,Tag } from 'antd';
import { GastoCajaChicaService } from '../../services';
import { EditOutlined,LoadingOutlined,SaveOutlined,CloseCircleOutlined } from "@ant-design/icons";
import { ColumnsType } from 'antd/es/table';
import { GastoCCModal } from './components';

const Search= Input.Search;

const GastoCCPage = () =>{

    const [loading,setLoading] = useState(false);
    const [lstGasto,stLstGasto] = useState([] as Array<IModelGastoCC>);
    const [lstFilter,setLstFilter] = useState([] as Array<IModelGastoCC>);

    const fetchListGastoCajaChica = async()=>{
        var result= GastoCajaChicaService.GetListGastosCC();

        result.then((data:any)=>{
            stLstGasto(data);
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

    const columns: ColumnsType<IModelGastoCC>=[
        {
            title:'Consecutivo',
            dataIndex: 'Consecutivo'
        },
        {
            title:'Mes',
            dataIndex:'Mes'
        },
        {
            title:'Año',
            dataIndex:'Anio'
        },
        {
            title:'Tipo Gasto',
            dataIndex:'nombreGastoCajachica'
        },
        {
            title:'Concepto',
            dataIndex:'Concepto'
        },
        {
            title:'Total',
            dataIndex:'Total'
        },
        {
            title:'Estado',
            dataIndex:'Anulado',
            render:(text)=> <Tag color={text==true?"volcano":"green"}>{text==true?String("Anulado"):String("Activo")}</Tag>
        },
        {
            title:'Acciones',
            dataIndex:'Consecutivo',
            render:(text: string, row: IModelGastoCC,index:number)=> <Button key={row.Consecutivo} icon={<EditOutlined/>} type='ghost' onClick={(w)=>{}}/>
        }
    ];

    useEffect(()=>{
        fetchListGastoCajaChica();
    },[]);
}