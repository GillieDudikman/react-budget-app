import {Form} from "react-router-dom";
import {BsPersonFillAdd} from "react-icons/bs";

const Intro = () => {
    return (
        <div className="intro">
            <h1>
                Take Control of <span className="accent">Your Money</span>
            </h1>
            <p>Start your journey today</p>
            <Form method="post">
                <div className="form-input">
                    <input type="text" name="userName" required placeholder="Your name" aria-label="Your name" autoComplete="given-name"/>
                    <input type="hidden" name="_action" value="newUser"/>
                </div>

                <button type="submit">
                        <span>Create Account</span>
                        <BsPersonFillAdd className="logo-intro"/>
                </button>
            </Form>
        </div>
    )
}

export default Intro