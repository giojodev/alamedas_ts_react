import React,{useEffect,useState} from 'react';
import { Button,Col,Divider,Row,Table,Modal,Input,Tag } from 'antd';
import { AccountService } from '../../services';
import { UserAppModal } from './components';
import { EditOutlined,LoadingOutlined,SaveOutlined,CloseCircleOutlined } from "@ant-design/icons";
import { ColumnsType } from 'antd/es/table';

const Search = Input.Search;

const UserAppPage = () =>{

    const [lstUser, setLstUser] = useState([] as Array<IModelUserApp>);
    const [lstFilter,setLstFilter] = useState([] as Array<IModelUserApp>);
    const [loading,setLoading] = useState(false);
    const [User,setUser] = useState({} as IModelUserApp);
    const [isModalVisible,setIsModalVisible] = useState(false);
    const [isEdit,setIsEdit] = useState(false);

    useEffect(()=>{
        fetchListUser();
    },[]);

    const fetchListUser = async()=>{

        var result = AccountService.GetListUser();

        result.then((data:any)=>{
            setLstUser(data);
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

    const changeModal = ()=>{
        setIsModalVisible(!isModalVisible);
    }

    const editUser = (data:IModelUserApp)=>{
        setUser(data);
        setIsEdit(true);
        changeModal();
    }
    
    const NewUser = () =>{
        setUser({} as IModelUserApp);
        setIsEdit(false);
        changeModal();
    }

    const save = (form:IModelUserApp)=>{
        const modal = Modal.success({
            icon:<LoadingOutlined/>,
            title:"Guardando...",
            centered:true,
            okButtonProps:{ disabled:true },
            content:"Se esta guardando el usuario"
        });

        var result=isEdit? AccountService.EditUser(form) : AccountService.NewUser(form);
        result.then((data:any)=>{
            modal.update({
                icon:<SaveOutlined/>,
                title:"Guardado",
                content:data,
                okButtonProps:{ disabled:false },
                onOk:changeModal
            });
            fetchListUser();
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

    const search=(event:any)=>{
        setLoading(true);
        const filterTable = lstUser.filter(o=>{
            const g = Object.keys as <T>(o:T)=>(Extract<keyof T,string>)[];
            return g(o).some(a=>{
                var isFind = String (o[a]).toLowerCase().includes(event.target.value);
                if(isFind) return o;
            })
        });
        setLstFilter(filterTable);
        setLoading(true);
    }
    
    const columns: ColumnsType<IModelUserApp> = [
        {
            title:'Id',
            dataIndex:'idUsuario'
        },
        {
            title:'Usuario',
            dataIndex:'usuario1'
        },
        {
            title:'Nombre',
            dataIndex:'nombre'
        },
        {
            title:'Correo',
            dataIndex:'correo'
        },
        {
            title:'Admin',
            dataIndex:'admin',
            render:(text) => <Tag color={text==true?"green":"volcano"} >{text==true?String("Si"):String("No")}</Tag> 
        },
        {
            title:'Estado',
            dataIndex:'activo',
            render:(text) => <Tag color={text==true?"green":"volcano"} >{text==true?String("Activo"):String("Inactivo")}</Tag> 
        },
        {
            title:'Acciones',
            dataIndex:'idUsuario',
            render:(text: string, row: IModelUserApp,index:number)=> <Button key={row.idUsuario} icon={<EditOutlined/>} type='ghost' onClick={(w)=>{w.stopPropagation(); editUser(row)}}/>
        }
    ];

    return (
        <React.Fragment>
            <Row gutter={[16,16]} justify="end" align='middle'>
                <Col>
                    <Search type='search' placeholder='Buscar' onChange={search}></Search>
                </Col>
                <Col>
                    <Button type='primary' onClick={NewUser}>Nuevo Usuario</Button>
                </Col>
            </Row>
            <Divider/>
            <Row justify='center' align='middle'>
                <Col flex='auto'>
                    <Table scroll={{x:500}} columns={columns} rowKey="idUsuario" dataSource={lstFilter.length>0 ? lstFilter : lstUser} size="small" loading={loading} />
                </Col>
            </Row>
            <UserAppModal showModal={isModalVisible} formData={User} onChange={changeModal} isEditData={isEdit} onSave={save}/>
        </React.Fragment>
    );
}

export {UserAppPage};