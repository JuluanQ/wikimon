import React, { useState, useEffect } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';

import '../assets/css/App.css';
import PokemonCard from '../components/PokemonCard';
import { useParams } from 'react-router-dom';

const PokemonPage = (props) => {
    const param = useParams()

    const [randomId, setRandomId] = useState(null);

    useEffect(() => {
        setRandomId(Math.floor(Math.random() * (898 - 1)) + 1)
        console.log(randomId)
    }, []);

    return (
        <div className="App">
            <Header />
            <div className="Panes">
                <div className="leftPane">
                    {/* //Pokemon Aléatoire */}
                    {randomId ? <PokemonCard id={randomId} /> : <div></div>}
                </div>
                <div className="middlePane">
                    <PokemonCard id={param.id} />
                </div>
                <div className="rightPane">

                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PokemonPage;