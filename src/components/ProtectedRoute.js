import { UserAuth } from "../firebase/user_auth"
import { Outlet } from "react-router-dom";
import { Warning } from '../pages/Warning'

const ProtectedRoute = () => {
    const { user } = UserAuth();
    if(!user ) {
        return <Warning/>;
    } else {
        return <Outlet/>
    }
}

export default ProtectedRoute