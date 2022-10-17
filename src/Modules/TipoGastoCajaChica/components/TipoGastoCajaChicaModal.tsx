import * as React from 'react';
import { SaveOutlined,CloseCircleOutlined } from '@ant-design/icons';
import {Modal,Input,InputNumber,Form,Row,Divider,Col,Radio, Button} from "antd";

const TipoGastoCajaChicaModal =({showModal,formData,onChange,isEditData,onSave}: PropTipoGastoCajaChica)=>{
    return(
        <>
        <Modal visible={showModal} destroyOnClose={true} onCancel={onChange} title={isEditData ? "Editar Tipo Gasto Caja Chica" : "Nuevo Tipo Gasto Caja Chica"} footer={false} centered>
            <Row justify='center'>
                <Form layout='vertical' labelWrap labelCol={{span:12}} initialValues={formData} onFinish={onSave}>
                    <Row gutter={[16,16]}>

                    </Row>
                </Form>
            </Row>
        </Modal>
        </>
    );
}

export {TipoGastoCajaChicaModal};