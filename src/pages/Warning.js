
import { Link } from "react-router-dom";

export const Warning = () => {
    return(
        <section className="unauthorized">
        <h1>403</h1>
        <h2>You do not have access to this page</h2>
        </section>
    )
}

export const Empty = () => {
    return (
        <section className="empty-page">
            <h1>404</h1>
            <h2>PAGE NOT FOUND</h2>
            <p>The page you are looking for might have been removed or is temporarily unavailable.</p>
            <button><Link path="/home">Return to Home</Link></button>
        </section>
    )
}
