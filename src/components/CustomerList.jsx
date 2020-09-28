import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import CustomerKit from "../data/CustomerKit";
import { CustomerContext } from "../contexts/CustomerContext";
import { Link } from "react-router-dom";

const CustomerTable = styled.table`
  background-color: whitesmoke;
  border-radius: 5px;
  box-shadow: 5px 10px 15px darkslategray;
  margin-bottom: 30px;
`;

const TableHeaders = styled.th`
  background-color: gray;
  color: whitesmoke;
  margin-bottom: 5px;
  padding: 10px;
`;

const TableInfo = styled.td`
  padding: 10px;
`;

const LinkButton = styled.button`
  margin-top: 10px;
  border: solid darkslategray 1px;
  border-radius: 5px;
  font-size: 14px;
  padding: 3px;
`;

export default function CustomerList() {
  const customerKit = new CustomerKit();
  const { customerList, setCustomerList } = useContext(CustomerContext);

  useEffect(() => {
    fetchCustomerList();
  }, []);

  function storeCustomerList(list) {
    localStorage.setItem("CUSTOMER_LIST", JSON.stringify(list));
  }

  function fetchCustomerList() {
    customerKit
      .getCustomerList()
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCustomerList(data.results);
        storeCustomerList(data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //I customer list ska namn, orgnr och referens visas
  return (
    <div>
      {customerList ? (
        <CustomerTable>
          <thead>
            <tr>
              <TableHeaders>Company name</TableHeaders>
              <TableHeaders>Organisation Number</TableHeaders>
              <TableHeaders>Reference</TableHeaders>
              <TableHeaders>Details</TableHeaders>
            </tr>
          </thead>
          <tbody>
            {customerList.map((customerItem) => {
              return (
                <tr key={customerItem.id}>
                  <TableInfo>{customerItem.name}</TableInfo>
                  <TableInfo>{customerItem.organisationNr}</TableInfo>
                  <TableInfo>{customerItem.reference}</TableInfo>
                  <TableInfo>
                    <LinkButton>
                      <Link to={`/customer/${customerItem.id}`}>
                        Read all info
                      </Link>
                    </LinkButton>
                  </TableInfo>
                </tr>
              );
            })}
          </tbody>
        </CustomerTable>
      ) : (
        <p>You haven't added any customers yet.</p>
      )}
    </div>
  );
}
