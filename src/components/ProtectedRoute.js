import { UserAuth } from "../firebase/user_auth"
import { Outlet, useParams } from "react-router-dom";
import { Warning } from '../pages/Warning'
import { auth } from "../firebase/firebase";

const ProtectedRoute = () => {
    const { user } = UserAuth();
    const { user_name } = useParams();
    if(!user || user_name !== auth.currentUser.displayName) {
        return <Warning/>;
    } else {
        return <Outlet/>
    }
}

export default ProtectedRoute