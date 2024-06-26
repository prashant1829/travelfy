import "./SignUp.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpWS } from "../../services/authWs";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const SignUp = (props) => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { username, email, password, confirmPassword } = values;
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmitLogIn = () => {
    navigate("/login");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      username,
      email,
      password,
      confirmPassword,
    };

    signUpWS(data)
      .then((response) => {
        if (response.status) {
          navigate("/mytrips");
          props.authenticate(response.data.user);
        } else {
          setError(response.errorMessage);
        }
      })
      .catch((error) => {
        setError(error.message || 'An error occurred');
      });
  };

  return (
    <div className="signup-wrapper">
      <AccountCircleIcon fontSize="large" color="primary" />
      <Typography variant="h5" gutterBottom component="div">
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          id="outlined-username-input"
          label="Username"
          value={username}
          onChange={handleChange}
          name="username"
        />
        <TextField
          id="outlined-email-input"
          label="Email"
          value={email}
          onChange={handleChange}
          name="email"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />
        <div className="auth-input-field">
          <TextField
            id="outlined-password-input"
            label="Password"
            style={{ width: "43%" }}
            value={password}
            type="password"
            onChange={handleChange}
            name="password"
            autoComplete="current-password"
          />
        </div>
        <div className="auth-input-field">
          <TextField
            id="outlined-confirmPassword-input"
            label="Confirm Password"
            style={{ width: "43%" }}
            value={confirmPassword}
            type="password"
            onChange={handleChange}
            name="confirmPassword"
            autoComplete="current-password"
          />
        </div>
        <div className="submit-button">
          <Button variant="contained" type="submit">
            Sign Up
          </Button>
          <div className="login-button">
            <Button variant="contained" onClick={handleSubmitLogIn}>
              Already have an account? Log In
            </Button>
          </div>
          <Typography variant="body2" color="error">
            {error && (
              <div className="error-block">
                <p>{error}</p>
              </div>
            )}
          </Typography>
        </div>
      </form>
    </div>
  );
};

export default SignUp;

