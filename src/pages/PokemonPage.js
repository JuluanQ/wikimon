import React, { useState, useEffect } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';

import '../assets/css/App.css';
import '../assets/css/pokemonPage.css'
import PokemonCard from '../components/PokemonCard';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import Type, { typesUrl, typesId } from '../components/Type';
import { renderIntoDocument } from 'react-dom/test-utils';

const PokemonPage = (props) => {
    const param = useParams()
    const location = useLocation();
    const navigate = useNavigate();

    const [data, setData] = useState();
    const [species, setSpecies] = useState([]);
    const [desc, setDesc] = useState("");
    const [name, setName] = useState(String);
    const [genera, setGenera] = useState();
    const [type1, setType1] = useState();
    const [type2, setType2] = useState();
    const [pkmnId, setPkmnId] = useState();
    const [img, setImg] = useState(String);

    //Stats
    const [attack, setAttack] = useState();
    const [hp, setHp] = useState();
    const [defense, setDefense] = useState();
    const [specialAtk, setSpecialAtk] = useState();
    const [specialDef, setSpecialDef] = useState();
    const [speed, setSpeed] = useState();

    //Evolutions
    const [evolChain, setEvolChain] = useState();
    const [evolutions, setEvolutions] = useState(new Map());
    const [evols, setEvols] = useState([]);
    const [evol1, setEvol1] = useState();
    const [evol2, setEvol2] = useState();
    const [evol1Img, setEvol1Img] = useState();
    const [evol2Img, setEvol2Img] = useState();

    //Moves
    const [moves, setMoves] = useState([]);
    const [movesData, setMovesData] = useState([]);

    //Redux
    const dataPkmn = useSelector((state) => state.dataPkmn.pkmn)
    const dataSpecies = useSelector((state) => state.dataPkmn.species)

    const handleClickPkmn = (id) => {
        if (id) {
            navigate("/pokemon/" + id);
        }
    }


    const handleClickMove = (id) => {
        if (id) {
            navigate("/move/" + id);
        }
    }

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

            setHp(data.stats[0].base_stat)
            setAttack(data.stats[1].base_stat)
            setDefense(data.stats[2].base_stat)
            setSpecialAtk(data.stats[3].base_stat)
            setSpecialDef(data.stats[4].base_stat)
            setSpeed(data.stats[5].base_stat)

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
                        var nameImg = document.createElement('div')
                        nameImg.setAttribute('class', 'nameImg')
                        nameImg.appendChild(nameP)

                        var typeImg = document.createElement('img')
                        typeImg.src = typesUrl[data.type.name]


                        var ppTxt = document.createElement('p')
                        ppTxt.textContent = "Pp : " + data.pp

                        var powerTxt = document.createElement('p')
                        powerTxt.textContent = "Puissance : " + data.power

                        var accuracyTxt = document.createElement('p')
                        accuracyTxt.textContent = "Précision : " + data.accuracy

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

    //Set all data
    useEffect(() => {
        setType1()
        setType2()
        setEvolutions(new Map())
        setEvols([])
        setEvol1()
        setEvol2()
        setEvol1Img()
        setEvol2Img()

        setPkmnId(param.id)
        var id = param.id
        setData(dataPkmn.payload[id - 1])
        setSpecies(dataSpecies.payload[id - 1])
    }, [location]);

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

            if (species.evolution_chain) {
                fetch(species.evolution_chain.url)
                    .then(response => response.json())
                    .then(data => {
                        setEvolChain(data)

                        if (data.chain.evolves_to) {
                            evolutions.set(data.chain.species.name, data.chain.species.url)
                            var evol = data.chain.evolves_to[0]
                            if (evol) {
                                while (evol.evolves_to) {
                                    evolutions.set(evol.species.name, evol.species.url)
                                    if (evol.evolves_to[0] == undefined) { break }
                                    evol = evol.evolves_to[0]
                                }
                            }

                        }
                        if (evolutions.size > 0) {
                            evolutions.forEach((key, value) => {
                                var str = key.replace("https://pokeapi.co/api/v2/pokemon-species/", "")
                                str = str.replace("/", "")
                                evols.push(dataSpecies.payload[str - 1])
                            });
                        }

                        if (evols.length > 0) {
                            if (evols.length == 3) {
                                if (pkmnId == evols[0].id) {
                                    setEvol1(dataPkmn.payload[evols[1].id - 1])
                                    if (evols[2]) {
                                        setEvol2(dataPkmn.payload[evols[2].id - 1])
                                    }


                                } else if (pkmnId == evols[1].id) {
                                    if (evols[2]) {
                                        setEvol1(dataPkmn.payload[evols[2].id - 1])
                                    }
                                }
                            }
                            if (evols.length == 2) {
                                if (pkmnId == evols[0].id) {
                                    setEvol1(dataPkmn.payload[evols[1].id - 1])
                                }
                            }
                        }
                    })
                    .catch(error => console.log(error))
            }

        }
    }, [species])

    useEffect(() => {
        setEvol1Img()
        setEvol2Img()
        if (evol1 != undefined) {
            if (evol1.sprites.other.dream_world.front_default != null) {
                setEvol1Img(evol1.sprites.other.dream_world.front_default)
            } else if (evol1.sprites.other.home.front_default != null) {
                setEvol1Img(evol1.sprites.other.home.front_default)
            }
        }

        if (evol2 != undefined) {
            if (evol2.sprites.other.dream_world.front_default != null) {
                setEvol2Img(evol2.sprites.other.dream_world.front_default)
            } else if (evol2.sprites.other.home.front_default != null) {
                setEvol2Img(evol2.sprites.other.home.front_default)
            }
        }

    }, [(evol1 || evol2) && location]);

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
                            <div class="pkmn_ev_types_atks" style={{ display: 'flex', }}>
                                <img src={img} alt="pkmnImage" className='pkmnPageImage hvr-grow' onClick={() => handleClickPkmn(pkmnId)} />
                                <div className='pkmn_ev_types'>
                                    <div className='evolutions'>
                                        <div>
                                            {evol1Img ? <h4>Evolutions : </h4> : <></>}
                                        </div>
                                        <div className="evolutionsImg">
                                            {evol1Img ? <img src={evol1Img} alt="" className='evols_images hvr-grow' onClick={() => handleClickPkmn(evol1.id)} /> : <div></div>}
                                            {evol2Img ? <img src={evol2Img} alt="" className='evols_images hvr-grow' onClick={() => handleClickPkmn(evol2.id)} /> : <div></div>}
                                        </div>
                                    </div>
                                    <div className="pkmnPagetypes">
                                        {type1 ? <div className='hvr-grow'><Type type={type1} /></div> : <></>}
                                        {type2 ? <div className='hvr-grow'><Type type={type2} /></div> : <></>}
                                    </div>

                                </div>
                                <div id="pkmnAttacks"></div>
                            </div>
                            <div className='pkmnPageCard'>
                                <h4>{genera}</h4>
                            </div>
                            <div className='pkmnInfos'>
                                <div className='pkmnPageDesc'>
                                    {desc ? <><h2>Description</h2><p>{desc}</p></> : <p>No description found</p>}

                                </div>
                                <div className="pkmnStats">
                                    <h4>Stats de base : </h4>
                                    <div className='bodyInfos'>
                                        <div><h5>Taille : </h5><p>{(data.height / 10)}m</p></div>
                                        <div><h5>Poids : </h5><p>{(data.weight / 10)}kg</p></div>
                                    </div>
                                    <div className='statInfos'>
                                        <div>
                                            <div><h5>Pv : </h5><p>{hp}</p></div>
                                            <div><h5>Attaque : </h5><p>{attack}</p></div>
                                            <div><h5>Défense : </h5><p>{defense}</p></div>
                                        </div>
                                        <div>
                                            <div><h5>Attaque-Spé : </h5><p>{specialAtk}</p></div>
                                            <div><h5>Défense-Spé : </h5><p>{specialDef}</p></div>
                                            <div><h5>Vitesse : </h5><p>{speed}</p></div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </> : <></>
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