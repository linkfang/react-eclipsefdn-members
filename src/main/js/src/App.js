import React, { useState } from 'react';
import './App.css';
import AppFooter from './components/layout/AppFooter';
import AppHeader from './components/layout/AppHeader';
import FormWrapper from "./components/FormPreprocess/FormWrapper";
import MembershipContext from "./Context/MembershipContext";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentFormId, setCurrentFormId] = useState("");
  return (
    <div className="App">
      <AppHeader />
      <MembershipContext.Provider value={{
            currentUser,
            setCurrentUser: (val) => setCurrentUser(val),
            currentFormId,
            setCurrentFormId: (val) => setCurrentFormId(val)
        }}>
        <FormWrapper />
      </MembershipContext.Provider>
      <AppFooter />
    </div>
  );
}

export default App;
