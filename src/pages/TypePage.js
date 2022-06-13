import '../assets/css/App.css';
import Header from '../components/Header';
import PokemonCard from '../components/PokemonCard';
import Footer from '../components/Footer';

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Type from '../components/Type';
import { Table } from 'antd'
import { render } from '@testing-library/react';
import PokemonList from '../components/PokemonList';

const TypePage = () => {

    const param = useParams()
    const location = useLocation()
    const [typeData, setTypeData] = useState();
    const [data, setData] = useState();
    const [species, setSpecies] = useState();

    const [typeName, setTypeName] = useState();
    const [pokemons, setPokemons] = useState();
    const [pokemonsData, setPokemonsData] = useState([]);
    const [moves, setMoves] = useState();

    const [double_damage_from, setDouble_damage_from] = useState();
    const [double_damage_to, setDouble_damage_to] = useState();
    const [half_damage_from, setHalf_damage_from] = useState();
    const [half_damage_to, setHalf_damage_to] = useState();
    const [no_damage_from, setNo_damage_from] = useState();
    const [no_damage_to, setNo_damage_to] = useState();

    const [source, setSource] = useState([]);

    //Redux
    const dataPkmn = useSelector((state) => state.dataPkmn.pkmn)
    const dataSpecies = useSelector((state) => state.dataPkmn.species)

    useEffect(() => {
        if (param) {
            fetch("https://pokeapi.co/api/v2/type/" + param.id)
                .then(response => response.json())
                .then(data => {
                    setTypeData(data)

                })
                .catch(error => console.log(error))
        }
    }, [param]);

    useEffect(() => {
        if (pokemons) {
            if (pokemonsData) {
                pokemons.forEach(item => {
                    fetch(item.pokemon.url)
                        .then(response => response.json())
                        .then(data => {
                            pokemonsData.push(data)
                        })
                        .catch(error => console.log(error))
                })
            }

        }
    }, [pokemons]);

    useEffect(() => {
        if (typeData) {
            typeData.names.forEach(item => {
                if (item.language.name == "fr") {
                    setTypeName(item.name)
                }
            })

            setPokemons(typeData.pokemon)
            setMoves(typeData.moves)

            setDouble_damage_from(typeData.damage_relations.double_damage_from)
            setDouble_damage_to(typeData.damage_relations.double_damage_to)
            setHalf_damage_from(typeData.damage_relations.half_damage_from)
            setHalf_damage_to(typeData.damage_relations.half_damage_to)
            setNo_damage_from(typeData.damage_relations.no_damage_from)
            setNo_damage_to(typeData.damage_relations.no_damage_to)
        }
    }, [typeData]);

    //Set all data
    useEffect(() => {
        var id = param.id
        setTypeData(undefined)
        setData(dataPkmn.payload[id - 1])
        setSpecies(dataSpecies.payload[id - 1])
    }, [location]);



    return (
        <div className="App">
            <Header />
            <div className="Panes">
                <div className="leftPane">
                    {/* //Pokemon Aléatoire */}
                    {dataPkmn && dataSpecies ? <PokemonCard id={Math.floor(Math.random() * (811 - 1)) + 1} /> : <div></div>}
                </div>
                <div className="middlePane">
                    {typeData ? <Type type={typeData.name} /> : <></>}
                    {
                        pokemonsData && pokemonsData.length > 0 ?
                            <>
                                <h3 style={{ color: "#fff", textAlign: "left", marginLeft: "2em" }}>Pokemons de ce type :</h3>
                                <PokemonList nb={811} data={pokemonsData} />
                            </>
                            : <></>
                    }

                </div>
                <div className="rightPane">

                </div>
            </div>
            <Footer />
        </div>
    );
};

export default TypePage;