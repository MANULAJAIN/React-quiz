
import { useState } from "react";
import "../Login.css";
import { Link } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [remember, setRemember] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();

        if (!email.trim() || !password.trim()) {
            setError("Please enter your email and password.");
            return;
        }

        setError("");
        onLogin();
    }

    function setuser(user) {
        const name = user.name;
        localStorage.setItem("user", name);
        navigate("/");


    }

    return (
        <div className="login-page">
            <div className="login-container">

                {/* Left illustration */}
                <div className="illustration-panel">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTESa5PFBmhjBKDeP3bpNjVb0N9RN48qE5zBJNLZn04hQ&s=10"
                        alt="Student studying on a laptop"
                        className="student-image"
                    />
                </div>

                {/* Right login card */}
                <div className="login-card">

                    <GoogleOAuthProvider clientId="534504614984-7jfr4s72csu3b14mu9nbtmcbkjn62r45.apps.googleusercontent.com">
                        <GoogleLogin
                            onSuccess={credentialResponse => {
                                console.log(credentialResponse);
                                const token = credentialResponse.credential;
                                const res = jwtDecode(token);

                                console.log(res);
                                setuser(res);

                            }} tial
                            onError={() => {
                                console.log('Login Failed');
                            }}
                        />;

                    </GoogleOAuthProvider>
                    <div className="login-icon">
                        <i className="bi bi-mortarboard-fill"></i>
                    </div>

                    <h1>
                        React <span>Quiz</span>
                    </h1>

                    <p className="login-subtitle">
                        Login to continue your quiz journey
                    </p>

                    <form onSubmit={handleSubmit}>

                        <div className="login-field">
                            <label htmlFor="email">
                                <i className="bi bi-envelope"></i>
                                Email Address
                            </label>

                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="login-field">
                            <label htmlFor="password">
                                <i className="bi bi-lock"></i>
                                Password
                            </label>

                            <div className="password-box">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />

                                <button
                                    type="button"
                                    className="eye-button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    aria-label={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                >
                                    <i
                                        className={
                                            showPassword
                                                ? "bi bi-eye-slash"
                                                : "bi bi-eye"
                                        }
                                    ></i>
                                </button>
                            </div>
                        </div>

                        <div className="login-options">
                            <label className="remember-label">
                                <input
                                    type="checkbox"
                                    checked={remember}
                                    onChange={(e) =>
                                        setRemember(e.target.checked)
                                    }
                                />
                                Remember me
                            </label>

                            <button
                                type="button"
                                className="forgot-button"
                                onClick={() =>
                                    setError(
                                        "Password reset is not configured yet."
                                    )
                                }
                            >
                                Forgot password?
                            </button>
                        </div>

                        {error && (
                            <p className="login-error">{error}</p>
                        )}

                        <button type="submit" className="login-button">

                            <Link to="/" className="login-link">
                                <span className="login-link-text">Start Quiz</span>
                            </Link>
                            <i className="bi bi-arrow-right"></i>
                        </button>

                    </form>

                    <div className="login-divider">
                        <span>READY TO TEST YOUR KNOWLEDGE?</span>
                    </div>

                    <p className="login-footer">
                        <i className="bi bi-heart-fill"></i>
                        Practice
                        <span>•</span>
                        Learn
                        <span>•</span>
                        Improve
                        <i className="bi bi-heart-fill"></i>
                    </p>

                </div>
            </div>
        </div>
    );
}
