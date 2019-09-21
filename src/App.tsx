import React from "react";
import * as ReactDOM from "react-dom";
import { useDropzone } from "react-dropzone";

function App() {
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  function onDrop(acceptedFiles) {
    const reader = new FileReader();

    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => console.log("file reading has failed");
    reader.onload = () => {
      // Do whatever you want with the file contents
      const binaryStr = reader.result as string;

      // Parse JSON
      console.log(JSON.parse(binaryStr));
    };

    acceptedFiles.forEach(file => reader.readAsBinaryString(file));
  }

  return (
    <button {...getRootProps()}>
      <input {...getInputProps()} accept="application/json" />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </button>
  );
}

ReactDOM.render(<App />, document.getElementById("react-page"));
