import React from 'react';
import { useEffect, useState } from 'react';
import "../assets/css/pokemonList.css"
import { LoadingOutlined } from '@ant-design/icons'
import { NavLink } from 'react-router-dom';


import { useSelector } from 'react-redux';

const PokemonList = (props) => {

    const [data, setData] = useState([]);

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

                var navlink = document.createElement("a")
                navlink.setAttribute("href", "/pokemon/" + data.id)
                if (data.id > props.nb) {
                    navlink.style.visibility = 'hidden'
                    navlink.style.height = '0'
                    navlink.style.width = '0'
                } else {
                    navlink.style.visibility = 'visible'
                    navlink.style.height = '7em'
                    navlink.style.width = '7em'
                }

                imgsList.appendChild(navlink)
                navlink.appendChild(imgElement)
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