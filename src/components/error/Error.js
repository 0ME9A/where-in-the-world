import React from 'react';
import { Link } from 'react-router-dom';
import './Error.sass'

function Error(props) {
    return (
        <div className='error-container'>
            <h1>Error 404</h1>
            <p>
                Page not found go <Link to="/"> home</Link>
            </p>
        </div>
    );
}

export default Error;