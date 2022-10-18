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

    return(

<></>
    );
}

export {TipoGastoCajaChicaPage};