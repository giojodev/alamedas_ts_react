import React,{useEffect,useState} from 'react';
import { Button,Col,Divider,Row,Table,Modal,Input,Tag } from 'antd';
import { Ingresocajachica } from '../../services';
import { EditOutlined,LoadingOutlined,SaveOutlined,CloseCircleOutlined } from "@ant-design/icons";
import { ColumnsType } from 'antd/es/table';
import { IngresoCCModal } from './components';
const Search = Input.Search;

const IngresoCCPage = ()=>{

    const [loading,setLoading] = useState(false);
    const [lstIngreso,setlstIngreso] = useState([] as Array<IModelIngresocc>);
    const [lstFilter,setLstFilter] = useState([] as Array<IModelIngresocc>);

    const fetchListIngresoCajaChica = async()=>{
        var result = Ingresocajachica.GetListIngresoCC();

        result.then((data:any)=>{
            setlstIngreso(data);
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

    const columns: ColumnsType<IModelIngresocc> = [
        {
            title:'Consecutivo',
            dataIndex:'consecutivo'
        },
        {
            title:'Mes',
            dataIndex:'mes'
        },
        {
            title:'Año',
            dataIndex:'anio'
        },
        {
            title:'Tipo Ingreso',
            dataIndex:'nombreIngresoCajaChica'
        },
        {
            title:'Concepto',
            dataIndex:'concepto'
        },
        {
            title:'Total',
            dataIndex:'total',
        },
        {
            title:'Estado',
            dataIndex:'anulado',
            render:(text) => <Tag color={text==true?"volcano":"green"} >{text==true?String("Anulado"):String("Activo")}</Tag> 
        },
        {
            title:'Acciones',
            dataIndex:'consecutivo',
            render:(text: string, row: IModelIngresocc,index:number)=> <Button key={row.consecutivo} icon={<EditOutlined/>} type='ghost' onClick={(w)=>{}}/>
        }
    ];

    useEffect(()=>{
        fetchListIngresoCajaChica();
    },[]);

    return(
        <React.Fragment>
            <Row gutter={[16,16]} justify="end" align='middle'>
                <Col>
                    <Search type='search' placeholder='Buscar'></Search>
                </Col>
                <Col>
                    <Button type='primary'>Nuevo Producto</Button>
                </Col>
            </Row>
            <Divider/>
            <Row justify='center' align='middle'>
                <Col flex='auto'>
                    <Table scroll={{x:500}} columns={columns} rowKey="CONSECUTIVO" dataSource={lstFilter.length>0 ? lstFilter :lstIngreso} size="small" loading={loading} />
                </Col>
            </Row>
            <IngresoCCModal/>
        </React.Fragment>
    );
}

export {IngresoCCPage};