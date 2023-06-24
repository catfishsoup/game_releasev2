import { UserAuth } from "../firebase/user_auth"
import { Outlet, useParams } from "react-router-dom";
import { Warning } from '../pages/Warning'

const ProtectedRoute = () => {
    const { user } = UserAuth();
    const { user_name } = useParams();
    if(!user) {
        return <Warning/>;
    } else {
        return <Outlet/>
    }
}

export default ProtectedRoute