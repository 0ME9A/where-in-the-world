import './Card.sass'

const Cards = (props) => {
    return (
        <div className="card-box">
            <img src={props.cImg} className="card-thumb" alt="Country flag" />
            <article className='card-text'>
                <h2>{props.cName}</h2>
                <ul>
                    <li><strong>Population: </strong>{props.cPopulation}</li>
                    <li><strong>Region: </strong>{props.cRegion}</li>
                    <li><strong>Capital: </strong>{props.cCapital}</li>
                </ul>
            </article>
        </div>
    )
}

export default Cards