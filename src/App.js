import React from 'react';
import './App.css';
import AppFooter from './components/layout/AppFooter';
import AppHeader from './components/layout/AppHeader';
import MembershipProvider from "./components/MembershipProvider";
import FormWrapper from "./components/FormWrapper";

const App = () => {

  return (
    <div className="App">
      <AppHeader />
      <MembershipProvider>
        <FormWrapper />
      </MembershipProvider>
      <AppFooter />
    </div>
  );
}

export default App;
