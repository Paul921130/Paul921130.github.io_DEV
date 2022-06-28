import React from 'react';
import { Link } from 'react-router-dom';
import './module.scss';

function Header() {
    return (
        <div className="header">
            <ul>
                <li>
                    <Link to="Pokemon">Pokemon</Link>
                    <Link to="findbus">尋找公車站</Link>
                </li>
            </ul>
        </div>
    );
}

export default Header;
