import { useState } from 'react';
import { Link } from 'react-router-dom';

const Contacts = ({ contacts, handleDeleteContact }) => {
  const [activeTab, setActiveTab] = useState('Resources');
  const filteredContacts = contacts.filter(
    (contact) => contact.category === activeTab
  );

  return (
    <div className='contacts-container'>
      <Link to="/create" className='new-contact'><button>New Contact</button></Link>
      <h1>Contacts</h1>
      <div className='tabs'>
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
          <li key={contact._id} className='contacts-list'>
            <p>Name: <br /> {contact.name}</p>
            <p>Email: <br /> {contact.email}</p>
            <p>Phone: <br /> {contact.phone}</p>
            <p>Occupation: <br /> {contact.occupation}</p>
            <Link to={`/contacts/${contact._id}`}>Details</Link>
            <button onClick={() => handleDeleteContact(contact._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contacts;