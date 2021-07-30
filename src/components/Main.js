import React, { useState, useEffect } from "react";
import ImagePost from "./ImagePost";
import UserInfo from "./UserInfo";
import { firestore, auth } from "../firebase/config";

const Main = () => {
  const [id, setId] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let logOut = auth.onAuthStateChanged((user) => {
      if (user) {
        setId(user.uid);
      } else {
        setId(null);
      }
    });

    let unsub = firestore
      .collection("posts")
      .orderBy("createdAt", "desc")
      .onSnapshot((snap) => {
        let Posts = [];
        snap.forEach((doc) => {
          Posts.push({ ...doc.data(), id: doc.id });
        });
        setPosts(Posts);
      });
    return () => {
      unsub();
      logOut();
    };
  }, [id, posts]);
  return (
    <>
      <div className="wrapper-main">
        <div className="posts">
          {posts.length !== 0 &&
            posts.map((post, i) => (
              <ImagePost
                url={post.url}
                caption={post.caption}
                postUser={post.user}
                postId={post.id}
                user={id}
                key={i}
              />
            ))}
        </div>
        {id && <UserInfo id={id} />}
      </div>
    </>
  );
};

export default Main;
