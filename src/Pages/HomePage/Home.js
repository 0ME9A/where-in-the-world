import Cards from "../../components/cards/Card"
import './Home.sass'
import { GoSearch } from 'react-icons/go'
import { IoIosArrowDown } from 'react-icons/io'
import { useEffect, useState, useTransition } from "react"
import { Link } from "react-router-dom"
import Loading from "../../components/loading/Loading"


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
        console.log("getcont")
    }
    const chese = (e) => {
        setSearch(e.target.value)
        setTimeout(() => {
            startTransition(() => {
                getCountry(e.target.value)
            })
        }, 1000);
        console.log("chese")
    }
    const filterByRegion = (region = '') => {
        setFilter(region)
        getCountry('', region)
        console.log('filtbyr')
    }
    useEffect(() => {
        getCountry()
        console.log('eff')
    }, [])


    if (apiStatus === 200) {
        return (
            <section className="main-container">
                <section className="filter-container">
                    <section className="form" role="search">
                        <input type='text' value={search} role="searchbox" onChange={chese} name="Country" id="search-input" />
                        <label htmlFor="search-input"><GoSearch className="icon" />Search...</label>
                    </section>

                    <section className="select">
                        <h3 aria-current={filter}>{filter}<IoIosArrowDown /></h3>
                        <ul>
                            <li
                                role="link"
                                onClick={() => { filterByRegion('Africa') }}>
                                Africa
                            </li>
                            <li
                                role="link"
                                onClick={() => { filterByRegion('America') }}>
                                America
                            </li>
                            <li
                                role="link"
                                onClick={() => { filterByRegion('Asia') }}>
                                Asia
                            </li>
                            <li
                                role="link"
                                onClick={() => { filterByRegion('Europe') }}>
                                Europe
                            </li>
                            <li
                                role="link"
                                onClick={() => { filterByRegion('Oceania') }}>
                                Oceania
                            </li>
                        </ul>
                    </section>
                </section>
                <main className="cards-container">
                    {
                        coun.map((cList) => {
                            return (
                                <Link to={'/country/' + cList.name.common} target="_top" key={Math.random() * 50000}>
                                    <Cards cName={cList.name.common} cImg={cList.flags.png} cRegion={cList.region} cCapital={cList.capital} cPopulation={cList.population} />
                                </Link>
                            )
                        })
                    }
                </main>
            </section>
        )
    }
    else {
        return (
            <section className="main-container">
                <section className="filter-container">
                    <section className="form" role="search">
                        <input type='text' value={search} role="searchbox" onChange={chese} name="Country" id="search-input" />
                        <label htmlFor="search-input" ><GoSearch className="icon" />Search...</label>
                    </section>

                    <section className="select">
                        <h3 aria-current={filter}>{filter}<IoIosArrowDown /></h3>
                        <ul>
                            <li
                                role="link"
                                onClick={() => { filterByRegion('Africa') }}>
                                Africa
                            </li>
                            <li
                                role="link"
                                onClick={() => { filterByRegion('America') }}>
                                America
                            </li>
                            <li
                                role="link"
                                onClick={() => { filterByRegion('Asia') }}>
                                Asia
                            </li>
                            <li
                                role="link"
                                onClick={() => { filterByRegion('Europe') }}>
                                Europe
                            </li>
                            <li
                                role="link"
                                onClick={() => { filterByRegion('Oceania') }}>
                                Oceania
                            </li>
                        </ul>
                    </section>
                </section>
                <section className="cards-container" role="main">
                    <Loading/>
                </section>
            </section>
        )

    }
}

export default Home