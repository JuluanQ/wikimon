import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../assets/css/pokemonCard.css'
import Type from './Type';

const TypeDuJour = (props) => {

    const param = useParams()

    function getUnixDate(date = new Date()) {
        const DAY = 1000 * 60 * 60 * 24;
        return Math.floor(date.getTime() / DAY);
    }

    const actualDay = getUnixDate();

    function getTypeId() {
        return actualDay % 18 + 1;
    }

    const types = {
        1: "steel",
        2: "fighting",
        3: "dragon",
        4: "water",
        5: "fire",
        6: "fairy",
        7: "ice",
        8: "bug",
        9: "normal",
        10: "grass",
        11: "poison",
        12: "psychic",
        13: "rock",
        14: "ground",
        15: "ghost",
        16: "dark",
        17: "flying",
        18: "electric"
    };

    return (
        <div className='card' id="noCursor" >

            <div className="pkmnCard" >
                <p className='titleText'> Type du jour : </p>
                <div className='types'>
                    <Type type={types[getTypeId()]} />
                </div>
            </div>
        </div>
    );
};

export default TypeDuJour;


