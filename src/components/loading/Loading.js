import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Loading.sass';

function Loading(props) {
    const [home, setHome] = useState('Loading...')

    useEffect(()=>{
        setTimeout(() => {
            setHome(<p>Page not found go <Link to="/" target={"_top"}> home</Link></p>)
        }, 10000);
    },[])

    return (
        <>
        <section className='loading' role="progressbar">
            <h2>
                {home}
            </h2>
        </section>
        <hr />
        </>
    );
}

export default Loading;