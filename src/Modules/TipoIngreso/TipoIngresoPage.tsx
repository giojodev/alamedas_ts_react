import React,{useEffect,useState} from 'react';
import { Button,Col,Divider,Row,Table,Modal,Input,Tag } from 'antd';
import { TipoIngresoService } from '../../services/tipoingreso.services';
import { TipoIngresoModal } from './components';
import { EditOutlined,LoadingOutlined,SaveOutlined,CloseCircleOutlined } from "@ant-design/icons";
import { useForm } from 'antd/es/form/Form';

const Search = Input.Search;
const TipoIngresoPage = () =>{
    const [lstTipoIngreso, setLstTipoIngreso] = useState([] as Array<IModelTiPoIngreso>);
    const [lstFilter,setLstFilter] = useState([] as Array<IModelTiPoIngreso>);
    const [loading,setLoading] = useState(false);
    const [tipoIngreso,setTipoIngreso] = useState({} as IModelTiPoIngreso);
    const [isModalVisible,setIsModalVisible] = useState(false);
    const [isEdit,setIsEdit] = useState(false);
}

export {TipoIngresoPage}