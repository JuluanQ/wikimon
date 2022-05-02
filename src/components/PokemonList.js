import React from 'react';
import { useEffect, useState } from 'react';
import PokemonCard from './PokemonCard';
import "../assets/css/pokemonList.css"

const PokemonList = (props) => {

    const [data, setdata] = useState();
    useEffect(() => {
        if (props.list !== undefined) {
            setdata(Array.from(props.list))

            var imgsDiv = document.createElement("div")
            imgsDiv.setAttribute("id", "imgsDiv")
            for (var i = 1; i <= 811; i++) {
                var img = ""
                img = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/" + i + ".svg"
                var pkmnImage = document.createElement("img")
                pkmnImage.src = img
                pkmnImage.className = "pkmnListItemImage"
                imgsDiv.appendChild(pkmnImage)
                if (i > props.nb) {
                    pkmnImage.style.visibility = 'hidden'
                    pkmnImage.style.width = '0em'
                    pkmnImage.style.height = '0em'
                }
            }
            var pkmnList = document.getElementById("PokemonList")
            pkmnList.appendChild(imgsDiv)
        }
    }, []);

    return (
        <div id='PokemonList'>

        </div>
    );
};

export default PokemonList;