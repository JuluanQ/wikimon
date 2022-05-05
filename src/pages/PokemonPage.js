import React, { useState, useEffect } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';

import '../assets/css/App.css';
import PokemonCard from '../components/PokemonCard';
import { useParams, useLocation } from 'react-router-dom';

const PokemonPage = (props) => {
    const param = useParams()

    const [dataPkmn, setDataPkmn] = useState();
    const [dataSpecies, setDataSpecies] = useState();
    const [desc, setDesc] = useState();
    const [moves, setMoves] = useState([]);

    const [randomId, setRandomId] = useState(null);

    const location = useLocation();

    useEffect(() => {
        console.log(location)
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
                    {
                        dataPkmn ?
                            <PokemonCard id={dataPkmn.id} />
                            :
                            <div></div>
                    }
                </div>
                <div className="rightPane">

                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PokemonPage;