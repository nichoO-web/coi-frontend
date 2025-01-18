import { useState } from 'react';
import { Link } from 'react-router-dom';
// import { deleteContact } from '../../services/contactService';

const Contacts = ({ contacts, handleDeleteContact }) => {
  const [activeTab, setActiveTab] = useState('Resources');
  // const [contacts, setContacts] = useState([]);

  // const handleDeleteContact = async (contactId) => {
  //   await deleteContact(contactId);
  //   setContacts(contacts.filter((contact) => contact._id !== contactId));
  // };

  const filteredContacts = contacts.filter(
    (contact) => contact.category === activeTab
  );

  return (
    <div>
      <h1>Contacts</h1>
      <Link to="/create">Create New Contact</Link>

      <div>
        {['Resources', 'Team', 'Clients', 'Hot Leads'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{ fontWeight: activeTab === tab ? 'bold' : 'normal' }}
          >
            {tab}
          </button>
        ))}
      </div>

      <ul>
        {filteredContacts.map((contact) => (
          <li key={contact._id}>
            <p>Name: {contact.name}</p>
            <p>Email: {contact.email}</p>
            <p>Phone: {contact.phone}</p>
            <p>Occupation: {contact.occupation}</p>
            <Link to={`/contacts/${contact._id}`}>Details</Link>
            <button onClick={() => handleDeleteContact(contact._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contacts;