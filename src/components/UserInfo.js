import React, { useState, useEffect } from "react";
import { firestore } from "../firebase/config";
const UserInfo = ({ id }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (id) {
      firestore
        .collection("users")
        .doc(id)
        .get()
        .then((res) => {
          setUser(res.data());
        });
    } else {
      setUser(null);
    }
    return () => {
      if (id) {
        firestore.collection("users").doc(id).get();
      }
    };
  }, [id]);
  return user ? (
    <section className="user-info-main">
      <div className="fixed">
        <img src={user.avatar} alt="Avatar" className="avatar" />
        <div>
          <h5>{user.username}</h5>
          <h5>{user.email}</h5>
        </div>
      </div>
    </section>
  ) : (
    ""
  );
};

export default UserInfo;
