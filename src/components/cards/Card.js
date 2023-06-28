import { Link } from 'react-router-dom'
import './Card.sass'

const Cards = (props) => {
    return (
        <Link to={`/country/${props.cName}`}>
            <article className="card-box">
                <img src={props.cImg} className="card-thumb" alt="Country flag" />
                <div className='card-text'>
                    <h2>{props.cName}</h2>
                    <ul>
                        <li><strong>Population: </strong>{props.cPopulation}</li>
                        <li><strong>Region: </strong>{props.cRegion}</li>
                        <li><strong>Capital: </strong>{props.cCapital}</li>
                    </ul>
                </div>
            </article>
        </Link>
    )
}

export default Cards