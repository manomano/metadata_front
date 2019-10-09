import React from 'react';
import FormWrapperWithContext from './components/FormWrapperWithContext'
import { BrowserRouter as Router, Route, Link, Redirect  } from "react-router-dom";
import AuthHelperMethods from './components/AuthHelperMethods'
import SignIn from './components/signIn'
console.log("react version is: ",React.version);
const Auth = new AuthHelperMethods();

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/"   render={()=>(
          Auth.loggedIn()?(<FormWrapperWithContext to="/" />):(<Redirect to="/login"/>)
        )}/>

        <Route path="/login" component={SignIn} />
      </Router>

    </div>
  );
}

export default App;
