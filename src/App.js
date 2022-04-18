import React from 'react';
import './App.css';
import Provider from './context/Provider';
import Home from './pages/Home';

function App() {
  return (
    <div>
      <Provider>
        <Home />
      </Provider>
    </div>
  );
}

export default App;
