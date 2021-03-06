import '../assets/css/App.css';
import { useEffect, useState } from 'react';

import Header from '../components/Header';
import PokemonCard from '../components/PokemonCard';
import Footer from '../components/Footer';
import PokemonList from '../components/PokemonList';
import PokemonDuJour from '../components/PokemonDuJour';
import TypeDuJour from '../components/TypeDuJour';

import 'antd/dist/antd.css'
import { Slider, notification } from 'antd';

import { useSelector } from 'react-redux';

// Pokemon et type du jour

function getUnixDate(date = new Date()) {
  const DAY = 1000 * 60 * 60 * 24;
  return Math.floor(date.getTime() / DAY);
}

const actualDay = getUnixDate();

function getTypeId() {
  return actualDay % 18 + 1;
}

function getPokemonId() {
  return actualDay % 811 + 1;
}

// 

function Home(props) {
  const openNotification = placement => {
    notification.config({
      maxCount: 1,
      duration: 0,
      placement,
    }),
      notification.info({
        icon: <div></div>,
        message: <h5 style={{ color: "#aaaaaa", margin: 0, padding: 0, }}>User CheatSheet</h5>,
        description:
          <div style={{ margin: 0, padding: 0 }}>
            <p style={{ margin: 0, padding: 0, }}>p/... to search for a Pokemon.</p>
            <p style={{ margin: 0, padding: 0, }}>t/... to search for a Type.</p>
            <p style={{ margin: 0, padding: 0, }}>m/... to search for a Move.</p>
            <p style={{ margin: 0, padding: 0, }}>i/... to search for a Item.</p>
          </div>
        ,

        style: {
          margin: 0,
          paddingLeft: 0,
          width: "100%",
          backgroundColor: "#242424",
          color: "#aaaaaa",
          border: "1px solid #e4e4e4",
        }

      });
  }

  //REDUX
  const dataPkmn = useSelector((state) => state.dataPkmn.pkmn.payload)
  const dataSpecies = useSelector((state) => state.dataPkmn.species)

  useEffect(() => {
    openNotification('bottomLeft')
    console.log(dataPkmn.payload)
  }, [])

  return (
    <div className="App">
      <Header />
      <div className="Panes">
        <div className="leftPane">
          {/* //Pokemon Al??atoire */}
          {dataPkmn && dataSpecies ? <PokemonCard id={Math.floor(Math.random() * (811 - 1)) + 1} /> : <div></div>}
        </div>
        <div className="middlePane">

          {/* D??finition du slider permettant d'afficher plus ou moins de pokemon */}
          <Slider tooltipPlacement='top' min={1} max={811} defaultValue={60} step={1} onChange={(value) => {
            var pkmnList = document.getElementById("imgsList")
            var children = pkmnList.childNodes
            if (pkmnList.hasChildNodes) {

              //On parcours les ??l??ments de la liste
              for (let i = 0; i < children.length; i++) {
                const element = children[i];

                if (i < value) {
                  element.style.visibility = 'visible'
                  element.style.width = '7em'
                  element.style.height = '7em'
                } else {
                  element.style.visibility = 'hidden'
                  element.style.width = '0em'
                  element.style.height = '0em'
                }
              }
            }
          }} />

          {dataPkmn ? < PokemonList nb={60} data={dataPkmn} /> : <div></div>}
        </div>
        <div className="rightPane">
          {/* On veut afficher un Pokemon du jour au hasard pendant 24h */}
          {dataPkmn && dataSpecies ? <PokemonDuJour id={getPokemonId()} /> : <div></div>}

          {/* On veut afficher un type du jour pendant 24h */}
          {<TypeDuJour id={getTypeId()} />}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
