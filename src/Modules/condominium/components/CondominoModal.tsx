import React, {useState } from "react";
import {Modal,Input,InputNumber,Form,Row,Divider,Col,Radio, Button} from "antd";
import { SaveOutlined,CloseCircleOutlined } from '@ant-design/icons';

const CondominoModal=({showModal,formData,onChange,isEditData,onSave}: PropCondo)=>{
    const spanCol:number=12;
    const [currentValueRadio,setcurrentValueRadio]= useState(formData.activo);

    const onChangec = (value: number) => {
        console.log('changed', value);
    };


    return (
        
        <>
        <Modal visible={showModal} destroyOnClose={true} onCancel={onChange} title={isEditData ? "Editar Condomino" : "Nuevo Condomino"} footer={false} centered>
            <Row justify='center'>
                <Form layout='vertical' labelWrap labelCol={{span: 12}} initialValues={formData} onFinish={onSave}>
                    <Row gutter={[16,16]}>
                        <Col span={spanCol}>
                            <Form.Item 
                                label="Numero Casa" 
                                name="idCondomino" 
                            >
                                <InputNumber min={1} defaultValue={0} onChange={onChangec} />
                            </Form.Item>
                        </Col>
                        <Col span={spanCol}>
                            <Form.Item 
                                label="Dueño Casa" 
                                name="nombreCompleto"
                                rules={[{required:true,message:"Ingrese el nombre del dueño"}]}
                            >
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col span={spanCol}>
                            <Form.Item 
                                label="Residente" 
                                name="nombreInquilino"
                                rules={[{required:true,message:"Ingrese el nombre del inquilino"}]}
                            >
                                    <Input/>
                            </Form.Item>
                        </Col>
                        <Col span={spanCol}>
                            <Form.Item 
                                label="Correo" 
                                name="correo"
                                rules={[{required:true,message:"Ingrese el correo"}]}
                            >
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col span={spanCol}>
                            <Form.Item 
                                label="Telefono" 
                                name="telefono"
                                rules={[{required:true,message:"Ingrese un numero de telefono"}]}
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
                                    onChange={(e) => {setcurrentValueRadio(e.target.value); }}
                                    value={currentValueRadio}
                                >
                                    <Radio.Button value="true">Activo</Radio.Button>
                                    <Radio.Button value="false">Inactivo</Radio.Button>
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