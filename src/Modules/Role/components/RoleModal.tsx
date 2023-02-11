import {useState} from 'react';
import { SaveOutlined,CloseCircleOutlined } from '@ant-design/icons';
import {Modal,Input,Form,Row,Divider,Col, Button} from "antd";
const { TextArea } = Input;
const RoleModal =({showModal,formData,onChange,isEditData,onSave}: PropRole)=>{
    return(
        <>
            <Modal open={showModal} destroyOnClose={true} onCancel={onChange} title={isEditData ? "Editar rol" : "Nuevo rol"} footer={false} centered>
                <Form layout="vertical" labelWrap labelCol={{span:12}} initialValues={formData} onFinish={onSave}>
                    <Col>
                        <Form.Item
                            label = "id"
                            name = "idRol"
                            hidden
                        >
                            <Input hidden/>
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item
                            label="Nombre"
                            name="nombre"
                            rules={[
                                {required:true,message:"Ingrese el nombre"},
                                {min:2,message:"Ingrese minimo 2 caracteres"},
                                {max:250,message:"Ingrese maximo 250 caracteres"}
                            ]}
                        >
                                <Input />
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item
                            label="Descripcion"
                            name="descripcion"
                            rules={[
                                {required:true,message:"Ingrese el descripción"},
                                {min:2,message:"Ingrese minimo 2 caracteres"},
                                {max:250,message:"Ingrese maximo 250 caracteres"}
                            ]}
                        >
                            <TextArea rows={4} />
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

export {RoleModal};