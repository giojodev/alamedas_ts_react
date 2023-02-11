import {useState} from 'react'
import { SaveOutlined,CloseCircleOutlined } from '@ant-design/icons';
import {Modal,Input,InputNumber,Form,Row,Divider,Col, Button} from "antd";

const ProductoGastoModal=({showModal,formData,onChange,isEditData,onSave}:PropProdGasto)=>{
    const spanCol:number=24;
    return (
        <>
            <Modal open={showModal} destroyOnClose={true} onCancel={onChange} title={isEditData ? "Editar Producto Gasto": "Nuevo Producto Gasto"} footer={false} centered>   
                <Form layout='vertical' labelWrap labelCol={{span:24}} initialValues={formData} onFinish={onSave}>
                    <Row gutter={[24,24]}>
                        <Col span={spanCol}>
                            <Form.Item
                                label="IdEntity"
                                name="IdEntity"
                                hidden
                                style={{ marginBottom: 0 }}
                            >
                                <Input hidden/>
                            </Form.Item>
                        </Col>
                        <Col span={spanCol}>
                            <Form.Item
                                label="Concepto"
                                name="Concepto"
                                rules={[{required:true,message:"Ingrese el concepto"}]}
                                style={{ marginBottom: 0 }}
                            >
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col span={spanCol}>
                            <Form.Item
                                label="Valor"
                                name="valor"
                                rules={[{required:true,message:"Ingrese el valor"}]}
                                style={{ marginBottom: 0 }}
                            >
                                <InputNumber min={1} />
                            </Form.Item>
                        </Col>
                    </Row>
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
    )
}



export {ProductoGastoModal};