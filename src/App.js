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
            console.log(value)
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
