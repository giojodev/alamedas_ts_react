import React,{useState} from 'react';
import { SaveOutlined,CloseCircleOutlined } from '@ant-design/icons';
import {Modal,Input,InputNumber,Form,Row,Divider,Col,Radio, Button} from "antd";

const TipoGastoCajaChicaModal =({showModal,formData,onChange,isEditData,onSave}: PropTipoGastoCajaChica)=>{
    const spanCol : number = 12; 
    const [currentValueRadio,setCurrentValueRadio] = useState(formData.activo);
    return(
        <>
        <Modal visible={showModal} destroyOnClose={true} onCancel={onChange} title={isEditData ? "Editar Tipo Gasto Caja Chica" : "Nuevo Tipo Gasto Caja Chica"} footer={false} centered>
            <Row justify='center'>
                <Form layout='vertical' labelWrap labelCol={{span:12}} initialValues={formData} onFinish={onSave}>
                    <Row gutter={[16,16]}>
                        <Col span = {spanCol}>
                            <Form.Item
                            label="Id Gasto Caja Chica"
                            name="idGastoCajaChica"
                            rules={[{required:true,message:"Ingrese un numero de id"}]}
                            >
                                <InputNumber min = {1} disabled = {isEditData} />
                            </Form.Item>
                        </Col>
                        <Col span={spanCol}>
                            <Form.Item
                              label= "Nombre de Tipo de Gasto Caja Chica"
                              name="nombreGastoCajachica"
                              rules={[{required:true,message:"Ingrese el nombre del gasto"}]}
                            >
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col span={spanCol}>
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
                    </Row>
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
            </Row>
        </Modal>
        </>
    );
}

export {TipoGastoCajaChicaModal};