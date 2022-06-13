import React from 'react';
import { useEffect, useState } from 'react';
import "../assets/css/pokemonList.css"
import { useNavigate, useLocation } from 'react-router-dom';

const PokemonList = (props) => {

    const [data, setData] = useState();
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        setData(props.data)
    }, [location]);

    useEffect(() => {
        //On parcours la data reçue des promesses pour construire la liste de Pokemon

        const pkmnList = document.getElementById("PokemonList")
        const imgsList = document.getElementById("imgsList")
        if (data) {
            data.forEach(data => {
                var imgElement = document.createElement("img")
                if (data.sprites.other.dream_world.front_default) {
                    imgElement.src = data.sprites.other.dream_world.front_default
                } else if (data.sprites.other.home.front_default) {
                    imgElement.src = data.sprites.other.home.front_default
                }
                imgElement.alt = data.name;
                imgElement.className = "pkmnListItemImage hvr-grow"
                imgElement.style.cursor = 'pointer'

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

    return (
        <div id='PokemonList'>
            <div id="imgsList"></div>
        </div>
    );
};



export default PokemonList;;