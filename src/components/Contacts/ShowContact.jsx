import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { show } from '../../services/contactService';

const ShowContact = (props) => {
  const { contactId } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);

  useEffect(() => {
    const fetchContact = async () => {
      const contactData = await show(contactId);
      setContact(contactData);
    };
    fetchContact();
  }, [contactId]);

  if (!contact) return <div>Loading...</div>;

  return (
    <div className='show-page'>
      <h1>Contact Details</h1>
      <p>Name: {contact.name}</p>
      <p>Email: {contact.email}</p>
      <p>Phone: {contact.phone}</p>
      <p>Occupation: {contact.occupation}</p>
      <div className='details'>
        <p>Details:</p>
        <ul>
          {contact.details.split('\n').map((detail, index) => (
            <li key={index}>{detail}</li>
          ))}
        </ul>
      </div>
      <div className='submit-edit'>
        <Link to={`/contacts/${contactId}/edit`} className='edit-button'><button>Edit</button></Link>
        <button onClick={() => navigate('/')}>Back</button>
      </div>
    </div>
  );
};

export default ShowContact;