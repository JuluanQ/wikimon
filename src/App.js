import './App.css';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import 'antd/dist/antd.css'
import PokemonCard from './components/PokemonCard';
import Footer from './components/Footer';
import { Slider } from 'antd';
import PokemonList from './components/PokemonList';

function App() {

  const [img, setImg] = useState(String);
  const [data, setdata] = useState(JSON);
  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon/?limit=60')
      .then(response => response.json())
      .then(data => {
        setdata(data.results)
      })
      .catch(error => console.log(error))
  }, [])



  return (

    <div className="App">
      <Header />
      <div className="Panes">
        <div className="leftPane">
          <PokemonCard id={Math.floor(Math.random() * (898 - 1)) + 1} />
        </div>
        <div className="middlePane">
          <Slider min={1} max={200} defaultValue={20} step={1} dots={true} onChange={(value) => {
            var pkmnList = document.getElementById("PokemonList")
            var nbPrinted = pkmnList.children.length

            if (pkmnList.hasChildNodes) {
              var id_lastChild = parseInt(pkmnList.lastChild.id.replace("list_id_", ""))
              if (value > id_lastChild + 1) {
                console.warn("Should not happen")
                // TODO
                // empecher de changer la value
              }
              if (nbPrinted < value) {
                var img = ""
                img = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/" + value + ".svg"
                var pkmnImage = document.createElement("img")
                pkmnImage.src = img
                pkmnImage.className = "pkmnListItemImage"
                pkmnImage.id = "list_id_" + value
                pkmnList.appendChild(pkmnImage)
              }
              else {
                pkmnList.removeChild(pkmnList.children[nbPrinted - 1])
              }
            }
          }} />
          <PokemonList />
        </div>
        <div className="rightPane">

        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
