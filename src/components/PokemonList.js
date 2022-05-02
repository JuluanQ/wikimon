import React from 'react';
import { useEffect, useState } from 'react';
import "../assets/css/pokemonList.css"

const PokemonList = () => {
    useEffect(() => {
        var pkmnList = document.getElementById("PokemonList")
        for (var i = 1; i <= 20; i++) {
            var img = ""
            img = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/" + i + ".svg"
            var pkmnImage = document.createElement("img")
            pkmnImage.src = img
            pkmnImage.className = "pkmnListItemImage"
            pkmnList.appendChild(pkmnImage)
        }
    }, []);

    return (
        <div id='PokemonList'>

        </div>
    );
};

export default PokemonList;;