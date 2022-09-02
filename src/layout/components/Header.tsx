import {Button,Col,Layout,Popover,Row,Typography} from "antd";
import { NavLink,useNavigate } from "react-router-dom";
import {UserOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { CloseSession } from "../../actions";
import { HeaderCSS } from "../../assets/css/siteCss";
import { SessionData } from "../../helpers";

const {Text} =Typography;
const Header=()=>{
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const logout=()=>{
        dispatch(CloseSession());
        navigate("/logout");
    }
    const perfilPopover = (
      <>
        <NavLink to="profile">
          <Button className="block" icon={<UserOutlined/>}>
            Perfil
          </Button>
        </NavLink>
        <Button type="text" className="block" onClick={logout}>
          Salir
        </Button>
      </>
    );

    const sessionData = SessionData() as IModelLoginRequest;
    return(
        <Layout.Header className="site-layout-sub-header-background" style={{ padding: 0 }} >
          <Row justify="center" align="middle" gutter={[10,10]} style={{marginRight:0}}>
                <Col flex={100}></Col>
                <Col className="hidden-sm">
                    <Text style={{color:HeaderCSS.color}}>
                        Bienvenido, {" "}
                        <Text style={{color:HeaderCSS.color}} strong>
                            {sessionData.username}
                        </Text>
                    </Text>
                </Col>
                <Col className="col-profile-picture">
                    <Popover placement="bottom" content={perfilPopover} trigger="click">
                        <UserOutlined style={{ color:HeaderCSS.color }}/>
                    </Popover>
                </Col>
            </Row>
        </Layout.Header>
    );
}

export {Header};