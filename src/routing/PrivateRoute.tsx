import {Route,Routes, Navigate } from "react-router-dom";
import { MasterLayout } from "../layout";
import { HomePage,CondominiumPage,TipoIngresoCajaChicaPage,TipoIngresoPage,TipoGastoCajaChicaPage,TipoGastoPage } from "../Modules";

const PrivateRoutes=()=>{
    return(
        <Routes>
            <Route path="/*" element={<MasterLayout/>}>
                <Route path="home" element={<HomePage/>}/>
                <Route path="condominium" element={<CondominiumPage/>}/>
                <Route path="configuracion/cingreso" element={<TipoIngresoCajaChicaPage/>}/>
                <Route path="configuracion/gingreso" element={<TipoGastoCajaChicaPage/>}/>
                <Route path="configuracion/ingreso" element={<TipoIngresoPage/>}/>
                <Route path="configuracion/gasto" element={<TipoGastoPage/>}/>
            </Route>
            <Route path="/login" element={<Navigate to="/home"/>}/>
        </Routes>
    )
}

export {PrivateRoutes};