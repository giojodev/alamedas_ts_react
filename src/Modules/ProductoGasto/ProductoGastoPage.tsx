import React,{useEffect,useState} from 'react';
import { Button,Col,Divider,Row,Table,Modal,Input,Tag } from 'antd';
import { ProductosService } from '../../services';
import { EditOutlined,LoadingOutlined,SaveOutlined,CloseCircleOutlined } from "@ant-design/icons";
import { ProductoGastoModal } from './components';
import { ColumnsType } from 'antd/es/table';
const Search = Input.Search;
const ProductoGastoPage =() =>{

    const [lstProducto, setLstProducto] = useState([] as Array<IModelProductoGasto>);
    const [lstFilter,setLstFilter]= useState([] as Array<IModelProductoGasto>);
    const [loading,setLoading] = useState(false);
    const [productoGasto,setProductoGasto] = useState({} as IModelProductoGasto);
    const [isModalVisible,setIsModalVisible] = useState(false);
    const [isEdit,setIsEdit] = useState(false);
    
    const save=(form:IModelProductoGasto)=>{
        const modal= Modal.success({
            icon:<LoadingOutlined/>,
            title:"Guardando...",
            centered:true,
            content:"Se esta guardando el producto",
            okButtonProps:{disabled:true}
        });

        var result= isEdit? ProductosService.EditProductoGasto(form) : ProductosService.NewProductoGasto(form);

        result.then((data:any)=>{
            modal.update({
                icon:<SaveOutlined/>,
                title:"Guardado",
                content:data,
                okButtonProps:{disabled:true},
                onOk:changeModal
            });
            fetchListProductoGasto();
        }).catch((error:any)=>{
            modal.update({
                icon:<CloseCircleOutlined/>,
                type:"error",
                title:"Error",
                okButtonProps:{disabled:false},
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

    const columns: ColumnsType<IModelProductoGasto> = [
        {
            title:'IdEntity',
            dataIndex:'idEntity'
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
            dataIndex:'id',
            render:(text: string, row: IModelProductoGasto,index:number)=> <Button key={row.IdEntity} icon={<EditOutlined/>} type='ghost' onClick={(w)=>{w.stopPropagation(); editProduct(row)}}/>
        }
    ];

    const fetchListProductoGasto = async()=>{
        var result = ProductosService.GetListProductoGasto(0);

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

    const editProduct = (data:IModelProductoGasto)=>{
        setProductoGasto(data);
        setIsEdit(true);
        changeModal();
    }
    
    const newProducto = () =>{
        setProductoGasto({} as IModelProductoGasto);
        setIsEdit(false);
        changeModal();
    }

    useEffect(()=>{
        fetchListProductoGasto();
    },[]);

    return (
        <React.Fragment>
            <Row gutter={[16,16]} justify="end" align='middle'>
                <Col>
                    <Search type="search" placeholder='Buscar' onChange={search}></Search>
                </Col>
                <Col>
                <Button type='primary' onClick={newProducto}>Nuevo Producto</Button>
                </Col>
            </Row>
            <Divider/>
            <Row justify='end' align='middle'>
                <Col flex='auto'>
                    <Table scroll={{x:500}} columns={columns} rowKey='IdEntity' dataSource={lstFilter.length>0 ? lstFilter : lstProducto} size="small" loading={loading}/>
                </Col>
            </Row>
            <ProductoGastoModal showModal={isModalVisible} formData={productoGasto} onChange={changeModal} isEditData={isEdit} onSave={save}/>
        </React.Fragment>

    );
}

export {ProductoGastoPage};