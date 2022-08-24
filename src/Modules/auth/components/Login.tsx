import { Alert,Button,Divider,Form,Input,Row,Spin,Typography,Select } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../../../images/logo1.png";
import {AccountService} from "../../../services/index";
import { InitSession } from "../../../actions";
const{Option} = Select;

const Login = () => {
    const[isLoading,setIsLoading]=useState(false);
    const [alertMessage,setAlertMessage]=useState<IModelAlert | undefined>(undefined);
    
    const navigate=useNavigate();
    const dispath=useDispatch();
    
    const onLogin=async(data: IModelLogin)=>{
        setIsLoading(true);
        const result=await AccountService.Authenticate(data);
        setIsLoading(false);
        if(result.authenticate)
        {
            dispath(InitSession(result));
            navigate("/home");
        }else{
            setAlertMessage({message:result.message as string,type:"error"});
        }
    }

    return (
      <>
        <Row justify="center" align="middle">
          <img className="logo-auth" src={logo} alt="logo" />
        </Row>
        <div className="login-container">
          <Row justify="center">
            <Typography.Title level={2}>
              Alamedas de las Colinas
            </Typography.Title>
          </Row>
          <Spin spinning={isLoading}>
            <Form labelCol={{ span: 8 }} onFinish={onLogin}>
              <Typography.Title level={4}>Usuario</Typography.Title>
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Debe de ingresar su usuario" }
                ]}
              >
                <Input placeholder="Usuario" name="" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Debe de ingresar la contraseña" }
                ]}
              >
                <Input placeholder="*****" name="" />
              </Form.Item>
              {alertMessage?.message && <Alert message={alertMessage?.message} type="error" />}
              <Divider/>
                <Row justify="center">
                  <Button type="primary" htmlType="submit">
                    Ingresar
                  </Button>
                </Row>
              
            </Form>
          </Spin>
        </div>
      </>
    );

}
export {Login}