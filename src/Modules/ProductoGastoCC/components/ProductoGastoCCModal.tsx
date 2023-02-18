
import { SaveOutlined,CloseCircleOutlined } from '@ant-design/icons';
import {Modal,Input,InputNumber,Form,Row,Divider,Col, Button} from "antd";
const spanCol:number=24;
const ProductoGastoCCModal =({showModal,formData,onChange,isEditData,onSave}: PropProductoGastoCC)=>{
    return(
        <>
            <Modal open={showModal} destroyOnClose={true} onCancel={onChange} title={isEditData ? "Editar Producto" : "Nuevo Producto"} footer={false} centered>
                    <Form layout="vertical" labelWrap initialValues={formData} onFinish={onSave}>
                        <Row gutter={[12,12]}>
                            <Col span={spanCol}>
                                <Form.Item
                                    label = "id"
                                    name = "id"
                                    hidden
                                    style={{ marginBottom: 0 }}
                                >
                                    <Input hidden/>
                                </Form.Item>
                            </Col>
                            <Col span={spanCol}>
                                <Form.Item
                                    label="Concepto"
                                    name="concepto"
                                    rules={[{required:true,message:"Ingrese el concepto"}]}
                                    style={{ marginBottom: 0 }}
                                >
                                    <Input />
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
    );
}
export {ProductoGastoCCModal};