import React, { useState, useContext } from "react";
import styled from "styled-components";
import CustomerKit from "../data/CustomerKit";
import { CustomerContext } from "../contexts/CustomerContext";

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
  margin-top: 10px;
  border: solid darkslategray 1px;
  border-radius: 5px;
  font-size: 14px;
  padding: 3px;
`;

const ROOT_URL = "https://frebi.willandskill.eu/";
const token = localStorage.getItem("BUSINESS_TOKEN");

export default function CustomerForm() {
  const [name, setName] = useState("");
  const [organisationNr, setOrganisationNr] = useState("");
  const [vatNr, setVatNr] = useState("");
  const [reference, setReference] = useState("");
  const [paymentTerm, setPaymentTerm] = useState("");
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const customerKit = new CustomerKit();
  const { customerList, setCustomerList } = useContext(CustomerContext);

  //Array för kundformulärets fält
  const inputCustomer = [
    ["Company Name", name, setName],
    ["Organisation Number", organisationNr, setOrganisationNr],
    ["VAT Number", vatNr, setVatNr],
    ["Reference", reference, setReference],
    ["Payment Term", paymentTerm, setPaymentTerm],
    ["Website", website, setWebsite],
    ["Email", email, setEmail],
    ["Phone Number", phoneNumber, setPhoneNumber],
  ];

  function renderCustomerInput(
    index,
    placeholder,
    stateVariable,
    stateSetVariable
  ) {
    return (
      <div key={index}>
        <Label>{placeholder}</Label>
        <InputField
          placeholder={placeholder}
          value={stateVariable}
          onChange={(e) => stateSetVariable(e.target.value)}
        />
      </div>
    );
  }

  function resetInput() {
    setName("");
    setOrganisationNr("");
    setVatNr("");
    setReference("");
    setPaymentTerm("");
    setWebsite("");
    setEmail("");
    setPhoneNumber("");
  }

  function handleNewCustomer() {
    const url = `${ROOT_URL}api/v1/customers`;
    const payload = {
      name,
      organisationNr,
      vatNr,
      reference,
      paymentTerm,
      website,
      email,
      phoneNumber,
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    }).then((res) => {
      console.log("Data har skickats");
      fetchCustomerList();
      resetInput();
    });
  }

  function fetchCustomerList() {
    customerKit
      .getCustomerList()
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCustomerList(data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <h4>Fill in information below to add new customer</h4>
      {inputCustomer.map((inputItem, index) => {
        return renderCustomerInput(
          index,
          inputItem[0],
          inputItem[1],
          inputItem[2]
        );
      })}
      <SimpleButton onClick={handleNewCustomer}>Add customer</SimpleButton>
    </div>
  );
}
