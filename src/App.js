import React from 'react';
import './App.css';
import AppFooter from './components/layout/AppFooter';
import AppHeader from './components/layout/AppHeader';

function App() {
  return (
    <div className="App">
      <AppHeader />
      <div className="container">
        <h1>react-eclipsefdn-members</h1>
      </div>

      <AppFooter />
    </div>
  );
}

export default App;
