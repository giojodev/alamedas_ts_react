import { NavLink,useNavigate } from "react-router-dom";
import { TeamOutlined } from "@ant-design/icons";
import { Layout,Menu,Row } from "antd";
import logo from '../../images/logo.png';
import { SiderCSS } from "../../css/siteCss";


const {Item}=Menu;
const ItemMenu=(data:ImodelItemMenu)=>{
    return(
        <Item key={data.key} title={data.icon} style={{color:SiderCSS.color}}>
            {data.path ? <NavLink to={data.path} style={{color:SiderCSS.color}}>{data.title}</NavLink>:data.title}
        </Item>
    );
}
const Sider=()=>{
    const menuItems: ImodelItemMenu[]=[
        {
            icon:<TeamOutlined/>,
            title:"Inicio",
            path:"/home",
            key:"home"
        },
        {
            icon:<TeamOutlined/>,
            title:"Condominos",
            path:"/condominos",
            key:"condominos"
        },
        {
            icon:<TeamOutlined/>,
            title:"Ingresos",
            path:"/ingresos",
            key:"ingresos"
        },
        {
            icon:<TeamOutlined/>,
            title:"Gastos",
            path:"/gastos",
            key:"gastos"
        }
    ];

    return(
        <Layout.Sider style={{height:"100vh",background:SiderCSS.background,boxShadow:""}} collapsedWidth={50} breakpoint="md" color={SiderCSS.background}>
            <Row>
                <NavLink to="">
                    <img src={logo} alt="logo" className="logo-layout"/>
                </NavLink>
            </Row>
            <Menu mode="inline" style={{background:SiderCSS.background}}>
                {menuItems.map(ItemMenu)}
            </Menu>
        </Layout.Sider>
    )
    
}

export {Sider};