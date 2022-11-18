import React,{useEffect,useState} from 'react';
import { Button,Col,Divider,Row,Table,Modal,Input,Tag } from 'antd';
import { TipoGastoService } from '../../services/tipogasto.services';
import { TipoGastoModal } from './components';
import { EditOutlined,LoadingOutlined,SaveOutlined,CloseCircleOutlined } from "@ant-design/icons";
import { useForm } from 'antd/es/form/Form';

const Search= Input.Search;

const TipoGastoPage = () =>{

    const [lstTipoGasto,setLstTipoGasto] = useState([] as Array<IModelTipoGasto>);
    const [lstFilter,setLstFilter] = useState([] as Array<IModelTipoGasto>);
    const [loading,setLoading] = useState(false);
    const [tipoGasto,setTipoGasto] = useState({} as IModelTipoGasto);
    const[isModalVisible,setIsModalVisible] = useState(false);
    const[isEdit,setIsEdit] = useState(false);

    useEffect(()=>{
        fetchListTipoGasto();
    },[]);

    const fetchListTipoGasto = async()=>{
        var result = TipoGastoService.GetListTipoGasto(0);

        result.then((data:any)=>{
            setLstTipoGasto(data);
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
    const editTipoGasto = (data:IModelTipoGasto)=>{
        setTipoGasto(data);
        setIsEdit(true);
        changeModal();
    }

    const newTipoGasto=()=>{
        var tipoGasto:IModelTipoGasto={} as IModelTipoGasto;
        setTipoGasto(tipoGasto);
        setIsEdit(false);
        changeModal();
    }

    const save = (form:IModelTipoGasto)=>{
        const modal=Modal.success({
            icon:<LoadingOutlined/>,
            title:"Guardando....",
            centered:true,
            content:"Se esta guardando el tipo de gasto"
        });

        var result=isEdit? TipoGastoService.EditTipoGasto(form):TipoGastoService.NewTipoGasto(form);

        result.then((data:any)=>{
            modal.update({
                icon:<SaveOutlined/>,
                title:"Guardado",
                content:data,
                onOk:changeModal
            });
            fetchListTipoGasto();
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
        const filterTable = lstTipoGasto.filter(o=>{
            const g = Object.keys as <T>(o:T)=>(Extract<keyof T,string>)[];
            return g(o).some(a=>{
                var isFind = String (o[a]).toLowerCase().includes(event.target.value);
                if(isFind) return o;
            })
        });
        setLstFilter(filterTable);
        setLoading(true);
    }

    return(
        <>
        <React.Fragment>
            <Row gutter={[16,16]} justify="end" align='middle'>
                <Col>
                <Search type="search" placeholder='Buscar' onChange={search}></Search>
                </Col>
                <Col>
                <Button type="primary" onClick={newTipoGasto}>Nuevo Tipo Gasto</Button>
                </Col>
            </Row>
            <Divider/>
            <Table<IModelTipoGasto> scroll={{x:500}} bordered rowKey="idGasto" dataSource={lstFilter.length>0 ? lstFilter:lstTipoGasto} size="small" loading={loading}>
                <Table.Column<IModelTipoGasto> key="idGasto" title="Id Gasto" dataIndex="idGasto" />
                <Table.Column<IModelTipoGasto> key="nombreGasto" title="Nombre Tipo Gasto" dataIndex="nombreGasto"/>
                <Table.Column<IModelTipoGasto> key="activo" title="Estado" dataIndex="activo"render={(text) => <Tag color={text==true?"green":"volcano"} >{text==true?String("Activo"):String("Inactivo")}</Tag> } />
                <Table.Column key="idGasto" title="Acciones" fixed='right' render={
                    (row)=> <Button key={row.id} icon={<EditOutlined/>} type='ghost' onClick={()=>editTipoGasto(row)}/>
                }/>
            </Table>
            <TipoGastoModal showModal={isModalVisible} formData={tipoGasto} onChange={changeModal} isEditData={isEdit} onSave={save}/>
        </React.Fragment>
        </>
    );
}

export {TipoGastoPage};