import React from 'react';
import Navbar from './components/navbar';
import ScrollTrack from './components/scrolltrack';
import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <ScrollTrack />
      </main>
    </>
  );
}

export default App;