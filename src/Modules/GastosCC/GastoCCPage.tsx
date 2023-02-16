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
}