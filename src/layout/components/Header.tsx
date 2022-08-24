import {Avatar,Button,Col,Image,Layout,message,Modal,Popover,Row,Typography} from "antd";
import { NavLink,useNavigate } from "react-router-dom";
import { PictureOutlined,UserOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { CloseSession } from "../../actions";
import {ConfigProvider} from "antd";

import { Config } from "@testing-library/react";
import { HeaderCSS } from "../../css/siteCss";
const {Text} =Typography;
const Header=()=>{
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const logout=()=>{
        console.log("logout");
        dispatch(CloseSession());
        navigate("/logout");
    }
    const perfilPopover = (
      <>
        <NavLink to="profile">
          <Button className="block" icon={<UserOutlined />}>
            Perfil
          </Button>
        </NavLink>
        <Button type="text" className="block" onClick={logout}>
          Salir
        </Button>
      </>
    );

    return(
        <Layout.Header style={{background:HeaderCSS.background,color:HeaderCSS.color}}>
            <Row justify="center" align="middle" gutter={[10,10]}>
                <Col flex={100}></Col>
                <Col className="hidden-sm">
                    <Text style={{color:HeaderCSS.color}}>
                        Bienvenido, {" "}
                        <Text style={{color:HeaderCSS.color}} strong>
                            usuario
                        </Text>
                        !
                    </Text>
                </Col>
                <Col className="col-profile-picture">
                    <Popover placement="bottom" content={perfilPopover} trigger="click">
                        <UserOutlined/>
                    </Popover>
                </Col>
            </Row>
        </Layout.Header>
    );
}

export {Header};