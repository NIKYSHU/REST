import React from 'react'
import {Link} from "react-router-dom";


const MenuItem = (component) => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to='/'>Users</Link>
                </li>
                <li>
                    <Link to='/todo'>Notes</Link>
                </li>
                <li>
                    <Link to='/projects'>Projects</Link>
                </li>
                <li>
                    {component.parentComponent.isAuthenticated() ?
                        <button onClick={()=>component.parentComponent.logout()}>Logout</button> :
                        <Link to='/login'>Login</Link>}
                </li>
            </ul>
        </nav>
    )
}

export default MenuItem