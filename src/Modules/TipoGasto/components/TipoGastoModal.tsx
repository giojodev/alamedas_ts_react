import {useState} from 'react';
import { SaveOutlined,CloseCircleOutlined } from '@ant-design/icons';
import {Modal,Input,InputNumber,Form,Row,Divider,Col,Radio, Button} from "antd";

const TipoGastoModal =({showModal,formData,onChange,isEditData,onSave}: PropTipoGasto)=>{
    const spanCol : number = 12; 
    const [currentValueRadio,setCurrentValueRadio] = useState(formData.activo);

    return(
        <>
        <Modal visible={showModal} destroyOnClose={true} onCancel={onChange} title={isEditData ? "Editar Tipo Gasto" : "Nuevo Tipo Gasto" } footer={false} centered>
            <Form layout='vertical' labelWrap labelCol={{span:12}} initialValues={formData} onFinish={onSave}>
                    <Col>
                        <Form.Item
                            label = "Id Gasto"
                            name = "idGasto"
                            hidden
                        >
                            <Input hidden/>
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item
                            label="Nombre"
                            name="nombreGasto"
                            rules={[
                                {required:true,message:"Ingrese el gasto"},
                                {min:2,message:"Ingrese minimo 2 caracteres"}
                            ]}
                        >
                                <Input />
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item
                            label="Activo"
                            name="activo"
                            rules={[{required:true,message:"Seleccione el estado"}]}
                            >
                            <Radio.Group
                                buttonStyle='solid'
                                onChange={(e)=>{setCurrentValueRadio(Boolean(e.target.value));}}
                                value={currentValueRadio}
                            >
                                <Radio.Button value={true}>Activo</Radio.Button>
                                <Radio.Button value={false}>Inactivo</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                    <Divider/>
                    <Row justify='space-around'>
                        <Button type='default' onClick={onChange} icon={<CloseCircleOutlined/>}>
                            Cerrar
                        </Button>
                        <Button type='primary' htmlType='submit' icon={<SaveOutlined/>}>
                            Guardar
                        </Button>
                    </Row>
            </Form>
        </Modal> 
        </>
    );
}   

export {TipoGastoModal};