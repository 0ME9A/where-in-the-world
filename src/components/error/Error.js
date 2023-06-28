import { Link } from 'react-router-dom';
import React from 'react';
import './Error.sass'

function Error(props) {
    return (
        <>
        <section className='error-container'>
            <h1>Error 404</h1>
            <p>
                Page not found go <Link to="/"> home</Link>
            </p>
        </section>
        <hr />
        </>
    );
}

export default Error;