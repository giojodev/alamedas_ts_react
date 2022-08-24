import {Layout} from 'antd';
import { FooterCSS } from '../../css/siteCss'; 

const Footer=()=>{
    return(
        <Layout.Footer style={{textAlign:'center',overflowY:'hidden',background:FooterCSS.background,color:FooterCSS.color}}>
            Alamedas V0.0.1{new Date().getFullYear()}
        </Layout.Footer>
    )
}
export {Footer};