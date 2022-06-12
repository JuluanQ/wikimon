import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home.js';
import Loading from './pages/Loading.js';
import PokemonPage from './pages/PokemonPage.js';

//REDUX
import { useDispatch } from 'react-redux';
import { setDataPkmn, setDataSpecies, setLinksPkmn, setSpeciesNameId } from './dataPkmnSlice.js';
import TypePage from './pages/TypePage.js';

const App = () => {

    const dispatch = useDispatch()

    const [done, setDone] = useState(undefined);
    const [promisesPkmn, setPromisesPkmn] = useState([]);
    const [promisesSpecies, setPromisesSpecies] = useState([]);
    const [links, setLinks] = useState([]);
    const [pkmnData, setPkmnData] = useState(undefined);
    const [speciesData, setSpeciesData] = useState(undefined);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon/?limit=811')
            .then(response => response.json())
            .then(data => {
                const map = data.results.map(item => item.url)
                setLinks(map)
                if (links) {
                    setProgress(20)
                }
            })
            .catch(error => console.log(error))
    }, []);

    useEffect(() => {

        //Initialisation d'un array de Promise 
        links.forEach(item => {
            const promise = fetch(item).then(response => { return response.json(); })
            promise.catch((error) => console.error(error))
            promisesPkmn.push(promise)
            setProgress(30)
        })

        //Lorsque toutes les Promise ont été terminées
        Promise.allSettled(promisesPkmn)
            .then((results) => {
                const successes = results
                    .filter(x => x.status === "fulfilled")
                    .map(x => x.value)
                setPkmnData(successes)
                if (pkmnData) {
                    setProgress(65)
                }
                dispatch(setDataPkmn(successes))
            })
    }, [links])

    useEffect(() => {
        if (pkmnData) {
            pkmnData.forEach(item => {
                const promise = fetch(item.species.url).then(response => { return response.json(); })
                promise.catch((error) => console.error(error))
                promisesSpecies.push(promise)
            })

            Promise.allSettled(promisesSpecies)
                .then((results) => {
                    const successes = results
                        .filter(x => x.status === "fulfilled")
                        .map(x => x.value)
                    setSpeciesData(successes)
                    var tmp = new Map()
                    successes.forEach(item => {
                        item.names.forEach(element => {
                            if (element.language.name == "fr") {
                                tmp.set(item.id, element.name)
                            }
                        })
                    })
                    if (speciesData) {

                        dispatch(setDataSpecies(successes))
                        dispatch(setSpeciesNameId(tmp))
                        setDone(true)
                    }

                })
        }
    }, [pkmnData]);

    return (
        <>
            {
                done ?

                    <Routes>
                        <Route path="/loading" element={<Loading progress={progress} />}></Route>
                        <Route name="home" path="/" element={<Home />} > </Route>
                        <Route name="pokemon" path="/pokemon/:id" element={<PokemonPage />}></Route>
                        <Route name="type" path="/type/:id" element={<TypePage />}></Route>

                        <Route path="*" element={<Home />}> </Route>
                    </Routes >
                    :
                    <Loading progress={progress} />
            }
        </>

    );
}

export default App;