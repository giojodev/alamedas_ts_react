import React,{useEffect,useState} from 'react';
import { Button,Col,Divider,Row,Table,Modal,Input,Tag } from 'antd';
import { ProductosService } from '../../services';
import { EditOutlined,LoadingOutlined,SaveOutlined,CloseCircleOutlined } from "@ant-design/icons";
import { ProductoGastoCCModal } from './components';
import { ColumnsType } from 'antd/es/table';
const Search = Input.Search;

const  ProductoGastoCCPage = ()=> {

    const [lstProducto, setLstProducto] = useState([] as Array<IModelProductoGastoCC>);
    const [lstFilter,setLstFilter] = useState([] as Array<IModelProductoGastoCC>);
    const [loading,setLoading] = useState(false);
    const [Producto,setProducto] = useState({} as IModelProductoGastoCC);
    const [isModalVisible,setIsModalVisible] = useState(false);
    const [isEdit,setIsEdit] = useState(false);

    const save = (form:IModelProductoGastoCC)=>{
        const modal = Modal.success({
            icon:<LoadingOutlined/>,
            title:"Guardando...",
            centered:true,
            content:"Se esta guardando el producto",
            okButtonProps:{ disabled:true }
        });

        var result=isEdit? ProductosService.EditGastoCC(form) : ProductosService.NewGastoCC(form);

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

    const columns: ColumnsType<IModelProductoGastoCC> = [
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
            dataIndex:'Id',
            render:(text: string, row: IModelProductoGastoCC,index:number)=> <Button key={row.Id} icon={<EditOutlined/>} type='ghost' onClick={(w)=>{w.stopPropagation(); editProduct(row)}}/>
        }
    ];

    const fetchListTipoIngresoCajaChica = async()=>{
        var result = ProductosService.GetListGastoCC();

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

    const editProduct = (data:IModelProductoGastoCC)=>{
        setProducto(data);
        setIsEdit(true);
        changeModal();
    }
    
    const newProducto = () =>{
        setProducto({} as IModelProductoGastoCC);
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
            <ProductoGastoCCModal showModal={isModalVisible} formData={Producto} onChange={changeModal} isEditData={isEdit} onSave={save}/>
        </React.Fragment>
    );
}

export {ProductoGastoCCPage};