import React,{useEffect,useState} from 'react';
import { Button,Col,Divider,Row,Table,Modal,Input,Tag } from 'antd';
import { TipoIngresoCajaChicaService } from '../../services/tipoingresocajachica.services';
import { TipoIngresoCCModal } from './components';
import { EditOutlined,LoadingOutlined,SaveOutlined,CloseCircleOutlined } from "@ant-design/icons";
import { ColumnsType } from 'antd/es/table';

const Search = Input.Search;

const TipoIngresoCCPage = () =>{

    const [lstTipoIngresoCajaChica, setLstTipoIngresoCajaChica] = useState([] as Array<IModelTipoIngresoCajaChica>);
    const [lstFilter,setLstFilter] = useState([] as Array<IModelTipoIngresoCajaChica>);
    const [loading,setLoading] = useState(false);
    const [tipoIngresoCajaChica,setTipoIngresoCajaChica] = useState({} as IModelTipoIngresoCajaChica);
    const [isModalVisible,setIsModalVisible] = useState(false);
    const [isEdit,setIsEdit] = useState(false);

    useEffect(()=>{
        fetchListTipoIngresoCajaChica();
    },[]);

    const fetchListTipoIngresoCajaChica = async()=>{
        var result = TipoIngresoCajaChicaService.GetListTipoIngresoCajaChica(0);

        result.then((data:any)=>{
            setLstTipoIngresoCajaChica(data);
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

    const editTipoIngresoCajaChica = (data:IModelTipoIngresoCajaChica)=>{
        setTipoIngresoCajaChica(data);
        setIsEdit(true);
        changeModal();
    }
    
    const newTipoIngresoCajaChica = () =>{
        setTipoIngresoCajaChica({} as IModelTipoIngresoCajaChica);
        setIsEdit(false);
        changeModal();
    }

    const save = (form:IModelTipoIngresoCajaChica)=>{
        const modal = Modal.success({
            icon:<LoadingOutlined/>,
            title:"Guardando...",
            centered:true,
            content:"Se esta guardando el tipo de ingreso caja chica"
        });

        var result=isEdit? TipoIngresoCajaChicaService.EditTipoIngresoCajaChica(form) : TipoIngresoCajaChicaService.NewTipoIngresoCajaChica(form);
        result.then((data:any)=>{
            modal.update({
                icon:<SaveOutlined/>,
                title:"Guardado",
                content:data,
                onOk:changeModal
            });
            fetchListTipoIngresoCajaChica();
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
        const filterTable = lstTipoIngresoCajaChica.filter(o=>{
            const g = Object.keys as <T>(o:T)=>(Extract<keyof T,string>)[];
            return g(o).some(a=>{
                var isFind = String (o[a]).toLowerCase().includes(event.target.value);
                if(isFind) return o;
            })
        });
        setLstFilter(filterTable);
        setLoading(true);
    }
    
    const columns: ColumnsType<IModelTipoIngresoCajaChica> = [
        {
            title:'Id',
            dataIndex:'idIngresoaCajaChica'
        },
        {
            title:'Nombre Tipo Ingreso CC',
            dataIndex:'nombreIngresoCajaChica'
        },
        {
            title:'Estado',
            dataIndex:'activo',
            render:(text) => <Tag color={text==true?"green":"volcano"} >{text==true?String("Activo"):String("Inactivo")}</Tag> 
        },
        {
            title:'Acciones',
            dataIndex:'idIngresoaCajaChica',
            render:(text: string, row: IModelTipoIngresoCajaChica,index:number)=> <Button key={row.idIngresoaCajaChica} icon={<EditOutlined/>} type='ghost' onClick={(w)=>{w.stopPropagation(); editTipoIngresoCajaChica(row)}}/>
        }
    ];

    return (
        <React.Fragment>
            <Row gutter={[16,16]} justify="end" align='middle'>
                <Col>
                    <Search type='search' placeholder='Buscar' onChange={search}></Search>
                </Col>
                <Col>
                    <Button type='primary' onClick={newTipoIngresoCajaChica}>Nuevo Tipo Ingreso Caja Chica</Button>
                </Col>
            </Row>
            <Divider/>
            <Row justify='center' align='middle'>
                <Col flex='auto'>
                    <Table scroll={{x:500}} columns={columns} rowKey="idTipoIngresoaCajaChica" dataSource={lstFilter.length>0 ? lstFilter : lstTipoIngresoCajaChica} size="small" loading={loading} />
                </Col>
            </Row>
            <TipoIngresoCCModal showModal={isModalVisible} formData={tipoIngresoCajaChica} onChange={changeModal} isEditData={isEdit} onSave={save}/>
        </React.Fragment>
    );
}

export {TipoIngresoCCPage};