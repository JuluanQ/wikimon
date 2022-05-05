import '../assets/css/App.css';
import { useEffect, useState } from 'react';

import Header from '../components/Header';
import PokemonCard from '../components/PokemonCard';
import Footer from '../components/Footer';
import PokemonList from '../components/PokemonList';
import App from '../App';

import 'antd/dist/antd.css'
import { Slider, notification } from 'antd';

import { useSelector, useDispatch } from 'react-redux';

function Home(props) {
  const openNotification = placement => {
    notification.info({
      icon: <div></div>,
      duration: 0,
      message: <h3 style={{ color: "#aaaaaa", margin: 0, padding: 0, }}>User CheatSheet</h3>,
      description:
        <div style={{ margin: 0, padding: 0 }}>
          <p style={{ margin: 0, padding: 0, }}>Type p/... in search bar to search for a Pokemon.</p>
          <p style={{ margin: 0, padding: 0, }}>Type t/... in search bar to search for a Type.</p>
          <p style={{ margin: 0, padding: 0, }}>Type m/... in search bar to search for a Move.</p>
          <p style={{ margin: 0, padding: 0, }}>Type i/... in search bar to search for a Item.</p>
          <p style={{ margin: 0, padding: 0, }}>Type b/... in search bar to search for a Berry.</p>
          <p style={{ margin: 0, padding: 0, }}>Type g/... in search bar to search for a Game.</p>
        </div>
      ,
      placement,
      style: {
        paddingLeft: 0,
        backgroundColor: "#242424",
        color: "#aaaaaa",
        border: "1px solid #e4e4e4",
      }

    });
  }

  const [links, setLinks] = useState([]);
  const [randomId, setRandomId] = useState(null);

  //REDUX
  const dataPkmn = useSelector((state) => state.dataPkmn.value)


  useEffect(() => {
    setRandomId(Math.floor(Math.random() * (898 - 1)) + 1)



    openNotification('bottomLeft')
    fetch('https://pokeapi.co/api/v2/pokemon/?limit=811')
      .then(response => response.json())
      .then(data => {
        const map = data.results.map(item => item.url)
        setLinks(map)
      })
      .catch(error => console.log(error))
  }, [])



  return (
    <div className="App">
      <Header nav={props.nav} />

      {
        dataPkmn ?
          console.log(dataPkmn) :
          console.log("fail")
      }

      <div className="Panes">
        <div className="leftPane">
          {/* //Pokemon Aléatoire */}
          {randomId ? <PokemonCard id={randomId} /> : <div></div>}
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
                const child = element.childNodes[0]

                if (i < value) {
                  element.style.visibility = 'visible'
                  element.style.width = '7em'
                  element.style.height = '7em'
                  child.style.visibility = 'visible'
                  child.style.width = '7em'
                  child.style.height = '7em'
                } else {
                  element.style.visibility = 'hidden'
                  element.style.width = '0em'
                  element.style.height = '0em'
                  child.style.visibility = 'hidden'
                  child.style.width = '0em'
                  child.style.height = '0em'
                }
              }
            }
          }} />


          {links.length > 0 ? < PokemonList list={links} nb={60} /> : <div></div>}
        </div>
        <div className="rightPane">

        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
