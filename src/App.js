import Nav from "./components/nav/Nav"
import './style.sass'
import Home from "./Pages/HomePage/Home"
import Country from "./Pages/Country/Country"
import Footer from "./components/footer/Footer"
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { useEffect, useState } from "react"


const App = () => {
    const [lite, setLite] = useState('')
    const checkCookie=()=>{
        if (document.cookie.includes('dark')) {
            setLite('dark')
            // document.getElementById("root").classList = lite
        } else {
            setLite('')
        }
    }
    document.getElementById("root").classList = lite
    useEffect(()=>{
        setInterval(() => {
            checkCookie()
        }, 1000);
    },[])
    
    return (
        <div>
            <Nav />
            <BrowserRouter>
                <Routes>
                    <Route path="/where-in-the-world/" element={<Home />} />
                    <Route path="/where-in-the-world/:countryParam" element={<Country />} />
                </Routes>
            </BrowserRouter>
            <Footer />
        </div>
    )
}

export default App