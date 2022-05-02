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

          <Slider min={0} max={200} defaultValue={50} step={1} onChange={(value) => {
            var pkmnList = document.getElementById("imgsDiv")
            if (pkmnList.hasChildNodes()) {
              var children = pkmnList.childNodes
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

          {data ?
            <PokemonList list={data} nb={50} />
            : <div></div>}
        </div>
        <div className="rightPane">

        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
