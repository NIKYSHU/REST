import React from 'react'
import {Link} from "react-router-dom";

const MenuItem = () => {
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
            </ul>
        </nav>
    )
}

export default MenuItem