import React from 'react';
import { useEffect, useState } from 'react';
import "../assets/css/pokemonList.css"
import { LoadingOutlined } from '@ant-design/icons'
import { NavLink, useNavigate } from 'react-router-dom';


import { useSelector } from 'react-redux';

const PokemonList = (props) => {

    const [data, setData] = useState([]);
    const navigate = useNavigate()



    //REDUX
    const dataPkmn = useSelector((state) => state.dataPkmn.pkmn)



    useEffect(() => {
        //On parcours la data reçue des promesses pour construire la liste de Pokemon
        if (data !== []) {
            const pkmnList = document.getElementById("PokemonList")
            const imgsList = document.getElementById("imgsList")

            data.forEach(data => {
                var imgElement = document.createElement("img")
                if (data.sprites.other.dream_world.front_default) {
                    imgElement.src = data.sprites.other.dream_world.front_default
                } else if (data.sprites.other.home.front_default) {
                    imgElement.src = data.sprites.other.home.front_default
                }
                imgElement.alt = data.name;
                imgElement.className = "pkmnListItemImage"

                var id = data.id
                const handleClick = () => {
                    navigate("/pokemon/" + id);
                }
                imgElement.addEventListener('click', () => {
                    handleClick()
                })

                if (data.id > props.nb) {
                    imgElement.style.visibility = 'hidden'
                    imgElement.style.height = '0'
                    imgElement.style.width = '0'

                } else {
                    imgElement.style.visibility = 'visible'
                    imgElement.style.height = '7em'
                    imgElement.style.width = '7em'
                }

                imgsList.appendChild(imgElement)
            })
            pkmnList.appendChild(imgsList)
        }
    }, [data]);

    useEffect(() => {
        if (dataPkmn.payload != []) {
            setData(dataPkmn.payload)
        }
    }, [dataPkmn])

    return (
        <div id='PokemonList'>
            <div id="imgsList"></div>
        </div>
    );
};



export default PokemonList;;