import React, { useState } from "react";
import styled from "styled-components";
import UserKit from "../data/UserKit";
import { useHistory } from "react-router-dom";

const InputField = styled.input`
  margin-bottom: 5px;
  margin-right: 8px;
  padding: 5px;
  border: solid darkslategray 1px;
  border-radius: 5px;
`;

const SimpleButton = styled.button`
  border: solid darkslategray 1px;
  border-radius: 5px;
  font-size: 14px;
  padding: 3px;
`;

const Message = styled.p`
  font-size: 24px;
  font-weight: bold;
  margin-top: 1em;
  margin-bottom: 1em;
`;

const MessageSmall = styled(Message)`
  font-size: 16px;
  font-weight: normal;
`;

export default function LoginPage() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const userKit = new UserKit();
  const history = useHistory();
  const searchstring = history.location.search;
  const urlParameters = new URLSearchParams(searchstring);

  const [uid, setUid] = useState(urlParameters.get("uid"));
  const [token, setToken] = useState(urlParameters.get("token"));

  function handleActivateUser() {
    userKit.activateUser(uid, token).then(() => {
      setUid(null);
      setToken(null);
      history.push("/login");
    });
  }

  function handleLogin() {
    userKit
      .login(loginEmail, loginPassword)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        userKit.setToken(data.token);
        history.push("/home");
      });
  }

  return (
    <div>
      {uid && token ? (
        <div>
          <MessageSmall>Click the button to activate your account</MessageSmall>
          <SimpleButton onClick={handleActivateUser}>
            Activate user
          </SimpleButton>
        </div>
      ) : (
        <div>
          <Message>Enter email and password for login</Message>
          <InputField
            placeholder="email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />
          <InputField
            placeholder="password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <SimpleButton onClick={handleLogin}>Login</SimpleButton>
        </div>
      )}
    </div>
  );
}
