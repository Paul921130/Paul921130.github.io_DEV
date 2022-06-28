import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.scss';
import PokemonDetail from '../PokeMom';
import FindBus from '../FindBus';
import Header from '../../components/Header';

function App() {
    const render_Home = () => {
        return (
            <div>
                <h1>Home</h1>
            </div>
        );
    };
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="/" element={render_Home()} />
                <Route path="Pokemon" element={<PokemonDetail />} />
                <Route path="findbus" element={<FindBus />} />
            </Routes>
        </div>
    );
}

export default App;
