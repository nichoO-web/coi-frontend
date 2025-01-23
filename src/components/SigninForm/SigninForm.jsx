import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as authService from '../../services/authService';
import '../../App.css'

const SigninForm = (props) => {
    const navigate = useNavigate();
    const [message, setMessage] = useState(['']);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const updateMessage = (msg) => {
        setMessage(msg);
    };

    const handleChange = (e) => {
        updateMessage('');
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await authService.signin(formData);
            props.setUser(user);
            navigate('/');
        } catch (err) {
            updateMessage(err.message);
            console.log(err)
        }
    };

    return (
        <main className="signin-form">
          <h1>Sign In</h1>
          <p>{message}</p>
          <form autoComplete="off" onSubmit={handleSubmit}>
            <div className="username">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                autoComplete="off"
                id="username"
                value={formData.username}
                name="username"
                onChange={handleChange}
              />
            </div>
            <div className="password">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                autoComplete="off"
                id="password"
                value={formData.password}
                name="password"
                onChange={handleChange}
              />
            </div>
            <div className="submit-signin">
              <button className="signin-button">Sign In</button>
              <Link to="/">
                <button>Cancel</button>
              </Link>
            </div>
          </form>
        </main>
    );
};
    
export default SigninForm;