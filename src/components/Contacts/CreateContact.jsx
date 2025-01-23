import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as contactService from '../../services/contactService';

const CreateContact = ({ contacts, setContacts }) => {
  const { contactId } = useParams();

  const [formData, setFormData] = useState({
    category: 'Resources',
    name: '',
    email: '',
    phone: '',
    occupation: '',
    details: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchContact = async () => {
        const contactData = await contactService.show(contactId);
        setFormData(contactData);
    };
    if (contactId) fetchContact();
  }, [contactId]);

  const handleCreateContact = async (contactFormData) => {
    const newContact = await contactService.create(contactFormData);
    setContacts([newContact, ...contacts]);
  };

  const handleUpdateContact = async (contactId, contactFormData) => {
    const updatedContact = await contactService.update(contactId, contactFormData);
    setContacts(contacts.map((contact) => (contactId === contact._id ? updatedContact : contact)));
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (contactId) {
        handleUpdateContact(contactId, formData);
        navigate(`/contacts/${contactId}`);

    } else {
        handleCreateContact(formData);
        navigate('/');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='create-form'>
      <h1>{contactId ? 'Edit Contact' : 'New Contact'}</h1>  
      <label className='category'>
        Category:
        <select name="category" value={formData.category} onChange={handleChange}>
          <option value="Resources">Resources</option>
          <option value="Team">Team</option>
          <option value="Clients">Clients</option>
          <option value="Hot Leads">Hot Leads</option>
        </select>
      </label>
      <label className='name'>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </label>
      <label className='email'>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </label>
      <label className='phone'>
        Phone:
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
      </label>
      <label className='occupation'>
        Occupation:
        <input
          type="text"
          name="occupation"
          value={formData.occupation}
          onChange={handleChange}
        />
      </label>
      <label className='details'>
        Details:
        <textarea
          name="details"
          value={formData.details}
          onChange={handleChange}
        ></textarea>
      </label>
      <div className='submit-create'>
        <button type="submit" className='create-button'>{contactId ? 'Edit Contact' : 'Create Contact'}</button>
        <button type="button" onClick={() => navigate('/')}>Cancel</button>
      </div>
    </form>
  );
};

export default CreateContact;