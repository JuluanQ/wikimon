import React, { useEffect, useState } from 'react';
import { NavLink, Link, useNavigate, useParams, useLocation } from 'react-router-dom';
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

    const location = useLocation()

    //REDUX
    const dataPkmn = useSelector((state) => state.dataPkmn.pkmn)
    const dataSpecies = useSelector((state) => state.dataPkmn.species)

    const navigate = useNavigate();

    const handleClick = () => {
        if (pkmnId) {
            setType1(undefined)
            setType2(undefined)
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

    useEffect(() => {
        setType1(undefined)
        setType2(undefined)
    }, [location]);

    return (
        <div className='card' >
            {
                data ?
                    <div className="pkmnCard" >
                        <p className='pkmnName'>{name}</p>
                        <img src={img} alt="pkmnImage" className='pkmnImage hvr-grow' onClick={handleClick} />
                        <div className='types'>
                            {type1 ?
                                <Type type={type1} />
                                : <></>}
                            {type2 ?
                                <Type type={type2} />
                                : <></>}
                        </div>
                    </div>
                    :
                    <div></div>
            }

        </div>
    );
};

export default PokemonCard;


