import { useState, useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Contacts from "./components/Contacts/Contacts";
import CreateContact from "./components/Contacts/CreateContact";
import ShowContact from "./components/Contacts/ShowContact";
import Landing from "./components/Landing/Landing";
import SignupForm from "./components/SignupForm/SignupForm";
import SigninForm from "./components/SigninForm/SigninForm";
import * as authService from './services/authService';
import * as contactService from './services/contactService';
import './App.css';

const App = () => {
  const [user, setUser] = useState(authService.getUser());
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchAllContacts = async () => {
        const contactsData = await contactService.index();
        setContacts(contactsData);
    };
    if (user) fetchAllContacts();
  }, [user]);
  
  const handleDeleteContact = async (contactId) => {
    await contactService.deleteContact(contactId);
    setContacts(contacts.filter((contact) => contact._id !== contactId));
  };

  const handleSignout = () => {
    authService.signout()
    setUser(null)
  }

  return (
    <div className="app-container">
      <NavBar user={ user } handleSignout={handleSignout} />
      <Routes>
        { user ? (
            <>
                <Route path="/" element={<Contacts user={user} contacts={contacts} handleDeleteContact={handleDeleteContact}/>} />
                <Route path="/create" element={<CreateContact />} />
                <Route path="/contacts/:contactId" element={<ShowContact />} />
                <Route path="/contacts/:contactId/edit" element={<CreateContact />}/>
            </>
        ) : (
            <Route path="/" element={<Landing />} />
        )}
        <Route path="/signup" element={<SignupForm setUser={setUser} />} />
        <Route path="/signin" element={<SigninForm setUser={setUser} />} />
      </Routes>
    </div>
  );
};

export default App;