import { useNavigate,Route,Routes, Navigate } from "react-router-dom";
import { MasterLayout } from "../layout";
import { HomePage } from "../Modules";

const PrivateRoutes=()=>{
    return(
        <Routes>
            <Route path="/*" element={<MasterLayout/>}>
                <Route path="home" element={<HomePage/>}/>
            </Route>
            <Route path="/login" element={<Navigate to="/home"/>}/>
        </Routes>
    )
}

export {PrivateRoutes};