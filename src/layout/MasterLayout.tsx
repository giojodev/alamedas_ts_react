import {Layout} from "antd";
import { Outlet } from "react-router-dom";
import {Header,Sider,Footer} from './components';

const {Content}=Layout;

const MasterLayout=()=>{
    return(
        <Layout  style={{height:"100vh",minHeight:"460px"}}>
            <Sider/>
            <Layout>
                <Header/>
                <Content style={{ margin: '24px 16px 0' }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        <Outlet/>
                    </div>
                </Content>
                <Footer/>
            </Layout>
        </Layout>
    )
}

export {MasterLayout};