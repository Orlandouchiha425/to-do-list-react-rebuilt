
import { Outlet } from "react-router-dom";

const Layout=()=>{
    return(
        <div className="headerClass">
            <header className="navbar navbar-light bg-light">
            <h1>This is my to Do List</h1>
            </header>
            <main>
                <Outlet />
            </main>
            
        </div>
    )
}

export default Layout