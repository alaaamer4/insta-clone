import React, { useState } from "react";
import { auth, firestore, storage } from "../firebase/config";
import { useHistory } from "react-router-dom";
const Register = () => {
  let history = useHistory();
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const [avatar, setAvatar] = useState(null);
  const [errors, setErrors] = useState(null);

  const { email, password, username, password2 } = input;
  const types = ["image/jpg", "image/jpeg"];
  const handleChange = (e) => {
    const { value, name } = e.target;
    setInput({ ...input, [name]: value });
  };
  const uploadAvatar = (e) => {
    let selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setAvatar(selected);
      setErrors(null);
    } else {
      setAvatar(null);
      setErrors("Please only select files of type image/jpg or image/jpeg");
    }
  };

  const authRegister = (data, file) => {
    const storageRef = storage.ref(file.name);
    storageRef.put(file).on(
      "state_changed",
      (snap) => {},
      (err) => {
        setErrors(err);
      },
      async () => {
        const url = await storageRef.getDownloadURL();
        auth
          .createUserWithEmailAndPassword(data.email, data.password)
          .then((res) => {
            return firestore.collection("users").doc(res.user.uid).set({
              email: data.email,
              username: data.username,
              avatar: url,
            });
          });
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === password2) {
      authRegister(input, avatar);
      history.push("/");
    } else {
      setErrors("passwords does not match");
    }
  };
  return (
    <form className="register-form " onSubmit={handleSubmit}>
      <h1 className="text-primary text-center mb-3"> Register</h1>
      {errors && <div className="alert alert-danger">{errors}</div>}
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          onChange={handleChange}
          className="form-control"
          type="username"
          name="username"
          value={username}
          id="username"
          required
        />
      </div>
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
      <div className="form-group">
        <label htmlFor="password2">Confirm Password</label>
        <input
          onChange={handleChange}
          className="form-control"
          type="password"
          name="password2"
          value={password2}
          id="password2"
          required
        />
      </div>
      <div className="custom-file">
        <input
          onChange={uploadAvatar}
          type="file"
          className="custom-file-input"
          id="avatar"
          aria-describedby="avatar-upload"
          style={{ cursor: "pointer" }}
        />
        <label
          className="custom-file-label hide-sm"
          htmlFor="avatar"
          style={{ cursor: "pointer" }}
        >
          ChooseYour Profile Picture
        </label>
        {avatar && <small className="text-success">{avatar.name}</small>}
      </div>

      <button type="submit" className="btn btn-primary btn-block my-3">
        Register
      </button>
    </form>
  );
};

export default Register;
