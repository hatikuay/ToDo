import React, { useState } from 'react';
import './Login.css'; // Assume you have some basic styling in Login.css
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Footer from './Footer';


function Login() {
    const [showLoginForm, setShowLoginForm] = useState(true);
    const [username, setUserName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!username || !email || !password || !confirmPassword) {
            setError("All fields are required");
            console.error("Registration error:", error);
            console.log(username, email, password, confirmPassword)
            return;
        }

        if (password !== confirmPassword) {
            setError("Password do not match");
            console.error("Registration error:", error);
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:5000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                console.log("Registration succesful", data);
                setShowLoginForm(true);
            } else {
                setError(data.message || "Registration failed");
            }

        } catch (error) {
            console.error("Registration error:", error);
            setError("Registration failed due to a network error")
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        // Basic validation
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        try {
            // Simulate a login request to your backend
            // In a real app, you would make a request to the backend here
            // For demonstration, we simulate a successful login after 1 second
            setTimeout(() => {
                console.log('Logged in');
                // Redirect user or do something upon successful login
            }, 1000);
        } catch (error) {
            setError('Failed to login');
        }
    };

    return (
        <section className="vh-100">
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                            className="img-fluid" alt="Sample" />
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        {showLoginForm ? (
                            <>
                                <LoginForm
                                    username={username}
                                    setUserName={setUserName}
                                    email={email}
                                    setEmail={setEmail}
                                    password={password}
                                    setPassword={setPassword}
                                    handleLogin={handleLogin}
                                />

                                <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account?
                                    <span onClick={() => setShowLoginForm(false)}
                                        className="link-danger"> Register </span>
                                </p>

                            </>
                        ) : (
                            <>
                                <RegisterForm
                                    username={username}
                                    setUserName={setUserName}
                                    email={email}
                                    setEmail={setEmail}
                                    password={password}
                                    setPassword={setPassword}
                                    confirmPassword={confirmPassword}
                                    setConfirmPassword={setConfirmPassword}
                                    handleRegister={handleRegister}
                                />
                                <button onClick={() => setShowLoginForm(true)} className='btn btn-link'>Login</button>
                            </>)}
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </section>
    );
}

export default Login;
