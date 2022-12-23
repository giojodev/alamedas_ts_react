import React,{useEffect,useState} from 'react';
import { Button,Col,Divider,Row,Table,Modal,Input,Tag } from 'antd';
import { TipoGastoService } from '../../services/tipogasto.services';
import { TipoGastoModal } from './components';
import { EditOutlined,LoadingOutlined,SaveOutlined,CloseCircleOutlined } from "@ant-design/icons";
import { ColumnsType } from 'antd/es/table';

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
        var result = TipoGastoService.GetListTipoGasto();

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
            okButtonProps:{ disabled:true },
            content:"Se esta guardando el tipo de gasto"
        });
        var result=TipoGastoService.NewTipoGasto(form);

        result.then((data:any)=>{
            modal.update({
                icon:<SaveOutlined/>,
                title:"Guardado",
                content:data,
                okButtonProps:{ disabled:false },
                onOk:changeModal
            });
            fetchListTipoGasto();
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

    const columns: ColumnsType<IModelTipoGasto> = [
        {
            title:'Id',
            dataIndex:'idGasto'
        },
        {
            title:'Nombre',
            dataIndex:'nombreGasto'
        },
        {
            title:'Estado',
            dataIndex:'activo',
            render:(text) => <Tag color={text==true?"green":"volcano"} >{text==true?String("Activo"):String("Inactivo")}</Tag> 
        },
        {
            title:'Acciones',
            dataIndex:'idUsuario',
            render:(text: string, row: IModelTipoGasto,index:number)=> <Button key={row.idGasto} icon={<EditOutlined/>} type='ghost' onClick={(w)=>{w.stopPropagation(); editTipoGasto(row)}}/>
        }
    ];


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
            <Row justify='center' align='middle'>
                <Col flex='auto'>
                    <Table scroll={{x:500}} columns={columns} rowKey="idGasto" dataSource={lstFilter.length>0 ? lstFilter : lstTipoGasto} size="small" loading={loading} />
                </Col>
            </Row>
            <TipoGastoModal showModal={isModalVisible} formData={tipoGasto} onChange={changeModal} isEditData={isEdit} onSave={save}/>
        </React.Fragment>
        </>
    );
}

export {TipoGastoPage};