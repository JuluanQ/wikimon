import React from 'react';

import '../assets/css/App.css';
import { useEffect, useState } from 'react';
import PokemonCard from '../components/PokemonCard';

const PokemonPage = (props) => {
    return (
        <div>
            <div className="App">
                <Header />
                <div className="Panes">
                    <div className="leftPane">
                        {/* //Pokemon Aléatoire */}
                        <PokemonCard id={Math.floor(Math.random() * (898 - 1)) + 1} />
                    </div>
                    <div className="middlePane">
                        <PokemonCard id={props.id} />
                    </div>
                    <div className="rightPane">

                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default PokemonPage;