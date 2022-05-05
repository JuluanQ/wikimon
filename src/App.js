import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home.js';
import Loading from './pages/Loading.js';
import PokemonPage from './pages/PokemonPage.js';

//REDUX
import { useSelector, useDispatch } from 'react-redux';
import { setDataPkmn } from './dataPkmnSlice.js';

const App = () => {

    //REDUX
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false);
    const [promises, setPromises] = useState([]);
    const [links, setLinks] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        setLoading(true)

        //Initialisation d'un array de Promise 
        links.forEach(item => {
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
                //setData(successes)
                setLoading(false)
                dispatch(setDataPkmn(successes))
            })
    }, [links])

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon/?limit=811')
            .then(response => response.json())
            .then(data => {
                const map = data.results.map(item => item.url)
                setLinks(map)
            })
            .catch(error => console.log(error))
    }, []);

    return (
        <Routes>
            <Route name="home" path="/" element={<Home />} > </Route>
            <Route name="pokemon" path="/pokemon/:id" element={<PokemonPage />}></Route>
            <Route path="/loading" element={<Loading />}></Route>

            {/* path="*" route si url non déclaré */}
            <Route path="*" element={<Home />}> </Route>
        </Routes >
    );
}

export default App;