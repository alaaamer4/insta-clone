import React, { useState } from "react";
import UploadPhoto from "../functions/UploadPhoto";
import AddPostForm from "./AddPostForm";

const AddPost = () => {
  const [file, setFile] = useState(null);
  return (
    <div className="post-wrapper">
      <h2 className="text-primary text-center mt-3">Add Post</h2>
      <UploadPhoto setFile={setFile} />
      <small className="text-secondary">
        Your post might took up to 2 minutes to upload depending on your
        internet speed{" "}
      </small>
      {file && <AddPostForm file={file} />}
    </div>
  );
};
export default AddPost;
