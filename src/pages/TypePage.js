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

const TypePage = () => {

    const param = useParams()
    const location = useLocation()
    const [typeData, setTypeData] = useState();
    const [data, setData] = useState();
    const [species, setSpecies] = useState();

    const [typeName, setTypeName] = useState();
    const [pokemons, setPokemons] = useState();
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

            // let keyIndex = 1
            // if (double_damage_from) {
            //     double_damage_from.forEach(item => {
            //         source.push(
            //             {
            //                 key: keyIndex,
            //                 doubleDmgFrom: <Type type={item.name} />
            //             }
            //         )
            //         keyIndex++
            //     })
            // }

            // if (double_damage_to) {
            //     double_damage_to.forEach(item => {
            //         source.push(
            //             {
            //                 key: keyIndex,
            //                 doubleDmgTo: <Type type={item.name} />
            //             }
            //         )
            //         keyIndex++
            //     })
            // }

            // if (half_damage_from) {
            //     half_damage_from.forEach(item => {
            //         source.push(
            //             {
            //                 key: keyIndex,
            //                 halfDmgFrom: <Type type={item.name} />
            //             }
            //         )
            //         keyIndex++
            //     })
            // }

            // if (half_damage_to) {
            //     half_damage_to.forEach(item => {
            //         source.push(
            //             {
            //                 key: keyIndex,
            //                 halfDmgTo: <Type type={item.name} />
            //             }
            //         )
            //         keyIndex++
            //     })
            // }

            // if (no_damage_from) {
            //     no_damage_from.forEach(item => {
            //         source.push(
            //             {
            //                 key: keyIndex,
            //                 noDmgFrom: <Type type={item.name} />
            //             }
            //         )
            //         keyIndex++
            //     })
            // }

            // if (no_damage_to) {
            //     no_damage_to.forEach(item => {
            //         source.push(
            //             {
            //                 key: keyIndex,
            //                 noDmgTo: <Type type={item.name} />
            //             }
            //         )
            //         keyIndex++
            //     })
            // }
        }
    }, [typeData]);

    //Set all data
    useEffect(() => {
        var id = param.id
        setData(dataPkmn.payload[id - 1])
        setSpecies(dataSpecies.payload[id - 1])
    }, [location]);

    return (
        <div className="App">
            <Header />
            <div className="Panes">
                <div className="leftPane">
                    {/* //Pokemon Aléatoire */}
                    {dataPkmn && dataSpecies ? <PokemonCard id={Math.floor(Math.random() * (898 - 1)) + 1} /> : <div></div>}
                </div>
                <div className="middlePane">
                    {typeData ? <h1>{typeData.name.toUpperCase()}</h1> : <></>}
                    {typeData ? <Type type={typeData.name} /> : <></>}
                    <table>
                        <thead>
                            <tr>
                                <th colspan="1">X2</th>
                                <th colspan="1">X0.5</th>
                                <th colspan="1">X0</th>
                                <th colspan="1">X2</th>
                                <th colspan="1">X0.5</th>
                                <th colspan="1">X0</th>
                            </tr>
                        </thead>
                        <tbody id='tBodyData'>

                        </tbody>
                    </table>
                </div>
                <div className="rightPane">

                </div>
            </div>
            <Footer />
        </div>
    );
};

export default TypePage;