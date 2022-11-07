import {useState} from 'react';
import { SaveOutlined,CloseCircleOutlined } from '@ant-design/icons';
import {Modal,Input,InputNumber,Form,Row,Divider,Col,Radio, Button} from "antd";

const TipoGastoModal =({showModal,formData,onChange,isEditData,onSave}: PropTipoIngreso)=>{
    const spanCol : number = 12; 
    const [currentValueRadio,setCurrentValueRadio] = useState(formData.activo);

    return(
        <></>
    )
}   

export {TipoGastoModal};