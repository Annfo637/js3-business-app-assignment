import React, { useState, useContext } from "react";
import CustomerKit from "../data/CustomerKit";
import { CustomerContext } from "../contexts/CustomerContext";

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

  function renderInput(index, placeholder, stateVariable, stateSetVariable) {
    return (
      <div key={index}>
        {/*<label>{placeholder}</label>*/}
        <input
          placeholder={placeholder}
          value={stateVariable}
          onChange={(e) => stateSetVariable(e.target.value)}
        />
      </div>
    );
  }

  function handleNewCustomer() {
    customerKit.handleAddCustomer(
      name,
      organisationNr,
      vatNr,
      reference,
      paymentTerm,
      website,
      email,
      phoneNumber
    );
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
        return renderInput(index, inputItem[0], inputItem[1], inputItem[2]);
      })}
      <button onClick={handleNewCustomer}>Add customer</button>
    </div>
  );
}
