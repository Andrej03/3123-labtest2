import React from 'react';
import Weather from './components/weather';

function App() {
  return (
    <div>
      <header>
        <h1 style={{ textAlign: 'center' }}>Weather Forecast App</h1>
      </header>
      <main>
        <Weather />
      </main>
    </div>
  );
}

export default App;
