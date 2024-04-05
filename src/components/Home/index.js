import React, { useEffect } from 'react';
import Header from '../Header';
import './index.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const token = Cookies.get("JWTToken");
    const nav = useNavigate();

    useEffect(() => {
        if (token === undefined) {
            nav("/login", { replace: true });
        }
    }, [nav, token]);

    return (
        <div>
            <Header />
            <div className="home">
                <h1>exciting offers!!</h1>
                <img src="/shoppingImg.png" alt="shoppingImg" />
            </div>
        </div>
    );
}

export default Home;
