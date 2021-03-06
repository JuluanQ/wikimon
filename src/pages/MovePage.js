import React, { useState, useEffect } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import PokemonDuJour from '../components/PokemonDuJour';
import TypeDuJour from '../components/TypeDuJour';
import PokemonCard from '../components/PokemonCard';
import { typesUrl } from '../components/Type';
import PokemonList from '../components/PokemonList';
import Move from '../components/Move';

import '../assets/css/App.css';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';

// Pokemon et type du jour

const MovePage = (props) => {
    const param = useParams()
    const location = useLocation();
    const navigate = useNavigate();
    const [data, setData] = useState();

    const [pokemons, setPokemons] = useState();
    const [species, setSpecies] = useState();
    const [pokemonsData, setPokemonsData] = useState([]);

    //Moves
    const [moves, setMoves] = useState([]);
    const [movesData, setMovesData] = useState([]);
    const [moveData, setMoveData] = useState();
    const [moveName, setMoveName] = useState();
    const [meta, setMeta] = useState();
    const [power, setPower] = useState();
    const [pp, setPp] = useState();
    const [priority, setPriority] = useState();
    const [stat_changes, setStat_changes] = useState();
    const [type, setType] = useState();
    const [super_contest_effect, setSuper_contest_effect] = useState();
    const [effect, setEffect] = useState();

    //Redux
    const dataPkmn = useSelector((state) => state.dataPkmn.pkmn)
    const dataSpecies = useSelector((state) => state.dataPkmn.species)

    useEffect(() => {
        if (param) {
            fetch("https://pokeapi.co/api/v2/move/" + param.id)
                .then(response => response.json())
                .then(data => {
                    setMoveData(data)
                })
                .catch(error => console.log(error))
        }
        setPokemonsData([])
    }, [param]);

    useEffect(() => {
        if (pokemons) {
            setPokemonsData([])
            pokemons.forEach(item => {
                fetch(item.url)
                    .then(response => response.json())
                    .then(data => {
                        setPokemonsData(pokemonsData => [...pokemonsData, data])
                    })
                    .catch(error => console.log(error))
            })
        }
    }, [pokemons]);

    useEffect(() => {
        if (moveData) {
            moveData.names.forEach(item => {
                if (item.language.name == "fr") {
                    setMoveName(item.name)
                }
            })

            moveData.flavor_text_entries.forEach(item => {
                if (item.language.name == "fr") {
                    setEffect(item.flavor_text)
                }   
            })

            setPokemons(moveData.learned_by_pokemon)

            setMeta(moveData.meta)
            setPower(moveData.power)
            setPp(moveData.pp)
            setPriority(moveData.priority)
            setStat_changes(moveData.stat_changes)
            setType(moveData.type)
            setSuper_contest_effect(moveData.super_contest_effecta)

        }
    }, [moveData]);

    //Set all data
    useEffect(() => {
        var id = param.id
        setMoveData(undefined)
        setPokemonsData([])
        document.getElementById("imgsList").innerHTML = ""
        setData(dataPkmn[id - 1])
        setSpecies(dataSpecies.payload[id - 1])
    }, [location]);



    const handleClickMove = (id) => {
        if (id) {
            navigate("/move/" + id);
        }
    }

    //Process data pokemon
    useEffect(() => {
        if (data) {

            setMoves(data.moves)
        }
    }, [data]);

    //Moves
    useEffect(() => {
        if (moves.length > 0) {
            var container = document.getElementById('pkmnAttacks')
            container.innerHTML = ""
            moves.forEach(item => {
                fetch(item.move.url)
                    .then(response => response.json())
                    .then(data => {

                        var element = document.createElement('div')
                        element.setAttribute("class", "move hvr-grow")
                        var nameP = document.createElement('p')
                        data.names.forEach(nameElement => {
                            if (nameElement.language.name == "fr") {
                                nameP.textContent = nameElement.name

                            }
                        })


                        var ppTxt = document.createElement('p')
                        ppTxt.textContent = "Pp : " + data.pp

                        var powerTxt = document.createElement('p')
                        powerTxt.textContent = "Puissance : " + data.power

                        var accuracyTxt = document.createElement('p')
                        accuracyTxt.textContent = "Pr??cision : " + data.accuracy

                        var divContainer = document.createElement("div")
                        divContainer.appendChild(ppTxt)
                        //divContainer.appendChild(powerTxt)
                        //divContainer.appendChild(accuracyTxt)
                        divContainer.appendChild(typeImg)
                        element.appendChild(nameImg)
                        element.appendChild(divContainer)
                        element.addEventListener('click', () => { handleClickMove(data.id) })
                        container.appendChild(element)

                    })
                    .catch(error => console.log(error))
            })
        }
    }, [moves]);

    return (
        <div className="App">
            <Header />
            <div className="Panes">
                <div className="leftPane">
                    {/* //Pokemon Al??atoire */}
                    <PokemonCard id={Math.floor(Math.random() * (811 - 1)) + 1} />
                </div>
                <div className="middlePane centered">
                    {moveData && type ? <Move moveName={moveName} pp={pp} url={typesUrl[type.name]} moveId={param.id} effect={effect} /> : <></>}
                    <h3 style={{ color: "#fff", textAlign: "left", marginLeft: "2em" }}>Pokemons avec cette attaque :</h3>
                    {location ? <PokemonList nb={811} data={pokemonsData} /> : <></>}
                </div>
                <div className="rightPane">
                    {/* On veut afficher un Pokemon du jour au hasard pendant 24h */}
                    {dataPkmn && dataSpecies ? <PokemonDuJour /> : <div></div>}

                    {/* On veut afficher un type du jour pendant 24h */}
                    {<TypeDuJour />}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default MovePage;
