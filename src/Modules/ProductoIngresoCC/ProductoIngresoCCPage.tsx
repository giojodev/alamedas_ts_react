import React,{useEffect,useState} from 'react';
import { Button,Col,Divider,Row,Table,Modal,Input,Tag } from 'antd';
import { ProductosService } from '../../services';
import { EditOutlined,LoadingOutlined,SaveOutlined,CloseCircleOutlined } from "@ant-design/icons";
import { ProductoIngresoCCModal } from './components';
import { ColumnsType } from 'antd/es/table';
const Search = Input.Search;

const  ProductoIngresoCCPage = ()=> {

    const [lstProducto, setLstProducto] = useState([] as Array<IModelProductoIngresoCC>);
    const [lstFilter,setLstFilter] = useState([] as Array<IModelProductoIngresoCC>);
    const [loading,setLoading] = useState(false);
    const [Producto,setProducto] = useState({} as IModelProductoIngresoCC);
    const [isModalVisible,setIsModalVisible] = useState(false);
    const [isEdit,setIsEdit] = useState(false);

    const save = (form:IModelProductoIngresoCC)=>{
        const modal = Modal.success({
            icon:<LoadingOutlined/>,
            title:"Guardando...",
            centered:true,
            okButtonProps:{ disabled:true },
            content:"Se esta guardando el producto"
        });

        var result=isEdit? ProductosService.EditIngresoCC(form) : ProductosService.NewIngresoCC(form);

        result.then((data:any)=>{
            modal.update({
                icon:<SaveOutlined/>,
                title:"Guardado",
                content:data,
                okButtonProps:{ disabled:false },
                onOk:changeModal
            });
            fetchListTipoIngresoCajaChica();
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
        const filterTable = lstProducto.filter(o=>{
            const g = Object.keys as <T>(o:T)=>(Extract<keyof T,string>)[];
            return g(o).some(a=>{
                var isFind = String (o[a]).toLowerCase().includes(event.target.value);
                if(isFind) return o;
            })
        });
        setLstFilter(filterTable);
        setLoading(true);
    }

    const columns: ColumnsType<IModelProductoIngresoCC> = [
        {
            title:'Id',
            dataIndex:'id'
        },
        {
            title:'Concepto',
            dataIndex:'concepto'
        },
        {
            title:'Valor',
            dataIndex:'valor',
        },
        {
            title:'Acciones',
            dataIndex:'idIngresoaCajaChica',
            render:(text: string, row: IModelProductoGastoCC,index:number)=> <Button key={row.Id} icon={<EditOutlined/>} type='ghost' onClick={(w)=>{w.stopPropagation(); editProduct(row)}}/>
        }
    ];

    const fetchListTipoIngresoCajaChica = async()=>{
        var result = ProductosService.GetListIngresoCC();

        result.then((data:any)=>{
            setLstProducto(data);
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

    const editProduct = (data:IModelProductoIngresoCC)=>{
        setProducto(data);
        setIsEdit(true);
        changeModal();
    }
    
    const newProducto = () =>{
        setProducto({} as IModelProductoIngresoCC);
        setIsEdit(false);
        changeModal();
    }

    useEffect(()=>{
        fetchListTipoIngresoCajaChica();
    },[]);

    return(
        <React.Fragment>
            <Row gutter={[16,16]} justify="end" align='middle'>
                <Col>
                    <Search type='search' placeholder='Buscar' onChange={search}></Search>
                </Col>
                <Col>
                    <Button type='primary' onClick={newProducto}>Nuevo Producto</Button>
                </Col>
            </Row>
            <Divider/>
            <Row justify='center' align='middle'>
                <Col flex='auto'>
                    <Table scroll={{x:500}} columns={columns} rowKey="id" dataSource={lstFilter.length>0 ? lstFilter : lstProducto} size="small" loading={loading} />
                </Col>
            </Row>
            <ProductoIngresoCCModal showModal={isModalVisible} formData={Producto} onChange={changeModal} isEditData={isEdit} onSave={save}/>
        </React.Fragment>
    );
}

export {ProductoIngresoCCPage};