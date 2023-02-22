import React,{useState,useContext,useRef} from 'react';
import { SaveOutlined,CloseCircleOutlined } from '@ant-design/icons';
import {Modal,Input,InputNumber,Popconfirm,Form,Row,Divider,Col,Select,Table,Tag,Space, Button} from "antd";
import { KeyObject } from 'crypto';
import { ColumnsType } from 'antd/es/table';

const GastoCCModal=()=>{

    const FormItem = Form.Item;  
    const EditableContext = React.createContext<any>(null);
    const EditableRow=({form,index,...props}:any)=>(
        <EditableContext.Provider value={form}>
            <tr {...props} />
        </EditableContext.Provider>
    );

    return (
        <React.Fragment>
            <Modal open={true} destroyOnClose={true} width={1000} style={{top:20}} title="Nuevo Gasto Caja Chica"></Modal>
            
        </React.Fragment>
    )

 }

export {GastoCCModal};