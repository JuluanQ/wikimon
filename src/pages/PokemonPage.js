import React, { useState, useEffect } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';

import '../assets/css/App.css';
import PokemonCard from '../components/PokemonCard';
import { useParams, useLocation } from 'react-router-dom';

import { useSelector } from 'react-redux';

const PokemonPage = (props) => {
    const param = useParams()

    const [data, setData] = useState();
    const [species, setSpecies] = useState([]);
    const [desc, setDesc] = useState();
    const [moves, setMoves] = useState([]);
    const [img, setImg] = useState(String);

    //Redux
    const dataPkmn = useSelector((state) => state.dataPkmn.pkmn)
    const dataSpecies = useSelector((state) => state.dataPkmn.species)

    useEffect(() => {
        if (data) {
            if (data.sprites.other.dream_world.front_default != null) {
                setImg(data.sprites.other.dream_world.front_default)
            } else if (data.sprites.other.home.front_default != null) {
                setImg(data.sprites.other.home.front_default)
            }
        }
    }, [data]);

    useEffect(() => {
        var id = param.id
        setData(dataPkmn.payload[id - 1])
        setSpecies(dataSpecies.payload[id - 1])
    }, [param]);

    useEffect(() => {
        if (species) {

        }
    }, [species])

    return (
        <div className="App">
            <Header />
            <div className="Panes">
                <div className="leftPane">
                    {/* //Pokemon Aléatoire */}
                    <PokemonCard id={Math.floor(Math.random() * (811 - 1)) + 1} />
                </div>
                <div className="middlePane">
                    {
                        data ?
                            <img src={img} alt="pkmnImage" style={{ width: "7em" }} />
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