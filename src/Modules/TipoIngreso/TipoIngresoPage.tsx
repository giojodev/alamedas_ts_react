import React,{useEffect,useState} from 'react';
import { Button,Col,Divider,Row,Table,Modal,Input,Tag } from 'antd';
import { TipoIngresoService } from '../../services/tipoingreso.services';
import { TipoIngresoModal } from './components';
import { EditOutlined,LoadingOutlined,SaveOutlined,CloseCircleOutlined } from "@ant-design/icons";
import { useForm } from 'antd/es/form/Form';
import { is } from 'immer/dist/internal';
import { TipoIngresoCajaChicaModal } from '../TipoIngresoCajaChica/components';

const Search = Input.Search;
const TipoIngresoPage = () =>{
    const [lstTipoIngreso, setLstTipoIngreso] = useState([] as Array<IModelTipoIngreso>);
    const [lstFilter,setLstFilter] = useState([] as Array<IModelTipoIngreso>);
    const [loading,setLoading] = useState(false);
    const [tipoIngreso,setTipoIngreso] = useState({} as IModelTipoIngreso);
    const [isModalVisible,setIsModalVisible] = useState(false);
    const [isEdit,setIsEdit] = useState(false);

    useEffect(()=>{
        fetchListTipoIngreso();
    },[]);

    const fetchListTipoIngreso = async()=>{
        var result = TipoIngresoService.GetListTipoIngreso(0);

        result.then((data:any)=>{
            setLstTipoIngreso(data);
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
    const changeModal=()=>{
        setIsModalVisible(!isModalVisible);
    }

    const editTipoIgreso = (data:IModelTipoIngreso)=>{
        setTipoIngreso(data);
        setIsEdit(true);
        changeModal();
    }

    const newTipoIngreso=()=>{
        var tipoIngreso:IModelTipoIngreso ={} as IModelTipoIngreso;
        setTipoIngreso(tipoIngreso);
        setIsEdit(false);
        changeModal();
    }

    const save=(form:IModelTipoIngreso)=>{
        const modal = Modal.success({
            icon:<LoadingOutlined/>,
            title:"Guardando...",
            centered:true,
            content:"Se esta guardando el tipo de ingreso"
        });

        var result=isEdit? TipoIngresoService.EditTipoIngreso(form) : TipoIngresoService.NewTipoIngreso(form);
        result.then((data:any)=>{
            modal.update({
                icon:<SaveOutlined/>,
                title:"Guardado",
                content:data,
                onOk:changeModal
            });
            fetchListTipoIngreso();
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
        const filterTable=lstTipoIngreso.filter(o=>{
            const g = Object.keys as <T>(o:T)=>(Extract<keyof T,string>)[];
            return g(o).some(a=>{
                var isFind = String(o[a]).toLowerCase().includes(event.target.value);
                if(isFind) return o;
            })
        });
        setLstFilter(filterTable);
        setLoading(true);
    }
    return (
        <>
        <React.Fragment>
            <Row gutter={[16,16]} justify="end" align='middle'>
                <Col>
                <Search type="search" placeholder='Buscar' onChange={search}></Search>
                </Col>
                <Col>
                <Button type='primary' onClick={newTipoIngreso}>Nuevo Tipo Ingreso</Button>
                </Col>
            </Row>
            <Divider/>
            <Table<IModelTipoIngreso> scroll={{x:500}} bordered rowKey="idIngreso" dataSource={lstFilter.length>0 ?lstFilter:lstTipoIngreso} size="small" loading={loading}>
                <Table.Column<IModelTipoIngreso> key="idIngreso" title="Id Ingreso" dataIndex={"idIngreso"}/>
                <Table.Column<IModelTipoIngreso> key="nombreIngreso" title="Nombre Ingreso" dataIndex={"nombreIngreso"}/>
                <Table.Column<IModelTipoIngreso> key="activo" title="Estado" dataIndex="activo"render={(text) => <Tag color={text==true?"green":"volcano"} >{text==true?String("Activo"):String("Inactivo")}</Tag> } />
                <Table.Column key="idIngreso" title="Acciones" fixed='right' render={
                    (row)=> <Button key={row.id} icon={<EditOutlined/>} type='ghost' onClick={()=>editTipoIgreso(row)}/>
                }/>
            </Table>
            <TipoIngresoCajaChicaModal showModal={isModalVisible} formData={tipoIngreso} isEditData={isEdit} onChange={changeModal} onSave={save}/>
        </React.Fragment>
        </>
    )
}

export {TipoIngresoPage}