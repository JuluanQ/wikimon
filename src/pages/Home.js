import '../assets/css/App.css';
import { useEffect, useState } from 'react';

import Header from '../components/Header';
import PokemonCard from '../components/PokemonCard';
import Footer from '../components/Footer';
import PokemonList from '../components/PokemonList';

import 'antd/dist/antd.css'
import { Slider, notification } from 'antd';

import { useSelector } from 'react-redux';


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
  const dataPkmn = useSelector((state) => state.dataPkmn.pkmn)
  const dataSpecies = useSelector((state) => state.dataPkmn.species)

  useEffect(() => {
    openNotification('bottomLeft')
  }, [])

  return (
    <div className="App">
      <Header nav={props.nav} />
      <div className="Panes">
        <div className="leftPane">
          {/* //Pokemon Aléatoire */}
          {dataPkmn && dataSpecies ? <PokemonCard id={Math.floor(Math.random() * (898 - 1)) + 1} /> : <div></div>}
        </div>
        <div className="middlePane">

          {/* Définition du slider permettant d'afficher plus ou moins de pokemon */}
          <Slider tooltipVisible tooltipPlacement='top' min={1} max={811} defaultValue={60} step={1} onChange={(value) => {
            var pkmnList = document.getElementById("imgsList")
            var children = pkmnList.childNodes
            if (pkmnList.hasChildNodes) {

              //On parcours les éléments de la liste
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

          {dataPkmn ? < PokemonList nb={60} /> : <div></div>}
        </div>
        <div className="rightPane">

        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
