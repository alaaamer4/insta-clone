import React, { useState, useEffect } from "react";
import { firestore } from "../../firebase/config";
import "./comment.css";
import { MdSend } from "react-icons/md";
const Comments = ({ postId, id }) => {
  const [comment, setComment] = useState("");
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
  const handleChange = (e) => {
    setComment(e.target.value);
  };
  const handelSubmit = (e) => {
    e.preventDefault();
    firestore.collection("posts").doc(postId).collection("comments").add({
      username: user.username,
      comment: comment,
    });
    setComment("");
  };
  return (
    id && (
      <form className="comment" onSubmit={handelSubmit}>
        <div className="input-group">
          <input
            type="text"
            required
            autoComplete="off"
            onChange={handleChange}
            placeholder="Add a comment..."
            name="comment"
            value={comment}
          />
          <button type="submit" className="btn">
            <MdSend />
          </button>
        </div>
      </form>
    )
  );
};

export default Comments;
