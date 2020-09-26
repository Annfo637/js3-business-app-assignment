import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import CheckEmailPage from "./pages/CheckEmailPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { CustomerContext } from "./contexts/CustomerContext";

function App() {
  const [customerList, setCustomerList] = useState(null);

  return (
    <div>
      <h1>Business Project</h1>
      <CustomerContext.Provider value={{ customerList, setCustomerList }}>
        <Switch>
          <Route path="/checkemail">
            <CheckEmailPage />
          </Route>
          <Route path="/home">
            <div>
              <HomePage />
            </div>
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/">
            <RegisterPage />
          </Route>
        </Switch>
      </CustomerContext.Provider>
    </div>
  );
}
export default App;
/*
***email: nackademin@willandskill.se***
email: mian@willandskill.se
password: js-fend-19
*/
