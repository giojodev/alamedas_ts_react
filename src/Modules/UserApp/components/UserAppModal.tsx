import React,{useState} from 'react';
import { SaveOutlined,CloseCircleOutlined } from '@ant-design/icons';
import {Modal,Input,InputNumber,Form,Row,Divider,Col,Radio, Button} from "antd";

const UserAppModal =({showModal,formData,onChange,isEditData,onSave}: PropUserApp)=>{
    const spanCol : number = 12; 
    const [currentValueRadio,setCurrentValueRadio] = useState(formData.Activo);
    return(
        <>
        <Modal visible={showModal} destroyOnClose={true} onCancel={onChange} title={isEditData ? "Editar Usuario" : "Nuevo Usuario"} footer={false} centered>
            <Form layout="vertical" labelWrap labelCol={{span:12}} initialValues={formData} onFinish={onSave}>
                <Col>
                    <Form.Item
                        label="idUsuario"
                        name="idUsuario"
                        hidden
                    >
                        <InputNumber hidden/>
                    </Form.Item>
                </Col>
                <Col>
                    <Form.Item
                        label= "Usuario"
                        name="usuario1"
                        rules={[{required:true,message:"Ingrese el Usuario"}]}
                    >
                        <Input/>
                    </Form.Item>
                </Col>
                <Col>
                    <Form.Item
                        label= "Nombre"
                        name="nombre"
                        rules={[{required:true,message:"Ingrese el Nombre"}]}
                    >
                        <Input/>
                    </Form.Item>
                </Col>
                <Col>
                    <Form.Item
                        label= "Correo"
                        name="correo"
                        rules={[{required:true,message:"Ingrese el Correo"}]}
                    >
                        <Input/>
                    </Form.Item>
                </Col>
                <Col>
                    <Form.Item
                        label= "Contraseña"
                        name="contrasena"
                        rules={[{required:true,message:"Ingrese la contraseña"}]}
                        hidden={(isEditData?true:false)}
                    >
                        <Input.Password hidden={(isEditData?true:false)}/>
                    </Form.Item>
                </Col>
                <Col>
                <Row gutter={[16,16]}>
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
                </Row>
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

export {UserAppModal};