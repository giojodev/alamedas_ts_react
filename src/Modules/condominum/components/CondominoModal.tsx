import {useState,useEffect} from 'react';
import {Modal,Input,Form,Row,Divider,Col,Radio, Button} from "antd";
import { SaveOutlined,CloseCircleOutlined,LoadingOutlined } from '@ant-design/icons';
import {CondominoService} from "../../../services/condomino.services";

const CondominoModal=({showModal,formData,onChange,isEditData,onSave}: PropCondo)=>{
    const spanCol:number=12;
    
    return (
        <>
        <Modal visible={showModal} destroyOnClose={true} onCancel={onChange} title={isEditData ? "Editar Condomino" : "Nuevo Condomino"} footer={false} centered>
            <Row justify='center'>
                <Form layout='horizontal' labelWrap labelCol={{span: 8}} initialValues={formData} onFinish={onSave}>
                    <Row gutter={[16,16]}>
                        <Col span={spanCol}>
                            <Form.Item label="Numero Casa" name="ID_CONDOMINO" required={true}
                            rules={[{required:true,message:"Ingrese el numero de casa"}]}>
                                <Input disabled={isEditData}></Input>
                            </Form.Item>
                        </Col>
                        <Col span={spanCol}>
                            <Form.Item label="Dueño Casa" name="NOMBRE_INQUILINO" required={true}
                            rules={[{required:true,message:"Ingrese el nombre del dueño"}]}>
                                
                            </Form.Item>
                        </Col>
                        <Col span={spanCol}>
                            <Form.Item label="Residente" name="NOMBRE_INQUILINO" required={true}
                            rules={[{required:true,message:"Ingrese el nombre del inquilino"}]}>
                                
                            </Form.Item>
                        </Col>
                        <Col span={spanCol}>
                            <Form.Item label="Correo" name="CORREO" required={true}
                            rules={[{required:true,message:"Ingrese el correo"}]}>
                                
                            </Form.Item>
                        </Col>
                        <Col span={spanCol}>
                            <Form.Item label="Telefono" name="TELEFONO" required={true}
                            rules={[{required:true,message:"Ingrese un numero de telefono"}]}>
                                
                            </Form.Item>
                        </Col>
                        <Col span={spanCol}>
                            <Form.Item label="Activo" name="NOMBRE_INQUILINO" required={true}
                            rules={[{required:true,message:"Ingrese el nombre del inquilino"}]}>
                                <Radio.Group buttonStyle='solid'>
                                    <Radio.Button value="true">Activo</Radio.Button>
                                    <Radio.Button value="false">Activo</Radio.Button>
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

export {CondominoModal};