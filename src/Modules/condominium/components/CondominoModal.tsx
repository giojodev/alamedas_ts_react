import React, {useState } from "react";
import {Modal,Input,InputNumber,Form,Row,Divider,Col,Radio, Button} from "antd";
import { SaveOutlined,CloseCircleOutlined } from '@ant-design/icons';

const CondominoModal=({showModal,formData,onChange,isEditData,onSave}: PropCondo)=>{
    const spanCol:number=12;
    const [currentValueRadio,setcurrentValueRadio]= useState(formData.activo);
    const [currentValueid,setcurrentValueid]= useState(formData.IdCondomino);
    return (
        
        <>
        <Modal open={showModal} destroyOnClose={true} onCancel={onChange} title={isEditData ? "Editar Condomino" : "Nuevo Condomino"} footer={false} centered>
            <Row justify='center'>
                <Form layout='vertical' labelWrap  initialValues={formData} onFinish={onSave}>
                    <Row gutter={[12,12]}>
                        <Col span={spanCol}>
                            <Form.Item 
                                label="Numero Casa" 
                                name="idCondomino" 
                                rules={[{required:true,message:"Ingrese el numero de casa"}]}
                                style={{ marginBottom: 0 }}
                            >
                                <InputNumber 
                                    min={1} disabled={isEditData}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={spanCol}>
                            <Form.Item 
                                label="Dueño Casa" 
                                name="nombreCompleto"
                                rules={[{required:true,message:"Ingrese el nombre del dueño"}]}
                                style={{ marginBottom: 0 }}
                            >
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col span={spanCol}>
                            <Form.Item 
                                label="Residente" 
                                name="nombreInquilino"
                                rules={[{required:true,message:"Ingrese el nombre del inquilino"}]}
                                style={{ marginBottom: 0 }}
                            >
                                    <Input/>
                            </Form.Item>
                        </Col>
                        <Col span={spanCol}>
                            <Form.Item 
                                label="Correo" 
                                name="correo"
                                rules={[{required:true,message:"Ingrese el correo"}]}
                                style={{ marginBottom: 0 }}
                            >
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col span={spanCol}>
                            <Form.Item 
                                label="Telefono" 
                                name="telefono"
                                rules={[{required:true,message:"Ingrese un numero de telefono"}]}
                                style={{ marginBottom: 0 }}
                            >
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col span={spanCol}>
                            <Form.Item 
                                label="Activo" 
                                name="activo"
                                rules={[{required:true,message:"Seleccione el estado"}]}
                                style={{ marginBottom: 0 }}
                            >
                                <Radio.Group 
                                    buttonStyle='solid'
                                    onChange={(e) => {setcurrentValueRadio(Boolean(e.target.value)); }}
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

export {CondominoModal};