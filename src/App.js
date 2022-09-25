import React from 'react';
import Provider from './provider/Provider';
import Table from './components/Table';
import './App.css';

function App() {
  return (
    <Provider>
      <div className="App">
        <Table />
      </div>
    </Provider>
  );
}

export default App;
