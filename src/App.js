import Nav from "./components/nav/Nav"
import './style.sass'
import Home from "./Pages/HomePage/Home"
import Country from "./Pages/Country/Country"
import Footer from "./components/footer/Footer"
import { Route, Routes} from 'react-router-dom'
import { useEffect, useState } from "react"
import Error from "./components/error/Error"


const App = () => {
    const [lite, setLite] = useState('')
    const checkCookie = () => {
        if (document.cookie.includes('dark')) {
            setLite('dark')
        } else {
            setLite('')
        }
    }
    document.getElementById("root").classList = lite
    useEffect(() => {
        setInterval(() => {
            checkCookie()
        }, 1000);
    }, [])

    return (
        <div>
            <Routes>
                <Route path="/" element={<Nav/>}>
                    <Route index element={<Home />} />
                    <Route path="/country/:countryParam" element={<Country />} />
                    <Route path="/*" element={<Error/>}/>
                </Route>
            </Routes>
            <Footer />
        </div>
    )
}

export default App