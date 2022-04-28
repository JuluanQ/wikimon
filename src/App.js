import logo from './logo.svg';
import Pokedex from 'pokedex-promise-v2';
import './App.css';

function App() {

  fetch('https://pokeapi.co/api/v2/pokemon/44/')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error=> console.log(error))
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
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
