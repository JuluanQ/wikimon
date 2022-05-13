import React, { useEffect, useState } from 'react';
import { NavLink, Link, useNavigate, useParams } from 'react-router-dom';
import '../assets/css/pokemonCard.css'
import Type from './Type';

import { useSelector } from 'react-redux';


const TypeDuJour = (props) => {

    const param = useParams()

    const [data, setData] = useState();

    //REDUX
    const dataPkmn = useSelector((state) => state.dataPkmn.pkmn)


    useEffect(() => {
        if (dataPkmn) {
            setData(dataPkmn.payload[props.id - 1])
        }
    }, [dataPkmn && param])

    const types = {
        1 : "steel",
        2 : "fighting",
        3 : "dragon",
        4 : "water",
        5 : "fire",
        6 : "fairy",
        7 : "ice",
        8 : "bug",
        9 : "normal",
        10 : "grass",
        11 : "poison",
        12 : "psychic",
        13 : "rock",
        14 : "ground",
        15 : "ghost",
        16 : "dark",
        17 : "flying",
        18 : "electric"
    };

    return (
        <div className='card' id="noCursor" >
            {
                data ?
                    <div className="pkmnCard" >
                        <p className='titleText'> Type du jour : </p>
                        <div className='types'>
                            {<Type type={types[props.id]} />}
                        </div>
                    </div>
                    :
                    <div></div>
            }

        </div>
    );
};

export default TypeDuJour;


