import React, { useState, useEffect } from "react";
import { firestore } from "../firebase/config";
import Comments from "./comment component/Comments";
const ImagePost = ({ url, caption, postUser, postId, user }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    let unSub;
    firestore
      .collection("users")
      .doc(postUser)
      .get()
      .then((res) => {
        setUserInfo(res.data());
      });
    if (postId) {
      unSub = firestore
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .onSnapshot((snap) => {
          setComments(snap.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      firestore.collection("users").doc(postUser).get();
      unSub();
    };
  }, [postId, postUser]);

  return (
    <div className="post-container">
      {userInfo && (
        <header className="user-info">
          <img src={userInfo.avatar} alt="Avatar" className="avatar" />
          <h5>{userInfo.username}</h5>
        </header>
      )}
      <div className="post-image">
        <img src={url} alt="" />
      </div>
      <section className="caption">
        {" "}
        <strong>{caption}</strong>
      </section>
      <div style={{ borderTop: "1px solid #dcdcdc" }}>
        {postId &&
          comments.map((c, i) => (
            <p key={i} className="comments">
              <strong>{c.username}</strong> {c.comment}
            </p>
          ))}
      </div>
      <Comments postId={postId} id={user} />
    </div>
  );
};

export default ImagePost;
