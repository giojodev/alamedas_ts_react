import React,{useEffect,useState} from 'react';
import { Button,Col,Divider,Row,Table,Modal,Input,Tag } from 'antd';
import { TipoIngresoService } from '../../services/tipoingreso.services';
import { TipoIngresoModal } from './components';
import { EditOutlined,LoadingOutlined,SaveOutlined,CloseCircleOutlined } from "@ant-design/icons";
import { ColumnsType } from 'antd/es/table';

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
            okButtonProps:{ disabled:true },
            content:"Se esta guardando el tipo de ingreso"
        });

        var result= TipoIngresoService.NewTipoIngreso(form);
        result.then((data:any)=>{
            modal.update({
                icon:<SaveOutlined/>,
                title:"Guardado",
                content:data,
                okButtonProps:{ disabled:false },
                onOk:changeModal
            });
            fetchListTipoIngreso();
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

    const columns: ColumnsType<IModelTipoIngreso> = [
        {
            title:'Id',
            dataIndex:'idIngreso'
        },
        {
            title:'Nombre',
            dataIndex:'nombreIngreso'
        },
        {
            title:'Estado',
            dataIndex:'activo',
            render:(text) => <Tag color={text==true?"green":"volcano"} >{text==true?String("Activo"):String("Inactivo")}</Tag> 
        },
        {
            title:'Acciones',
            dataIndex:'idUsuario',
            render:(text: string, row: IModelTipoIngreso,index:number)=> <Button key={row.idIngreso} icon={<EditOutlined/>} type='ghost' onClick={(w)=>{w.stopPropagation(); editTipoIgreso(row)}}/>
        }
    ];

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
            <Row justify='center' align='middle'>
                <Col flex='auto'>
                    <Table scroll={{x:500}} columns={columns} rowKey="idIngreso" dataSource={lstFilter.length>0 ? lstFilter : lstTipoIngreso} size="small" loading={loading} />
                </Col>
            </Row>
            <TipoIngresoModal showModal={isModalVisible} formData={tipoIngreso} isEditData={isEdit} onChange={changeModal} onSave={save}/>
        </React.Fragment>
        </>
    )
}

export {TipoIngresoPage}