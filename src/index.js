import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

const ContactListComponent = props => {
  const { contacts } = props;
  return contacts.map(({ name, surname, gender, address, age }) => (
    <div key={name}>
      <p>Name: {name}</p>
      <p>Surname: {surname}</p>
      <p>Gender: {gender}</p>
      <p>Address: {address}</p>
      <p>Age: {age}</p>
    </div>
  ));
};

class ContactListContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      contacts: null
    };
  }

  async componentDidMount() {
    try {
      await fetch(
        "https://demo1443058.mockable.io/codeproject_tutorial/api/contacts"
      ).then(results =>
        results.json().then(({ contacts }) => {
          this.setState({ contacts });
        })
      );
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    const { contacts } = this.state;
    return contacts ? (
      <ContactListComponent contacts={contacts} />
    ) : (
      <p> No Contacts </p>
    );
  }
}

function App() {
  return (
    <div className="App">
      <h1>Contact List</h1>
      <h2>Fetches data and displays</h2>
      <ContactListContainer />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
