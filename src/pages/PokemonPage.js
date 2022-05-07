import React, { useState, useEffect } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';

import '../assets/css/App.css';
import '../assets/css/pokemonPage.css'
import PokemonCard from '../components/PokemonCard';
import { useParams, useLocation } from 'react-router-dom';

import { useSelector } from 'react-redux';
import Type from '../components/Type';

const PokemonPage = (props) => {
    const param = useParams()

    const location = useLocation();

    //On new location reset some states
    useEffect(() => {
        setType1("")
        setType2("")
    }, [location]);

    const [data, setData] = useState();
    const [species, setSpecies] = useState([]);
    const [desc, setDesc] = useState("");
    const [name, setName] = useState(String);
    const [genera, setGenera] = useState();
    const [type1, setType1] = useState("");
    const [type2, setType2] = useState("");
    const [pkmnId, setPkmnId] = useState();
    const [moves, setMoves] = useState([]);
    const [img, setImg] = useState(String);

    //Redux
    const dataPkmn = useSelector((state) => state.dataPkmn.pkmn)
    const dataSpecies = useSelector((state) => state.dataPkmn.species)

    //Process data pokemon
    useEffect(() => {
        if (data) {
            if (data.sprites.other.dream_world.front_default != null) {
                setImg(data.sprites.other.dream_world.front_default)
            } else if (data.sprites.other.home.front_default != null) {
                setImg(data.sprites.other.home.front_default)
            }

            setType1(data.types[0].type.name)
            if (data.types.length > 1) {
                setType2(data.types[1].type.name)
            }
            console.log("t1:", type1, " t2:", type2)
        }
    }, [data]);

    //Set all data
    useEffect(() => {
        setPkmnId(param.id)
        var id = param.id
        setData(dataPkmn.payload[id - 1])
        setSpecies(dataSpecies.payload[id - 1])
    }, [param]);

    //Process data species
    useEffect(() => {
        if (species) {

            if (species.names != undefined) {
                species.names.forEach(element => {
                    if (element.language.name == "fr") {
                        setName(element.name)
                    }
                })
            }

            if (species.genera != undefined) {
                species.genera.forEach(element => {
                    if (element.language.name == "fr") {
                        setGenera(element.genus)
                    }
                })
            }

            if (species.flavor_text_entries != undefined) {
                species.flavor_text_entries.forEach(item => {
                    if (item.language.name == "fr") {
                        setDesc(item.flavor_text)
                    }
                })
            }
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

                    {data ?
                        <>
                            <div style={{ display: 'flex', alignItems: 'baseline' }}>
                                <h1 className='titleName'>{name}</h1>
                                <h1 className='titleId'>{pkmnId}</h1>
                            </div>

                            <div style={{ display: 'flex', }}>

                                <img src={img} alt="pkmnImage" className='pkmnPageImage' />

                                <div className="pkmnPagetypes">
                                    {type1 ?
                                        <Type type={type1} />
                                        : <div className='emptyType'></div>}
                                    {type2 ?
                                        <Type type={type2} />
                                        : <div className='emptyType'></div>}
                                </div>

                            </div>
                            <div className='pkmnPageCard'>
                                <h4>{genera}</h4>
                            </div>
                            <div className='pkmnPageDesc'>
                                {
                                    desc ?
                                        <>
                                            <h2>Description</h2>
                                            <p>{desc}</p>
                                        </>
                                        :
                                        <p>No description found</p>
                                }
                            </div>
                        </>
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