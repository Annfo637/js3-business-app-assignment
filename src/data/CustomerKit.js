const ROOT_URL = "https://frebi.willandskill.eu/";
const token = localStorage.getItem("BUSINESS_TOKEN");
//console.log(token);

export default class {
  async getCustomerList() {
    const url = `${ROOT_URL}api/v1/customers`;
    return fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async deleteCustomer(id) {
    const url = `${ROOT_URL}api/v1/customers/${id}/`;
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
