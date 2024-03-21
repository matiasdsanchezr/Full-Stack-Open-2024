import { useState } from "react";
import Filter from "./components/SearchForm";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567" },
  ]);
  const [filter, setFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const changeFilterHandler = (event) => {
    setFilter(event.target.value);
  };

  const changeNameHandler = (event) => {
    setNewName(event.target.value);
  };

  const changeNumberHandler = (event) => {
    setNewNumber(event.target.value);
  };

  const personFormHandler = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      return alert(`${newName} is already added to phonebook`);
    }
    setPersons([...persons, { name: newName, number: newNumber }]);
  };

  const personsList = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter changeFilterHandler={changeFilterHandler} />
      <PersonForm
        submitHandler={personFormHandler}
        changeNameHandler={changeNameHandler}
        changeNumberHandler={changeNumberHandler}
      />
      <Persons persons={personsList} />
    </div>
  );
};

export default App;
