import {Link} from "react-router-dom";
import {AiFillHome} from "react-icons/ai";

const ErrorRoute = () => {

    return (
        <div className="error">

            <h1>Uh oh! We've got a problem!</h1>
            <p>The page not found!</p>
            <div className="error-nav">
                <Link to="/react-budget-app/">
                    <span>Go Home</span>
                    <AiFillHome className="error-home-logo"/>
                </Link>
            </div>
        </div>
    )
}

export default ErrorRoute;