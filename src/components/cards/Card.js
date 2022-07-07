import './Card.sass'

const Cards = (props) =>{
    return (
        <div className="card-box">
            <figure className='card-thumb'>
                <img src={props.cImg} alt="Country Flag not Able to Show."/>
            </figure>
            <div className='card-text'>
                <h3>{props.cName}</h3>
                <ul>
                    <li>Population: <span className='card-text-info population'> {props.cPopulation}</span></li>
                    <li>Region: <span className='card-text-info region'> {props.cRegion}</span></li>
                    <li>Capital: <span className='card-text-info capital'> {props.cCapital}</span></li>
                </ul>
            </div>
        </div>
    )
}

export default Cards