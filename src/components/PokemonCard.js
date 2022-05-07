import React, { useEffect, useState } from 'react';
import { NavLink, Link, useNavigate, useParams } from 'react-router-dom';
import '../assets/css/pokemonCard.css'
import Type from './Type';

import { useSelector } from 'react-redux';


const PokemonCard = (props) => {

    const param = useParams()

    const [pkmnId, setPkmnId] = useState();
    const [img, setImg] = useState(String);
    const [name, setName] = useState(String);
    const [type1, setType1] = useState("");
    const [type2, setType2] = useState("");
    const [data, setData] = useState();
    const [species, setSpecies] = useState();

    //REDUX
    const dataPkmn = useSelector((state) => state.dataPkmn.pkmn)
    const dataSpecies = useSelector((state) => state.dataPkmn.species)

    const navigate = useNavigate();

    const handleClick = () => {
        if (pkmnId) {
            setType1("")
            setType2("")
            navigate("/pokemon/" + pkmnId);

        }
    }

    useEffect(() => {
        if (data && species) {
            if (data.sprites.other.dream_world.front_default != null) {
                setImg(data.sprites.other.dream_world.front_default)
            } else if (data.sprites.other.home.front_default != null) {
                setImg(data.sprites.other.home.front_default)
            }
            setType1(data.types[0].type.name)
            if (data.types.length > 1) {
                setType2(data.types[1].type.name)
            }
            setPkmnId(data.id)

            species.names.forEach(element => {
                if (element.language.name == "fr") {
                    setName(element.name)
                }
            });
        }
    }, [data && species]);

    useEffect(() => {
        if (dataPkmn) {
            setData(dataPkmn.payload[props.id - 1])
        }
    }, [dataPkmn && param])

    useEffect(() => {
        if (dataSpecies) {
            setSpecies(dataSpecies.payload[props.id - 1])
        }
    }, [dataSpecies && param]);

    return (
        <div className='card' >
            {
                data ?
                    <div className="pkmnCard" onClick={handleClick}>
                        <p className='pkmnName'>{name}</p>
                        <img src={img} alt="pkmnImage" className='pkmnImage' />
                        <div className='types'>
                            {type1 ?
                                <Type type={type1} />
                                : <div className='emptyType'></div>}
                            {type2 ?
                                <Type type={type2} />
                                : <div className='emptyType'></div>}
                        </div>
                    </div>
                    :
                    <div></div>
            }

        </div>
    );
};

export default PokemonCard;


