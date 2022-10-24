import {Route,Routes, Navigate } from "react-router-dom";
import { MasterLayout } from "../layout";
import { HomePage,CondominiumPage } from "../Modules";

const PrivateRoutes=()=>{
    return(
        <Routes>
            <Route path="/*" element={<MasterLayout/>}>
                <Route path="home" element={<HomePage/>}/>
                <Route path="condominium" element={<CondominiumPage/>}/>
            </Route>
            <Route path="/login" element={<Navigate to="/home"/>}/>
        </Routes>
    )
}

export {PrivateRoutes};