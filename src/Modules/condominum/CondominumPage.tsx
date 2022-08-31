import { createElement,useEffect,useState } from "react";
import {Button,Col,Divider,Row,Table,Modal,Tag,Input} from 'antd';
import {CondominoService} from '../../services';
import {CondominoModal} from './components';
import { EditOutlined,LoadingOutlined,SaveOutlined,CloseCircleOutlined } from "@ant-design/icons";
import { setUseProxies } from "immer";
const Search=Input.Search;

const CondominiumPage =()=>{
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
    var result=await CondominoService.GetListCondomino();
    setLstCondomino(result);
    setLoading(false);
}

const changeModal=()=>{
    setIsModalVisible(!isModalVisible);
}

// const StateRender=(text:string,record:IModelCondomino,index:number)=>{
//     let state:string ="ND";
// }

const EditRender=(text:string,record:IModelCondomino,index:number)=>{
    return(
        <Button key={record.ID_CONDOMINO} icon={<EditOutlined/>} type="ghost" onClick={e=>{e.stopPropagation;editCondomino(record);}}>
        </Button>
    );
}

const editCondomino=(data:IModelCondomino) =>{
    setIsEdit(true);
    setCondomino(data);
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

    });

    var result=isEdit? CondominoService.EditCondomino(form) : CondominoService.NewCondomino(form);

    result.then((data:any)=>{
        modal.update({
            icon:<SaveOutlined/>,
            title:"Guardado",
            content:data,
            onOk:changeModal
        });
        fetchListCondomino();
    }).catch((error:any)=>{
        modal.update({
            icon:<CloseCircleOutlined/>,
            type:"error",
            title:"Error",
            content:error.response.data
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
    <>
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
    <Row justify="center" align="middle">
        <Col flex="auto">
            <Table<IModelCondomino> rowKey="ID_CONDOMINO" dataSource={lstFilter.length>0 ? lstFilter : lstCondomino} size="small" loading={loading}>
                <Table.Column<IModelCondomino> key="ID_CONDOMINO" title="Numero Casa" dataIndex="ID_CONDOMINO"/>
                <Table.Column<IModelCondomino> key="NOMBRE_COMPLETO" title="Dueño" dataIndex="NOMBRE_COMPLETO"/>
                <Table.Column<IModelCondomino> key="NOMBRE_INQUILINO" title="Residente" dataIndex="NOMBRE_INQUILINO"/>
                <Table.Column<IModelCondomino> key="CORREO" title="Correo" dataIndex="CORREO"/>
                <Table.Column<IModelCondomino> key="TELEFONO" title="Telefono" dataIndex="TELEFONO"/>
                <Table.Column<IModelCondomino> key="ACTIVO" title="Activo" dataIndex="ACTIVO"/>
                <Table.Column key="action" title="Acciones" dataIndex="ACCIONES" fixed="right" render={EditRender}/>
            </Table>
        </Col>
    </Row>
    <CondominoModal showModal={isModalVisible} formData={condomino} onChange={changeModal} isEditData={isEdit} onSave={save}/>
</>
)

}

export {CondominiumPage};