const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/contacts`;

const index = async () => {
    try {
      const res = await fetch(BASE_URL, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };

const show = async (contactId) => {
    try {
        const res = await fetch(`${BASE_URL}/${contactId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }, 
        });
        return res.json();
    } catch (err) {
        console.log(err);
    }
};

const create = async (contactFormData) => {
    try {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contactFormData),
        });
        return res.json();
    } catch (err) {
        console.log(err);
    }
};

const deleteContact = async (contactId) => {
    try {
        const res = await fetch(`${BASE_URL}/${contactId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return res.json();
    } catch (err) {
        console.log(err);
    }
};

const update = async (contactId, contactFormData) => {
    try {
        const res = await fetch(`${BASE_URL}/${contactId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contactFormData),
        });
        return res.json();
    } catch (err) {
        console.log(err);
    }
}

export { index, show, deleteContact, create, update };