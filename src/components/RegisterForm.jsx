import React, { useState } from "react";
import styled from "styled-components";
import UserKit from "../data/UserKit";
import { useHistory } from "react-router-dom";

const Label = styled.label`
  margin-right: 5px;
  margin-bottom: 5px;
`;
const InputField = styled.input`
  margin-bottom: 5px;
  border: solid darkslategray 1px;
  border-radius: 5px;
`;

const SimpleButton = styled.button`
  border: solid darkslategray 1px;
  border-radius: 5px;
  font-size: 14px;
  padding: 3px;
`;

export default function RegisterForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [organisationName, setOrganisationName] = useState("");
  const [organisationKind, setOrganisationKind] = useState("");

  const userKit = new UserKit();
  const history = useHistory();

  const inputObjects = [
    ["First Name", firstName, setFirstName],
    ["Last Name", lastName, setLastName],
    ["Email", email, setEmail],
    ["Password", password, setPassword],
    ["Organisation Name", organisationName, setOrganisationName],
    ["Organisation Kind (0,1 ,2)", organisationKind, setOrganisationKind],
  ];

  function handleRegister() {
    userKit.register(
      firstName,
      lastName,
      email,
      password,
      organisationName,
      organisationKind
    );
    history.push("/checkemail");
  }

  function renderInput(index, placeholder, stateVariable, stateSetVariable) {
    return (
      <div key={index}>
        <Label>{placeholder}: </Label>
        <InputField
          placeholder={placeholder}
          value={stateVariable}
          onChange={(e) => stateSetVariable(e.target.value)}
        />
      </div>
    );
  }

  return (
    <>
      {inputObjects.map((inputItem, index) => {
        return renderInput(index, inputItem[0], inputItem[1], inputItem[2]);
      })}
      <SimpleButton onClick={handleRegister}>Register</SimpleButton>
    </>
  );
}
