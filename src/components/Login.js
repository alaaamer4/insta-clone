import React, { useState } from "react";
import { auth } from "../firebase/config";
import { useHistory } from "react-router-dom";
const Login = () => {
  let history = useHistory();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const { email, password } = input;
  const authLogin = (email, password) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        history.push("/");
      })
      .catch((err) => setError(err.message));
  };
  const handleChange = (e) => {
    const { value, name } = e.target;
    setInput({ ...input, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    authLogin(email, password);
  };
  return (
    <form className="form " onSubmit={handleSubmit}>
      <h1 className="text-primary text-center mb-3"> Login</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          onChange={handleChange}
          className="form-control"
          type="email"
          name="email"
          value={email}
          id="email"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          onChange={handleChange}
          className="form-control"
          type="password"
          name="password"
          value={password}
          id="password"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary btn-block my-3">
        Login
      </button>
    </form>
  );
};

export default Login;
