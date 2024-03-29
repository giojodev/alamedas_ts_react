import React, {useEffect,useState } from "react";
import {Button,Col,Divider,Row,Table,Modal,Input,Tag} from 'antd';
import {CondominoService} from '../../services';
import {CondominoModal} from './components';
import { EditOutlined,LoadingOutlined,SaveOutlined,CloseCircleOutlined } from "@ant-design/icons";

const Search=Input.Search;

const CondominiumPage = () =>{
const [lstCondomino,setLstCondomino] = useState([] as Array<IModelCondomino>);
const [lstFilter,setLstFilter] = useState([] as Array<IModelCondomino>);
const [loading,setLoading]= useState(false);
const [condomino,setCondomino]= useState({} as IModelCondomino);
const [isModalVisible,setIsModalVisible]= useState(false);
const [isEdit,setIsEdit]= useState(false);

useEffect(()=>{
    fetchListCondomino();
},[]);

const fetchListCondomino = async()=>{

    var result= CondominoService.GetListCondomino();
    
    result.then((data:any)=>{
        setLstCondomino(data);
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

const editCondomino = (data:IModelCondomino) =>{
    setCondomino(data);
    setIsEdit(true);
    changeModal();
}

const newCondomino=()=>{
    var condomino:IModelCondomino={} as IModelCondomino;
    setCondomino(condomino);
    setIsEdit(false);
    changeModal();
}

const save=(form: IModelCondomino)=>{
    const modal=Modal.success({
        icon:<LoadingOutlined/>,
        title:"Guardando...",
        centered:true,
        content:"Se esta guardando condomino",
        okButtonProps:{disabled:true}
    });

    var result=isEdit? CondominoService.EditCondomino(form) : CondominoService.NewCondomino(form);

    result.then((data:any)=>{
        modal.update({
            icon:<SaveOutlined/>,
            title:"Guardado",
            content:data,
            onOk:changeModal,
            okButtonProps:{disabled:false}
        });
        fetchListCondomino();
    }).catch((error:any)=>{
        modal.update({
            icon:<CloseCircleOutlined/>,
            type:"error",
            title:"Error",
            content:error.response.data,
            okButtonProps:{disabled:false}
        });
    });

}

const search=(event:any,)=>{
    setLoading(true);
    const filterTable = lstCondomino.filter(o =>{
        const g=Object.keys as <T>(o:T) =>(Extract<keyof T,string>)[];
        return g(o).some(a=>{
            var isFind = String(o[a]).toLowerCase().includes(event.target.value);
            if(isFind) return o;
        })
    });
    setLstFilter(filterTable);
    setLoading(false);
}

return (
    <React.Fragment>
        <Row gutter={[16,16]} justify="end" align="middle">
            <Col>
                <Search type="search" placeholder="Buscar" onChange={search}>
                </Search>
            </Col>
            <Col>
                <Button type="primary" onClick={newCondomino}>
                    Nuevo Condomino
                </Button>
            </Col>
        </Row>
        <Divider/>
        <Table<IModelCondomino> scroll={{ x: 500 }} bordered rowKey="idCondomino" dataSource={lstFilter.length>0 ? lstFilter : lstCondomino} size="small" loading={loading}>
            <Table.Column<IModelCondomino> key="idCondomino" title="Numero Casa" dataIndex="idCondomino"/>
            <Table.Column<IModelCondomino> key="nombreCompleto" title="Dueño" dataIndex="nombreCompleto"/>
            <Table.Column<IModelCondomino> key="nombreInquilino" title="Residente" dataIndex="nombreInquilino"/>
            <Table.Column<IModelCondomino> key="correo" title="Correo" dataIndex="correo" />
            <Table.Column<IModelCondomino> key="telefono" title="Telefono" dataIndex="telefono"/>
            <Table.Column<IModelCondomino> key="activo" title="Estado" dataIndex="activo" render={(text) => <Tag color={text?"green":"volcano"} >{text?String("Activo"):String("Inactivo")}</Tag> } />
            <Table.Column key="idCondomino" title="Acciones" fixed="right" render={
                (row) =>  <Button key={row.id} icon={<EditOutlined/>} type="ghost" onClick={() => editCondomino(row)} />   
             }/>
        </Table>
        <CondominoModal showModal={isModalVisible} formData={condomino} onChange={changeModal} isEditData={isEdit} onSave={save}/>
    </React.Fragment>
)

}

export {CondominiumPage};