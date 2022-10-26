import { useState } from "react";
import { SaveOutlined,CloseCircleOutlined } from '@ant-design/icons';
import {Modal,Input,InputNumber,Form,Row,Divider,Col,Radio, Button} from "antd";

const TipoIngresoCajaChicaModal =({showModal,formData,onChange,isEditData,onSave}: PropTipoIngresoCajaChica)=>{
    const spanCol : number = 12;
    const [currentValueRadio,setCurrentValueRadio] = useState(formData.activo);

    return (
        <>
            <Modal visible={showModal} destroyOnClose={true} onCancel={onChange} title={isEditData ? "Editar Tipo Ingreso Caja Chica" : "Nuevo Tipo Ingreso Caja Chica"} footer={false} centered>
                <Row justify="center">
                    <Form layout="vertical" labelWrap labelCol={{span:12}} initialValues={formData} onFinish={onSave}>
                        <Row gutter={[16,16]}>
                            <Col span={spanCol}>
                                <Form.Item
                                    label="Id Ingreso Caja Chica"
                                    name="idIngresoaCajaChica"
                                    rules={[{required:true,message:"Ingrese un numero de id"}]}
                                >
                                    <Input/>
                                </Form.Item>
                            </Col>
                            <Col span={spanCol}>
                                <Form.Item
                                label="Nombre de Tipo de Ingreso Caja Chica"
                                name="nombreIngresoCajaChica"
                                rules={[{required:true,message:"Ingrese el nombre del ingreso"}]}
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
                        <Row justify="space-around">
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
export {TipoIngresoCajaChicaModal};