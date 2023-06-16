
import { Link } from "react-router-dom";

export const Warning = () => {
    return(
        <>You do not have access to this page
        Return to Home or Login
        </>
    )
}

export const Empty = () => {
    return (
        <section className="empty-page">
            <h1>404</h1>
            <h2>PAGE NOT FOUND</h2>
            <p>The page you are looking for might have been removed or is temporarily unavailable.</p>
            <button><Link path="/home" class>Return to Home</Link></button>
        </section>
    )
}
