import './Card.sass'

const Cards = (props) => {
    return (
        <article className="card-box" role="treeitem link">
            <img src={props.cImg} className="card-thumb" alt="Country Flag not Able to Show." />
            <section className='card-text'>
                <h2>{props.cName}</h2>
                <ul>
                    <li><strong>Population: </strong>{props.cPopulation}</li>
                    <li><strong>Region: </strong>{props.cRegion}</li>
                    <li><strong>Capital: </strong>{props.cCapital}</li>
                </ul>
            </section>
        </article>
    )
}

export default Cards