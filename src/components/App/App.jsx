import { useState, useEffect } from "react";
import css from "../App/App.module.css";
import ContactForm from "../ContactForm/ContactForm";
import SearchBox from "../SearchBox/SearchBox";
import ContactList from "../ContactList/ContactList";

const localStorageKey = "contacts";

function getInitialContacts() {
  const storageData = localStorage.getItem(localStorageKey);
  return storageData 
    ? JSON.parse(storageData)
    : []; 
}

function App() {
  const [contacts, setContacts] = useState(getInitialContacts());
  const [search, setSearch] = useState("");

  function handleAddContact(newContact) {
    setContacts((contacts) => [...contacts, newContact]);
  }

  function handleSearch(currentSearch) {
    setSearch(currentSearch);
  }

  function handleDelete(id) {
    setContacts((contacts) => contacts.filter((item) => item.id !== id));
  }

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(contacts));
  }, [contacts]);

  const filteredContacts =
    search.trim() === ""
      ? contacts.slice()
      : contacts.filter((contact) =>
          contact.name.toLowerCase().includes(search.toLowerCase())
        );

  return (
    <>
      <div className={css.form}>
        <h1>Phonebook</h1>
        <ContactForm onAddContact={handleAddContact} />
        <SearchBox search={search} onSearch={handleSearch}>
          Find contacts by name
        </SearchBox>
      </div>
      <ContactList contacts={filteredContacts} onDelete={handleDelete} />
    </>
  );
}

export default App;
