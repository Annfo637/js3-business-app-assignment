import React from "react";
import CustomerForm from "../components/CustomerForm";
import CustomerList from "../components/CustomerList";

export default function HomePage() {
  return (
    <div>
      <h3>Your Customer List</h3>
      <CustomerList />
      <hr></hr>
      <CustomerForm />
    </div>
  );
}
