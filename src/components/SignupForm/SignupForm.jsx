import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as authService from '../../services/authService'

const SignupForm = (props) => {
    const navigate = useNavigate();
    const [message, setMessage] = useState(['']);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        passwordConf: '',
    });

    const updateMessage = (msg) => {
        setMessage(msg);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const newUserResponse = await authService.signup(formData);
          props.setUser(newUserResponse.user);
          navigate('/');
        } catch (err) {
          updateMessage(err.message);
        }
    };

    const { username, password, passwordConf } = formData;

    const isFormValid = () => {
        return !(username && password && password === passwordConf);
    };

    return (
        <main className="signin-form">
            <h1>Sign Up</h1>
            <p>{message}</p>
            <form onSubmit={handleSubmit}>
                <div className="username">
                    <label htmlFor="username">Username:</label>
                    <input 
                      type="text"
                      id='username'
                      value={username}
                      name='username'
                      onChange={handleChange} 
                    />
                </div>
                <div className="password">
                    <label htmlFor="password">Password:</label>
                    <input 
                      type="password"
                      id='password'
                      value={password}
                      name='password'
                      onChange={handleChange} 
                    />
                </div>
                <div className="confirm-password">
                    <label htmlFor="confirm">Confirm Password:</label>
                    <input 
                      type="password"
                      id='confirm'
                      value={passwordConf}
                      name='passwordConf'
                      onChange={handleChange} 
                    />
                </div>
                <div className="submit-signin">
                    <button disabled={isFormValid()} className="signin-button">Sign Up</button>
                    <Link to='/'>
                      <button>Cancel</button>
                    </Link>
                </div>
            </form>
        </main>
    );
};

export default SignupForm;