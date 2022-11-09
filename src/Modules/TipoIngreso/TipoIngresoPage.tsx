import React,{useEffect,useState} from 'react';
import { Button,Col,Divider,Row,Table,Modal,Input,Tag } from 'antd';
import { TipoIngresoCajaChicaService } from '../../services/tipoingresocajachica.services';
import { TipoIngresoModal } from './components';
import { EditOutlined,LoadingOutlined,SaveOutlined,CloseCircleOutlined } from "@ant-design/icons";
import { useForm } from 'antd/es/form/Form';

const Search = Input.Search;
const TipoIngresoPage = () =>{}

export {TipoIngresoPage}