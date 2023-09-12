import {Form, NavLink} from "react-router-dom";
import {BsTrash3Fill} from "react-icons/bs";
import {ImHome} from "react-icons/im";

const Nav = ({ userName }) => {
    return (
        <nav className="navbar">
            <div className="navbar-elements">
                <NavLink to="/" aria-label="Home">
                    <ImHome className="logo"/>
                    <span>ReactBudget</span>
                </NavLink>

                {
                    userName && (
                        <Form method="post" action="/logout">
                            <button type="submit">
                                <span>Delete User</span>
                                <BsTrash3Fill className="delete-logo"/>
                            </button>
                        </Form>
                    )
                }
            </div>
        </nav>
    )
}

export default Nav;