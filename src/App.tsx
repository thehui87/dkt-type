import React from 'react';
import { ReactComponent as Logo } from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/navbar';
import Home from './pages/home';
import About from './pages/about';
import Profile from './pages/profile';
import MyFooter from './components/footer';

function App() {
    // let location = useLocation();
    // console.log(location);

    // window.location.href
    return (
        <div className="App">
            {/* <header className="App-header">
                <Logo className="App-logo w-48 h-48" />
            </header> */}
            <div className="bg-teal-900 h-dvh">
                <BrowserRouter>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/profile" element={<Profile />} />
                    </Routes>
                </BrowserRouter>
            </div>
            <MyFooter />
        </div>
    );
}

export default App;
