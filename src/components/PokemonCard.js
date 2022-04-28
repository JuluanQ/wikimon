import React, { useEffect, useState } from 'react';
import '../assets/css/pokemonCard.css'
import Type from './Type';

const PokemonCard = (props) => {

    const [img, setImg] = useState(String);
    const [name, setName] = useState(String);
    const [type1, setType1] = useState(String);
    const [type2, setType2] = useState(String);
    const [dataPkmn, setDataPkmn] = useState(JSON);
    const [dataSpecies, setDataSpecies] = useState(JSON);

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon/' + props.id + '/')
            .then(response => response.json())
            .then(data => {
                setDataPkmn(data)
                if (data.sprites.other.dream_world.front_default != null) {
                    setImg(data.sprites.other.dream_world.front_default)
                } else if (data.sprites.other.home.front_default != null) {
                    setImg(data.sprites.other.home.front_default)
                } else if (data.sprites.other.official - artwork.front_default != null) {
                    setImg(data.sprites.other.official - artwork.front_default)
                }
                setType1(data.types[0].type.name)
                if (data.types.length > 1) {
                    setType2(data.types[1].type.name)
                }
            })
            .catch(error => console.log(error))


        fetch('https://pokeapi.co/api/v2/pokemon-species/' + props.id + '/')
            .then(response => response.json())
            .then(data => {
                setDataSpecies(data)
                data.names.forEach(element => {
                    if (element.language.name == "fr") {
                        setName(element.name)
                    }
                });

            })
            .catch(error => console.log(error))
    }, []);

    return (
        <div>
            <div className="pkmnCard">
                <p className='pkmnName'>{name}</p>
                <img src={img} alt="pkmnImage" className='pkmnImage' />
                <div>
                    <Type type={type1} />
                    <Type type={type2} />
                </div>
            </div>

        </div>
    );
};

export default PokemonCard;

