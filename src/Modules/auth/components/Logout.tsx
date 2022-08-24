import { SafetyCertificateFilled } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { Button,Result } from "antd";
import { LogoutCSS } from "../../../css/siteCss";

const Logout=()=>{
    return (
        <div className="logout-card">
            <Result
                status="success"
                icon={<SafetyCertificateFilled/>}
                title="Hasta pronto!"
                subTitle="Tu sesion ha sido cerrada"
                extra={
                    <NavLink to="/login">
                        <Button type="primary">Iniciar sesion nuevamente</Button>
                    </NavLink>
                }
            />
        </div>
    );
}

export {Logout};