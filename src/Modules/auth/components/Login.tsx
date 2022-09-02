import { Alert,Button,Form,Input,Row,Spin,Select,Card} from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/img/logo7.png";
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
      <React.Fragment>
        <Card
          hoverable
          style={{ width: 300 }}
        >
          <Row justify="center">
            <Spin spinning={isLoading}>
              <Row justify="center" align="middle">
                <img className="logo-auth" src={logo} alt="logo" />
              </Row>
               <Form
                name="basic"
                layout="vertical"
                initialValues={{ remember: true }}
                onFinish={onLogin}
                autoComplete="on"
              >
                <Form.Item
                  label="Usuario"
                  name="username"
                  rules={[{ required: true, message: 'Debe de ingresar su usuario!' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Contraseña"
                  name="password"
                  rules={[{ required: true, message: 'Debe de ingresar la contraseña!' }]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                    Ingresar
                  </Button>
                </Form.Item>
                {alertMessage?.message && <Alert message={alertMessage?.message} type="error" showIcon />}
              </Form>
            
            </Spin>
          </Row>
        </Card>
      </React.Fragment>
    );

}
export {Login}