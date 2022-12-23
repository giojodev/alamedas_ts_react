import React,{useEffect,useState} from 'react';
import { Button,Col,Divider,Row,Table,Modal,Input,Tag } from 'antd';
import { AccountService } from '../../services/account.services';
import { RoleModal } from './components';
import { EditOutlined,LoadingOutlined,SaveOutlined,CloseCircleOutlined } from "@ant-design/icons";
import { ColumnsType } from 'antd/es/table';

const Search= Input.Search;

const RolePage = () =>{
    const [lstRole,setLstRole] = useState([] as Array<IModelRole>);
    const [lstFilter,setLstFilter] = useState([] as Array<IModelRole>);
    const [loading,setLoading] = useState(false);
    const [rol,setRol] = useState({} as IModelRole);
    const[isModalVisible,setIsModalVisible] = useState(false);
    const[isEdit,setIsEdit] = useState(false);

    useEffect(()=>{
        fetchListRole();
    },[]);

    const fetchListRole = async()=>{
        var result = AccountService.GetListRole();

        result.then((data:any)=>{
            setLstRole(data);
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

    const changeModal = () =>{setIsModalVisible(!isModalVisible);}

    const editRole = (data:IModelRole)=>{
        setRol(data);
        setIsEdit(true);
        changeModal();
    }

    const newRole=()=>{
        var rol:IModelRole={} as IModelRole;
        setRol(rol);
        setIsEdit(false);
        changeModal();
    }

    const save = (form:IModelRole)=>{
        const modal = Modal.success({
            icon:<LoadingOutlined/>,
            title:"Guardando...",
            centered:true,
            okButtonProps:{ disabled:true },
            content:"Se esta guardando el rol"
        });

        var result=isEdit? AccountService.EditRole(form) : AccountService.NewRol(form);
        result.then((data:any)=>{
            modal.update({
                icon:<SaveOutlined/>,
                title:"Guardado",
                content:data,
                okButtonProps:{ disabled:false },
                onOk:changeModal
            });
            fetchListRole();
        }).catch((error:any)=>{
            modal.update({
                icon:<CloseCircleOutlined/>,
                type:"error",
                title:"Error",
                okButtonProps:{ disabled:false },
                content:error.response.data
            });
        })
    }

    const columns: ColumnsType<IModelRole> = [
        {
            title:'Id',
            dataIndex:'idRol'
        },
        {
            title:'Nombre',
            dataIndex:'nombre'
        },
        {
            title:'Descripcion',
            dataIndex:'descripcion'
        },
        {
            title:'Acciones',
            dataIndex:'idUsuario',
            render:(text: string, row: IModelRole,index:number)=> <Button key={row.idRol} icon={<EditOutlined/>} type='ghost' onClick={(w)=>{w.stopPropagation(); editRole(row)}}/>
        }
    ];


    return(
        <>
            <Row gutter={[16,16]} justify="end" align='middle'>
                <Col>
                    <Search type='search' placeholder='Buscar' ></Search>
                </Col>
                <Col>
                    <Button type='primary' onClick={newRole}>Nuevo Rol</Button>
                </Col>
            </Row>
            <Divider/>
            <Row justify='center' align='middle'>
                <Col flex='auto'>
                    <Table scroll={{x:500}} columns={columns} rowKey="idRol" dataSource={lstFilter.length>0 ? lstFilter : lstRole} size="small" loading={loading} />
                </Col>
            </Row>
            <RoleModal showModal={isModalVisible} formData={rol} onChange={changeModal} isEditData={isEdit} onSave={save}/>
        </>
    );
}

export {RolePage};