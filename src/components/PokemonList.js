import React from 'react';
import { useEffect, useState } from 'react';
import "../assets/css/pokemonList.css"
import { LoadingOutlined } from '@ant-design/icons'

const PokemonList = (props) => {

    const [loading, setLoading] = useState(false);
    const [promises, setPromises] = useState([]);
    const [data, setData] = useState([]);

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
        setLoading(true)
        //Initialisation d'un array de Promise 
        props.list.forEach(item => {
            const promise = fetch(item).then(response => { return response.json(); })
            promise.catch((error) => console.error(error))
            promises.push(promise)
        })

        //Lorsque toutes les Promise ont été terminées
        Promise.allSettled(promises)
            .then((results) => {
                const successes = results
                    .filter(x => x.status === "fulfilled")
                    .map(x => x.value)
                const failures = results
                    .filter(x => x.status === "rejected")
                    .map(x => x.reason)
                setData(successes)
                setLoading(false)
            })
    }, [])

    return (
        <div id='PokemonList'>
            <div id="imgsList"></div>
            {loading ? <LoadingOutlined style={{ fontSize: 50, justifySelf: "center", alignSelf: "center" }} /> : <div></div>}
        </div>
    );
};

export default PokemonList;;