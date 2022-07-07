import Cards from "../../components/cards/Card"
import './Home.sass'
import { GoSearch } from 'react-icons/go'
import { IoIosArrowDown } from 'react-icons/io'
import { useEffect, useState, useTransition } from "react"
import { Link } from "react-router-dom"


const Home = () => {
    const [filter, setFilter] = useState('Filter by Region')
    const [search, setSearch] = useState('')
    const [coun, setCoun] = useState([])
    const [apiStatus, setApiStatus] = useState(404)
    const [isPending, startTransition] = useTransition()


    const getCountry = async (bySearch = '', byFilter = '') => {
        let urls;
        if (bySearch !== '' && byFilter === '') {
            urls = 'https://restcountries.com/v3.1/name/' + bySearch
        }
        else if (byFilter !== '' && bySearch === '') {
            urls = 'https://restcountries.com/v3.1/region/' + byFilter
        }
        else {
            urls = 'https://restcountries.com/v3.1/all'
        }
        const response = await fetch(urls);
        if (response.status === 200) {
            const finalResponse = await response.json()
            setCoun(finalResponse)
            setApiStatus(200)
        }
        else {
            setApiStatus(404)
        }
    }
    const chese = (e) => {
        setSearch(e.target.value)
        startTransition(() => {
            getCountry(e.target.value)
        })
    }
    const filterByRegion = (region = '') => {
        setFilter(region)
        getCountry('', region)
    }
    useEffect(() => {
        getCountry()
    }, [])


    if (apiStatus === 200) {
        return (
            <div className="main-container">
                <div className="filter-container">
                    <div className="form">
                        <input type='text' value={search} onChange={chese} id="Country" name="Country" placeholder="" />
                        <label><GoSearch className="icon" />Search...</label>
                    </div>

                    <div className="select">
                        <h3><span>{filter}</span><IoIosArrowDown /></h3>
                        <ul>
                            <li onClick={() => { filterByRegion('Africa') }}><span>Africa</span></li>
                            <li onClick={() => { filterByRegion('America') }}><span>America</span></li>
                            <li onClick={() => { filterByRegion('Asia') }}><span>Asia</span></li>
                            <li onClick={() => { filterByRegion('Europe') }}><span>Europe</span></li>
                            <li onClick={() => { filterByRegion('Oceania') }}><span>Oceania</span></li>
                        </ul>
                    </div>
                </div>
                <div className="cards-container">
                    {
                        coun.map((cList) => {
                            return (
                                <Link to={'/where-in-the-world/' + cList.name.common} key={Math.random() * 50000}>
                                    <Cards cName={cList.name.common} cImg={cList.flags.png} cRegion={cList.region} cCapital={cList.capital} cPopulation={cList.population} />
                                </Link>
                            )

                        })
                    }
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="main-container">
                <div className="filter-container">
                    <div className="form">
                        <input type='text' value={search} onChange={chese} name="Country" />
                        <label><GoSearch className="icon" />Search...</label>
                    </div>

                    <div className="select">
                        <h3><span>{filter}</span><IoIosArrowDown /></h3>
                        <ul>
                            <li onClick={() => { filterByRegion('Africa') }}><span>Africa</span></li>
                            <li onClick={() => { filterByRegion('America') }}><span>America</span></li>
                            <li onClick={() => { filterByRegion('Asia') }}><span>Asia</span></li>
                            <li onClick={() => { filterByRegion('Europe') }}><span>Europe</span></li>
                            <li onClick={() => { filterByRegion('Oceania') }}><span>Oceania</span></li>
                        </ul>
                    </div>
                </div>
                <div className="cards-container">
                    <h1>Loading...</h1>
                </div>
            </div>
        )

    }
}

export default Home