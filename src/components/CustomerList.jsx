import React, { useContext, useEffect } from "react";
import CustomerKit from "../data/CustomerKit";
import { CustomerContext } from "../contexts/CustomerContext";

export default function CustomerList() {
  //const [customerList, setCustomerList] = useState(null);
  const customerKit = new CustomerKit();
  const { customerList, setCustomerList } = useContext(CustomerContext);

  useEffect(() => {
    fetchCustomerList();
  }, []);

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

  //I customer list ska namn, orgnr och referens visas
  return (
    <div>
      {customerList ? (
        <table>
          <thead>
            <tr>
              <th>Company name</th>
              <th>Organisation Number</th>
              <th>Reference</th>
            </tr>
          </thead>
          <tbody>
            {customerList.map((customerItem) => {
              return (
                <tr key={customerItem.id}>
                  <td>{customerItem.name}</td>
                  <td>{customerItem.organisationNr}</td>
                  <td>{customerItem.reference}</td>
                  <td>
                    <button>More info</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>You haven't added any customers yet.</p>
      )}
    </div>
  );
}
