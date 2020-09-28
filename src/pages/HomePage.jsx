import React, { useContext, useEffect, useState } from "react";
import CustomerForm from "../components/CustomerForm";
import CustomerList from "../components/CustomerList";
import { UserContext } from "../contexts/UserContext";

export default function HomePage() {
  const ROOT_URL = "https://frebi.willandskill.eu/";
  const { user, setUser } = useContext(UserContext);
  const token = localStorage.getItem("BUSINESS_TOKEN");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  function fetchUser() {
    const url = `${ROOT_URL}api/v1/me`;
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setUser(result);
        setUserName(result.firstName + " " + result.lastName);
        setUserEmail(result.email);
      });
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <p>
        Du är inloggad som {userName}, {userEmail}
      </p>
      <CustomerList />
      <hr></hr>
      <CustomerForm />
    </div>
  );
}
