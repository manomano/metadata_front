import React from 'react';
import FieldStructure from './components/form'
import { BrowserRouter as Router, Route, Link, Redirect  } from "react-router-dom";
import AuthHelperMethods from './components/AuthHelperMethods'
import SignIn from './components/signIn'

const Auth = new AuthHelperMethods();

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/"   render={()=>(
          Auth.loggedIn()?(<FieldStructure to="/" />):(<Redirect to="/login"/>)
        )}/>

        <Route path="/login" component={SignIn} />
      </Router>

    </div>
  );
}

export default App;
