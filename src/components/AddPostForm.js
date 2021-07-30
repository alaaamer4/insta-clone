import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { storage, firestore, timestamp, auth } from "../firebase/config";
const AddPostForm = ({ file }) => {
  let history = useHistory();
  const [caption, setCaption] = useState("");
  const [user, setUser] = useState(null);
  useEffect(() => {
    let login = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => login();
  }, [user]);
  const handleChange = (e) => {
    setCaption(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storageRef = storage.ref(file.name);
    const firestoreRef = firestore.collection("posts");
    storageRef.put(file).on(
      "state_changed",
      (snap) => {},
      (err) => console.log(err),
      async () => {
        const url = await storageRef.getDownloadURL();
        const createdAt = timestamp();
        firestoreRef.add({ url, createdAt, caption, user: user.uid });
      }
    );
    history.push("/");
  };

  return (
    user && (
      <form className="post-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="caption">Add Caption</label>
          <input
            type="text"
            placeholder="Your caption"
            className="form-control"
            name="caption"
            required
            value={caption}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Add Post
        </button>
      </form>
    )
  );
};

export default AddPostForm;
