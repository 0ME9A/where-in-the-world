import { useEffect, useState } from "react";
import { IoIosArrowDown } from 'react-icons/io';
import { GoSearch } from 'react-icons/go';
import Loading from "../../components/loading/Loading";
import Cards from "../../components/cards/Card";
import './Home.sass';

const filterList = [
    { name: "All" },
    { name: "Africa" },
    { name: "Americas" },
    { name: "Antarctic" },
    { name: "Asia" },
    { name: "Europe" },
    { name: "Oceania" },
];

const Home = () => {
    const [filterByRegion, setFilterByRegion] = useState('');
    const [filterBySearch, setFilterBySearch] = useState('');
    const [countries, setCountries] = useState([]);
    const [apiStatus, setApiStatus] = useState(404);
    const [apiData, setApiData] = useState([]);
    const [noRecord, setNoRecord] = useState(false);

    const getCountry = async () => {
        try {
            const fetchData = await fetch('https://restcountries.com/v3.1/all');
            const res = await fetchData.json();
            setApiData(res);
            setApiStatus(200);
        } catch (error) {
            console.log('Error:', error);
        }
    };

    const handleFilterByRegion = (region) => {
        region === "All" ? setFilterByRegion('') : setFilterByRegion(region)
    };
    const handleFilterBySearch = (e) => {
        setFilterBySearch(e.target.value);
    };


    useEffect(() => {
        if (filterBySearch && filterByRegion) {
            const filterCountries = apiData.filter(item => {
                const countriesName = item.name.common.toLowerCase()
                return countriesName.includes(filterBySearch) && (!filterByRegion ? item : item.region === filterByRegion);
            })
            setCountries(filterCountries);
        } else if (filterBySearch && !filterByRegion) {
            const filterCountries = apiData.filter(item => {
                const countriesName = item.name.common.toLowerCase()
                return countriesName.includes(filterBySearch)
            })
            setCountries(filterCountries);
        } else if (!filterBySearch && filterByRegion) {
            const filterCountries = apiData.filter(item => {
                return !filterByRegion ? item : item.region === filterByRegion;
            });
            setCountries(filterCountries);
        } else {
            setCountries(apiData);
        }
    }, [apiData, filterByRegion, filterBySearch]);


    useEffect(() => {
        getCountry();
        document.title = "Where in the world?";
    }, []);

    return (
        <div className="main-container">
            <div className="filter-container">
                <div className="form" role="search" aria-label="search country">
                    <input
                        type="search"
                        value={filterBySearch}
                        role="searchbox"
                        name="Country"
                        id="search-input"
                        onChange={handleFilterBySearch}
                    />
                    <label htmlFor="search-input">
                        <GoSearch className="icon" />
                        Search...
                    </label>
                </div>
                <div className="select">
                    <h3>{!filterByRegion ? "Filter by region" : filterByRegion}<IoIosArrowDown /></h3>
                    <ul>
                        {filterList.map(item => (
                            <li
                                title={item.name}
                                key={item.name}
                                onClick={() => handleFilterByRegion(item.name)}
                            >
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <main className="cards-container">
                {apiStatus === 200 ?
                    countries.map((item) => {
                        return (
                            <Cards
                                cName={item.name.common}
                                cImg={item.flags.png}
                                cRegion={item.region}
                                cCapital={item.capital}
                                cPopulation={item.population}
                                key={item.cca3}
                            />)
                    }
                    ) : <Loading />}
            </main>
        </div>
    );
}

export default Home;