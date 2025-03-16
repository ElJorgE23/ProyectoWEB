import './App.css';
import Componente from './Componente';
import './Componente.css';

function App() {
  return (
    <div className="App">
      <header >
        <img src={logo} className="App-logo" alt="logo" />
        <Componente></Componente>
      </header>
    </div>
  );
}

export default App;
