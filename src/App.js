import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";
import CheckEmailPage from "./pages/CheckEmailPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CustomerPage from "./pages/CustomerPage";
import { CustomerContext } from "./contexts/CustomerContext";
import { UserContext } from "./contexts/UserContext";

const Heading = styled.h1`
  font-size: 2.5rem;
  color: black;
`;

const MainStyle = styled.div`
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  background-color: lightsteelblue;
  padding: 20px;
  border-radius: 5px;
`;

function App() {
  const [customerList, setCustomerList] = useState(null);
  const [user, setUser] = useState(null);

  return (
    <MainStyle>
      <Heading>Business Project</Heading>
      <UserContext.Provider value={{ user, setUser }}>
        <CustomerContext.Provider value={{ customerList, setCustomerList }}>
          <Switch>
            <Route
              path="/customer/:id"
              render={(props) => {
                return <CustomerPage {...props} />;
              }}
            ></Route>
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
      </UserContext.Provider>
    </MainStyle>
  );
}
export default App;
