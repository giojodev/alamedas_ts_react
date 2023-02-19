import {Route,Routes, Navigate } from "react-router-dom";
import { MasterLayout } from "../layout";
import { HomePage,CondominiumPage,TipoIngresoCCPage,TipoIngresoPage,TipoGastoCCPage,TipoGastoPage,ProductoGastoCCPage,ProductoIngresoCCPage,UserAppPage,RolePage,ProductoGastoPage,IngresoCCPage,GastoCCPage } from "../Modules";

const PrivateRoutes=()=>{
    return(
        <Routes>
            <Route path="/*" element={<MasterLayout/>}>
                <Route path="inicio" element={<HomePage/>}/>
                <Route path="condominio" element={<CondominiumPage/>}/>
                <Route path="ingresoscajachica" element={<IngresoCCPage/>}/>
                <Route path="gastoscajachica" element={<GastoCCPage/>}/>
                <Route path="configuracion/cingreso" element={<TipoIngresoCCPage/>}/>
                <Route path="configuracion/gingreso" element={<TipoGastoCCPage/>}/>
                <Route path="configuracion/ingreso" element={<TipoIngresoPage/>}/>
                <Route path="configuracion/gasto" element={<TipoGastoPage/>}/>
                <Route path="configuracion/pgasto" element={<ProductoGastoCCPage/>}/>
                <Route path="configuracion/pingreso" element={<ProductoIngresoCCPage/>}/>
                <Route path="configuracion/usuarioapp" element={<UserAppPage/>}/>
                <Route path="configuracion/rol" element={<RolePage/>}/>
                <Route path="configuracion/prodgasto" element={<ProductoGastoPage/>}/>
            </Route>
            <Route path="/login" element={<Navigate to="/home"/>}/>
        </Routes>
    )
}

export {PrivateRoutes};