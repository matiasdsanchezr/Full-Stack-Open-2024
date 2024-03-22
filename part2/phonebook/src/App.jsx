import { useState, useEffect } from "react";
import Filter from "./components/SearchForm";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567" },
  ]);
  const [filter, setFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const changeFilterHandler = (event) => {
    setFilter(event.target.value);
  };

  const changeNameHandler = (event) => {
    setNewName(event.target.value);
  };

  const changeNumberHandler = (event) => {
    setNewNumber(event.target.value);
  };

  const personSubmitHandler = (event) => {
    event.preventDefault();
    const match = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );
    if (!match) {
      personService
        .create({
          name: newName,
          number: newNumber,
        })
        .then((response) => {
          setPersons(persons.concat(response.data));
          setMessage({ text: `Added ${response.data.name}` });
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        });
      return;
    }

    const confirm = window.confirm(
      `${newName} is already added to the phonebook, replace the old number with a new one?`
    );
    if (confirm) {
      personService
        .update(match.id, {
          ...match,
          number: newNumber,
        })
        .then(() => {
          setPersons(
            persons.map((person) =>
              person.id === match.id ? { ...person, number: newNumber } : person
            )
          );
        })
        .catch(() => {
          setMessage({
            text: `Information of ${match.name} has already been removed from server`,
            type: "error",
          });
          setTimeout(() => {
            setMessage(null);
          }, 5000);
          setPersons(persons.filter((person) => person.id !== match.id));
        });
    }
  };

  const clickDeleteHandler = (person) => {
    const confirm = window.confirm(`Delete ${person.name} ?`);
    if (confirm) {
      personService.remove(person.id).then((response) => {
        setPersons(persons.filter((person) => person.id !== response.data.id));
      });
    }
  };

  const personsList = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter changeFilterHandler={changeFilterHandler} />
      <PersonForm
        submitHandler={personSubmitHandler}
        changeNameHandler={changeNameHandler}
        changeNumberHandler={changeNumberHandler}
      />
      <Persons persons={personsList} clickDeleteHandler={clickDeleteHandler} />
    </div>
  );
};

export default App;
