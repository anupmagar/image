import { useState, useEffect, useRef } from "react";
import "./App.css";
import React from "react";

const App = () => {
  const [image, setImage] = useState([]);
  const [isDragging, setIsDragging] = useState();
  const fileInputRef = useRef();

  function selectFiles(event) {
    fileInputRef.current.click();
  }

  function onFileSelect(event) {
    const file = event.target.files;
    if (file.length === 0) return;

    if (file[0].type.split("/")[0] !== "image") return;

    setImage({
      name: file[0].name,
      url: URL.createObjectURL(file[0]),
    });
  }

  function onDragOver(event) {
    event.preventDefault();
    setIsDragging(true);
    event.dataTransfer.dropEffect = "copy";
  }

  function onDragLeave(event) {
    event.preventDefault();
    setIsDragging(false);
  }

  function onDrop(event) {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files;
    console.log(file);
    setImage({
      name: file[0].name,
      url: URL.createObjectURL(file[0]),
    });
  }
  // function deleteImage() {
  //   setImage((prev) => prev.filter(() => 1));
  // }
  return (
    <>
      <div
        className="container"
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        // ref={isDragging}
      >
        <div className="upload_button">
          <button
            type="button"
            role="button"
            className="up_button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={selectFiles}
          >
            Upload Image
          </button>
          <input
            type="file"
            name="file"
            className="file"
            multiple
            ref={fileInputRef}
            onChange={onFileSelect}
          />
        </div>
        <div className="upload_text">
          <p>or drop a file,</p>
          <span>
            paste image or
            <a href="#">Url</a>
          </span>
        </div>
      </div>
      <div className="preview">
        <>
          {/* <div className="image">
            <span className="delete" onClick={deleteImage()}>
              &times;
            </span>
          </div> */}

          {image.name ? (
            <img src={image.url} alt={image.name} />
          ) : (
            <p>select image</p>
          )}
        </>
      </div>
    </>
  );
};

export default App;
