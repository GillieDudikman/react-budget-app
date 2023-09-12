import {fetchData} from "../util";
import {Outlet, useLoaderData} from "react-router-dom";
import Nav from "../components/Nav";

export const mainLoader = () => {
    const userName = fetchData("userName");
    return { userName };
}

const Main = () => {
    const data = useLoaderData();

    return (
        <div>
            <Nav userName={data.userName}/>
            <main className="layout">
                <Outlet/>
            </main>
        </div>
    )
}

export default Main;