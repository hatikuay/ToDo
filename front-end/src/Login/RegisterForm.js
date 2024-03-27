function RegisterForm({ username, setUserName, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, handleRegister }) {
    return (
        <form onSubmit={handleRegister} className="register-form">
            {/* User Name input */}
            <div className="form-outline mb-4">
                <input type="text" id="registerName" className="form-control form-control-lg"
                    placeholder="Enter your name" value={username} onChange={(e) => setUserName(e.target.value)} />
                <label className="form-label" htmlFor="registerName">Name</label>
            </div>

            {/* Email input */}
            <div className="form-outline mb-4">
                <input type="email" id="registerEmail" className="form-control form-control-lg"
                    placeholder="Enter a valid email address" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label className="form-label" htmlFor="registerEmail">Email address</label>
            </div>

            {/* Password input */}
            <div className="form-outline mb-3">
                <input type="password" id="registerPassword" className="form-control form-control-lg"
                    placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <label className="form-label" htmlFor="registerPassword">Password</label>
            </div>

            {/* Confirm Password input */}
            <div className="form-outline mb-3">
                <input type="password" id="registerConfirmPassword" className="form-control form-control-lg"
                    placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                <label className="form-label" htmlFor="registerConfirmPassword">Confirm Password</label>
            </div>

            <div className="text-center text-lg-start mt-4 pt-2">
                <button type="submit" className="btn btn-primary btn-lg"
                    style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>Register</button>
                <p className="small fw-bold mt-2 pt-1 mb-0">Already have an account? <a href="#!"
                    className="link-danger">Login</a></p>
            </div>

        </form>

    );
}

export default RegisterForm;

