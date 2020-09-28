import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { CustomerContext } from "../contexts/CustomerContext";
import CustomerKit from "../data/CustomerKit";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const CustomerInfo = styled.ul`
  background-color: whitesmoke;
  border-radius: 5px;
  box-shadow: 5px 10px 15px darkslategray;
  list-style-type: square;
  padding: 10px;
`;

const InfoItem = styled.li`
  margin-left: 10px;
  padding: 7px;
`;

const SimpleButton = styled.button`
  margin-top: 10px;
  border: solid darkslategray 1px;
  border-radius: 5px;
  font-size: 14px;
  padding: 3px;
`;

const DeleteButton = styled(SimpleButton)`
  margin-left: 15px;
  color: red;
`;

export default function CustomerPage(props) {
  const customerKit = new CustomerKit();
  //const { customerList } = useContext(CustomerContext);
  const customerList = JSON.parse(localStorage.getItem("CUSTOMER_LIST"));
  console.log(customerList);
  const customerId = props.match.params.id;
  const customerObject =
    customerList &&
    customerList.find(function (customer) {
      return customer.id == customerId;
    });
  console.log(customerObject);

  const history = useHistory();

  function handleDeleteCustomer() {
    customerKit.deleteCustomer(customerId).then(() => {
      history.push("/home");
    });
  }

  return (
    <div>
      <CustomerInfo>
        <InfoItem>Company Name: {customerObject.name}</InfoItem>
        <InfoItem>
          Organisation Number: {customerObject.organisationNr}
        </InfoItem>
        <InfoItem>VAT Number: {customerObject.vatNr}</InfoItem>
        <InfoItem>Reference: {customerObject.reference}</InfoItem>
        <InfoItem>Payment Term: {customerObject.paymentTerm}</InfoItem>
        <InfoItem>Website: {customerObject.website}</InfoItem>
        <InfoItem>Email: {customerObject.email}</InfoItem>
        <InfoItem>Phone Number: {customerObject.phoneNumber}</InfoItem>
      </CustomerInfo>
      <SimpleButton>
        <Link to={"/home/"}>Back to customer list</Link>
      </SimpleButton>
      <DeleteButton onClick={handleDeleteCustomer}>
        Delete customer
      </DeleteButton>
    </div>
  );
}
