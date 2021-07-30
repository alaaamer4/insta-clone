import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { AiOutlinePlus } from "react-icons/ai";
const UploadPhoto = (props) => {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState(null);
  const [errors, setErrors] = useState(null);
  const types = ["image/jpg", "image/jpeg"];
  const onDrop = (files) => {
    let selected = files[0];
    let url = URL.createObjectURL(files[0]);
    if (selected && types.includes(selected.type)) {
      setFile(selected);
      props.setFile(selected);
      setUrl(url);
      setErrors(null);
    } else {
      setFile(null);
      props.setFile(null);
      setUrl(null);
      setErrors("Please only select files of type image/jpg or image/jpeg");
    }
  };
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
          {({ getRootProps, getInputProps }) => (
            <div className="dropzone" {...getRootProps()}>
              <input {...getInputProps()} />
              <AiOutlinePlus />
            </div>
          )}
        </Dropzone>

        <div className="container my-2 ">
          {file && (
            <div className="mx-auto drop-photo">
              {" "}
              <img
                src={url}
                alt=""
                style={{ width: "100%", height: "100%" }}
              />{" "}
            </div>
          )}
        </div>
      </div>
      {errors && <div className="alert alert-danger"> {errors} </div>}
    </>
  );
};

export default UploadPhoto;
