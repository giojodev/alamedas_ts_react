import { useSelector } from "react-redux";
import {
    BrowserRouter as Router,
    Route,
    Routes as Switch
} from "react-router-dom";
import { PrivateRoutes } from "./PrivateRoute";
import { PublicRoutes } from "./PublicRoute";

const Routes=()=>{
    const isAuthorized:IModelAuthorized = useSelector((state:IModelAuthorized)=>state);

    return(
        <Router>
            <Switch>
                <Route path="*" element={!isAuthorized.auth ? <PublicRoutes/> : <PrivateRoutes/>} />
            </Switch>
        </Router>
    )
}

export {Routes};