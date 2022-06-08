import React, { useState, useEffect } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';

import '../assets/css/App.css';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { renderIntoDocument } from 'react-dom/test-utils';

const MovePage = (props) => {
    const param = useParams()
    const location = useLocation();
    const navigate = useNavigate();
    const [data, setData] = useState();

    //Moves
    const [moves, setMoves] = useState([]);
    const [movesData, setMovesData] = useState([]);



    const handleClickMove = (id) => {
        if (id) {
            navigate("/move/" + id);
        }
    }

    useEffect(() => {
        if (moves.length > 0) {
            var container = document.getElementById('pkmnAttacks')
            container.innerHTML = ""
            moves.forEach(item => {
                fetch(item.move.url)
                    .then(response => response.json())
                    .then(data => {

                        var element = document.createElement('div')
                        element.setAttribute("class", "move hvr-grow")
                        var nameP = document.createElement('p')
                        data.names.forEach(nameElement => {
                            if (nameElement.language.name == "fr") {
                                nameP.textContent = nameElement.name

                            }
                        })
                     

                        var ppTxt = document.createElement('p')
                        ppTxt.textContent = "Pp : " + data.pp

                        var powerTxt = document.createElement('p')
                        powerTxt.textContent = "Puissance : " + data.power

                        var accuracyTxt = document.createElement('p')
                        accuracyTxt.textContent = "Précision : " + data.accuracy

                        var divContainer = document.createElement("div")
                        divContainer.appendChild(ppTxt)
                        //divContainer.appendChild(powerTxt)
                        //divContainer.appendChild(accuracyTxt)
                        divContainer.appendChild(typeImg)
                        element.appendChild(nameImg)
                        element.appendChild(divContainer)
                        element.addEventListener('click', () => { handleClickMove(data.id) })
                        container.appendChild(element)

                    })
                    .catch(error => console.log(error))
            })
        }
    }, [moves]);

    return (
        <div className="App">
            <Header />
            <div className="Panes">
                <div className="leftPane">
                    {/* //Pokemon Aléatoire */}
                    <PokemonCard id={Math.floor(Math.random() * (811 - 1)) + 1} />
                </div>
                <div className="rightPane">

</div>
</div>
<Footer />
</div>
);
};

export default MovePage;