import React from 'react'
import './Country.sass'
import '../../components/nav/Nav'
import { BsArrowLeft } from 'react-icons/bs'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CountriesWidthCode from '../../assets/countries'
import { useNavigate } from "react-router-dom";
import Loading from '../../components/loading/Loading'

const Country = () => {
    const { countryParam } = useParams('')
    const [apiStatus, setApiStatus] = useState('')
    const [countryDetail, setCountryDetail] = useState([])
    const navigate = useNavigate();

    const getDetail = async (param) => {
        const urls = 'https://restcountries.com/v3.1/name/' + param + '?fullText=true'
        const response = await fetch(urls);
        if (response.status === 200) {
            const finalResponse = await response.json()
            setApiStatus(200)
            setCountryDetail(finalResponse)
        }
        else {
            setApiStatus(404)
        }
    }

    useEffect(() => {
        getDetail(countryParam);
    }, [countryParam])


    const objLoop = (param, deepparam = '') => {
        let obj;
        for (const key in param) {
            if (Object.hasOwnProperty.call(param, key)) {
                const element = param[key];
                if (deepparam === '') {
                    obj = obj + ', ' + element
                }
                else {
                    obj = obj + ', ' + (element[deepparam])
                }
            }
        }
        obj = obj.replace('undefined,', '')
        return obj
    }


    if (apiStatus === 200) {
        let cLang = countryDetail[0].languages
        let cCurren = countryDetail[0].currencies
        let cNativ = countryDetail[0].name.nativeName
        let cBorders = countryDetail[0].borders

        cLang === undefined ? cLang = [''] : cLang = countryDetail[0].languages
        cNativ === undefined ? cNativ = [''] : cNativ = countryDetail[0].name.nativeName
        cCurren === undefined ? cCurren = [''] : cCurren = countryDetail[0].currencies
        cBorders === undefined ? cBorders = [''] : cBorders = countryDetail[0].borders

        return (
            <div className='main-container' id='country'>
                <div className='histroy-btn'>
                    <button onClick={() => { navigate('/') }}><BsArrowLeft className='icon' /> Back</button>
                </div>
                <hr />
                <div className='country-container'>
                    {/* <figure className='country-flag'> */}
                    <img src={countryDetail[0].flags.png} alt="Country Flag" />
                    {/* </figure> */}
                    <article className='country-info'>
                        <h1>{countryDetail[0].name.common}</h1>
                        <div className='country-info-values'>
                            <ul>
                                <li><strong>Native: </strong>{objLoop(cNativ, 'common')}</li>
                                <li><strong>Population: </strong>{countryDetail[0].population}</li>
                                <li><strong>Sub Region: </strong>{countryDetail[0].subregion}</li>
                                <li><strong>Capital: </strong>{countryDetail[0].capital}</li>
                            </ul>
                            <ul>
                                <li><strong>Top Level Domain: </strong>{countryDetail[0].tld}</li>
                                <li><strong>Currencies: </strong>{Object.values(cCurren)[0].name}</li>
                                <li><strong>Languages: </strong>{objLoop(cLang)}</li>
                            </ul>
                        </div>
                        <footer className='country-border'>
                            <h2>Border Countries:</h2>
                            <section className='tags-container'>
                                {
                                    cBorders.map((theKey) => {
                                        for (let i = 0; i < CountriesWidthCode.length; i++) {
                                            const element = CountriesWidthCode[i];
                                            if (theKey === element.alpha_3) {
                                                return (
                                                    <Link to={'/country/' + element.name} className='tag' key={Math.random() * 5000}>{element.name}</Link>
                                                )
                                            }
                                        }
                                        if (theKey === '') {
                                            return (
                                                <button disabled className='tag' key={Math.random() * 5000}>No Border</button>
                                            )
                                        }
                                    })
                                }
                            </section>
                        </footer>
                    </article>
                </div>
            </div>
        )
    } else {
        return (
            <Loading />
        )
    }

}

export default Country