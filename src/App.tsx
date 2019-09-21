import React from "react";
import * as ReactDOM from "react-dom";
import { useDropzone } from "react-dropzone";

import { ActionType } from "./core/actions";
import { getConfigColors } from "./core/colors";

function App() {
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  function handlePostMessage(pluginMessage: PluginMessage) {
    parent.postMessage(
      {
        pluginMessage
      },
      "*"
    );
  }

  function handleAddColors(colors: DSColor[]) {
    const pluginMessage: PluginMessage = {
      type: ActionType.ADD_COLORS,
      payload: colors
    };
    handlePostMessage(pluginMessage);
  }

  function onDrop(acceptedFiles) {
    const reader = new FileReader();

    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => console.log("file reading has failed");
    reader.onload = () => {
      // Do whatever you want with the file contents
      const binaryStr = reader.result as string;

      // Get config
      const config = JSON.parse(binaryStr);
      handleAddColors(getConfigColors(config));
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
