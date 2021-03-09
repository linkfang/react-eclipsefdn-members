import React from 'react';
import './App.css';
import AppFooter from './components/layout/AppFooter';
import AppHeader from './components/layout/AppHeader';
import MembershipProvider from "./Context/MembershipProvider";
import FormWrapper from "./components/FormPreprocess/FormWrapper";

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
