import React, { useState, useEffect } from "react";
import axios from "axios";

const DetectionApp = () => {
  const [format, setFormat] = useState("image");
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [output, setOutput] = useState("");

  useEffect(() => {
    retrieveDefaultValuesFromLocalStorage();
  }, []);

  const retrieveDefaultValuesFromLocalStorage = () => {
    try {
      const storedApiKey = localStorage.getItem("rf.api_key");
      const storedModel = localStorage.getItem("rf.model");
      const storedFormat = localStorage.getItem("rf.format");

      if (storedApiKey) setApiKey(storedApiKey);
      if (storedModel) setModel(storedModel);
      if (storedFormat) setFormat(storedFormat);
    } catch (e) {
      console.error("Error accessing localStorage", e);
    }
  };

  const handleInfer = async (e) => {
    e.preventDefault();
    setOutput("Inferring...");

    const settings = {
      method: "POST",
      url: `https://detect.roboflow.com/tooth-disease/1?api_key=tAIdURDipgqWJHApslZW&format=${format}`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      if (format === "image") {
        settings.responseType = "arraybuffer";
        if (file) {
          const base64Image = await getBase64FromFile(file);
          settings.data = base64Image;
        } else if (url) {
          settings.url += `&image=${encodeURIComponent(url)}`;
        }
      } else if (format === "json") {
        if (file) {
          const base64Image = await getBase64FromFile(file);
          settings.data = base64Image;
        } else if (url) {
          settings.url += `&image=${encodeURIComponent(url)}`;
        }
      }

      const response = await axios(settings);
      if (format === "json") {
        setOutput(<pre>{JSON.stringify(response.data, null, 4)}</pre>);
      } else {
        const arrayBufferView = new Uint8Array(response.data);
        const blob = new Blob([arrayBufferView], { type: "image/jpeg" });
        const base64image = window.URL.createObjectURL(blob);
        setOutput(<img src={base64image} alt="Inference result" />);
      }
    } catch (error) {
      setOutput(
        "Error loading response. Check your API key, model, version, and other parameters then try again."
      );
    }
  };

  const getBase64FromFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div>
      <form onSubmit={handleInfer}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Image URL"
        />

        <button type="submit">Infer</button>
      </form>

      <div id="output">{output}</div>
    </div>
  );
};

export default DetectionApp;
