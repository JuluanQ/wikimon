import './App.css';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import 'antd/dist/antd.css'

function App() {
  
  const [img, setImg] = useState(String);
  const [data, setdata] = useState(JSON);

  useEffect(() =>{
    fetch('https://pokeapi.co/api/v2/pokemon/44/')
    .then(response => response.json())
    .then(data => {
      setdata(data)
      console.log(data)
      setImg(data.sprites.other.dream_world.front_default)
    })
    .catch(error => console.log(error))
  }, [])

  return (

    <div className="App">
      <Header />  
      <header className="App-header">
        <img src={img} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
