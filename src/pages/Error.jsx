import { Link, useNavigate, useRouteError} from "react-router-dom";
import {TbArrowBack} from "react-icons/tb";
import {AiFillHome} from "react-icons/ai";

const Error = () => {
    const error = useRouteError();
    const nav = useNavigate()

    return (
        <div className="error">

            <h1>Uh oh! We've got a problem!</h1>
            <p>{error.message || error.statusText} </p>
            <div className="error-nav">
                <button onClick={() => nav(-1)}>
                    <TbArrowBack className="error-back-logo"/>
                    <span>Go Back</span>
                </button>
                <Link to="/react-budget-app/">
                    <span>Go Home</span>
                    <AiFillHome className="error-home-logo"/>
                </Link>
            </div>
        </div>
    )
}
export default Error;