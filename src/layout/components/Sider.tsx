import { useNavigate } from "react-router-dom";
import { HomeOutlined,ContactsOutlined,RiseOutlined,FallOutlined,PieChartOutlined,FundProjectionScreenOutlined,FundViewOutlined,SettingOutlined } from "@ant-design/icons";
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
        getItem('Tipos', 'g1', null, [getItem('Ingreso', 'ingreso'), getItem('Gastos', 'gasto')], 'group'),
        getItem('Caja Chica', 'g2', null, [getItem('Tipo Ingreso', 'cingreso'), getItem('Tipo Gastos', 'gingreso')], 'group'),
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
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['inicio']}
                mode="inline"
                items={items}
            />
        </Layout.Sider>
    )
}

export {Sider};