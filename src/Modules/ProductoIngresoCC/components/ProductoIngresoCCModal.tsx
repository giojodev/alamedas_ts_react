import {useState} from 'react';
import { SaveOutlined,CloseCircleOutlined } from '@ant-design/icons';
import {Modal,Input,InputNumber,Form,Row,Divider,Col, Button} from "antd";

const ProductoIngresoCCModal =({showModal,formData,onChange,isEditData,onSave}: PropProductoIngresoCC)=>{
    return(
        <>
            <Modal visible={showModal} destroyOnClose={true} onCancel={onChange} title={isEditData ? "Editar Producto" : "Nuevo Producto"} footer={false} centered>
                <Form layout="vertical" labelWrap labelCol={{span:12}} initialValues={formData} onFinish={onSave}>
                    <Col>
                        <Form.Item
                            label = "id"
                            name = "id"
                            hidden
                        >
                            <Input hidden/>
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item
                            label="Concepto"
                            name="concepto"
                            rules={[{required:true,message:"Ingrese el concepto"}]}
                        >
                                <Input />
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item
                            label="Valor"
                            name="valor"
                            rules={[{required:true,message:"Ingrese el valor"}]}
                        >
                                <InputNumber min={1} />
                        </Form.Item>
                    </Col>
                    <Divider/>
                    <Row justify="space-around">
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

export {ProductoIngresoCCModal};