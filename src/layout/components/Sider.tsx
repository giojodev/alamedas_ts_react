import { useNavigate } from "react-router-dom";
import { HomeOutlined,ContactsOutlined,RiseOutlined,FallOutlined,PieChartOutlined,FundProjectionScreenOutlined,FundViewOutlined,SettingOutlined,UserOutlined  } from "@ant-design/icons";
import { Layout,Menu } from "antd";
import type { MenuProps } from 'antd';
import logo from '../../assets/img/logo7.png';

function getItem(
        label: React.ReactNode,
        key: React.Key,
        icon?: React.ReactNode,
        children?: MenuItem[],
        type?: 'group',
    ): MenuItem {
        return {
        key,
        icon,
        children,
        label,
        type,
        } as MenuItem;
}

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuProps['items'] = [
    getItem('Inicio', 'home', <HomeOutlined />),
    getItem('Condominos', 'condominium', <ContactsOutlined />),
    getItem('Ingresos', 'ingresos', <RiseOutlined />),
    getItem('Gastos', 'gastos', <FallOutlined />),
    getItem('Gastos Caja Chica', 'gastoscajachica', <FundViewOutlined />),
    getItem('Ingresos Caja Chica', 'ingresoscajachica', <FundProjectionScreenOutlined />),
    getItem('Reportes', 'reportes', <PieChartOutlined />),
    getItem('Configuración', 'configuracion', <SettingOutlined />, [
        getItem('Ingreso / Gasto', 'g1', null, [getItem('Tipo Ingreso', 'configuracion/ingreso'), getItem('Tipo Gastos', 'configuracion/gasto'), getItem('Producto Gastos', 'configuracion/producto')], 'group'),
        getItem('Caja Chica', 'g2', null, [getItem('Tipo Ingreso', 'configuracion/cingreso'), getItem('Tipo Gastos', 'configuracion/gingreso'),getItem('Producto Ingreso', 'configuracion/pingreso'),getItem('Producto Gasto', 'configuracion/pgasto')], 'group'),
        getItem('Usuario', 'g3', null, [getItem('Aplicacion', 'configuracion/usuarioapp'), getItem('Gastos', 'configuracion/usuariogasto')], 'group'),
    ]),
];

const Sider=()=>{

    const navigate = useNavigate();

    const onClick: MenuProps['onClick'] = e => {
        navigate('/' + e.key);
    };

    return(
        <Layout.Sider
            breakpoint="lg"
            collapsedWidth="0"
        >
            <img src={logo} alt="logo" className="logo"/>
            <Menu
                theme="dark"
                onClick={onClick}
                defaultSelectedKeys={['home']}
                defaultOpenKeys={['home']}
                mode="inline"
                items={items}
            />
        </Layout.Sider>
    )
}

export {Sider};