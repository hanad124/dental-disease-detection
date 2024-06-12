import React, { useState, useEffect } from "react";
import axios from "axios";
import ApexChart from "./Chart";

const DetectionApp = () => {
  const [inputType, setInputType] = useState("file");
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [output, setOutput] = useState("");
  const [chartData, setChartData] = useState({ classes: [], confidences: [] });

  useEffect(() => {
    retrieveDefaultValuesFromLocalStorage();
  }, []);

  const handleInfer = async (e) => {
    e.preventDefault();
    setOutput("Inferring...");

    const jsonApi = {
      method: "POST",
      url: `https://detect.roboflow.com/tooth-disease/1?api_key=tAIdURDipgqWJHApslZW&format=json`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const imageApi = {
      method: "POST",
      url: `https://detect.roboflow.com/tooth-disease/1?api_key=tAIdURDipgqWJHApslZW&format=image`,
      headers: {
        "Content-Type": "application/json",
      },
      responseType: "arraybuffer",
    };

    try {
      let base64Image;
      if (inputType === "file" && file) {
        base64Image = await getBase64FromFile(file);
        jsonApi.data = JSON.stringify(base64Image);
        imageApi.data = JSON.stringify(base64Image);
      } else if (inputType === "url" && imageUrl) {
        jsonApi.url += `&image=${encodeURIComponent(imageUrl)}`;
        imageApi.url += `&image=${encodeURIComponent(imageUrl)}`;
      }

      const jsonResponse = await axios(jsonApi);
      const jsonResponseData = jsonResponse.data;

      const classes = jsonResponseData.predictions.map((pred) => pred.class);
      const confidences = jsonResponseData.predictions.map(
        (pred) => pred.confidence
      );
      setChartData({ classes, confidences });

      const imageResponse = await axios(imageApi);
      const blob = new Blob([imageResponse.data], { type: "image/jpeg" });
      const imagePath = URL.createObjectURL(blob);
      setOutput(<img src={imagePath} alt="Inference result" />);
    } catch (error) {
      console.error("Error:", error);
      setOutput(
        "Error loading response. Check your API key, model, version, and other parameters then try again."
      );
    }
  };

  const getBase64FromFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result.split(",")[1]; // Remove metadata
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const retrieveDefaultValuesFromLocalStorage = () => {
    try {
      const api_key = localStorage.getItem("rf.api_key");
      const model = localStorage.getItem("rf.model");
      const format = localStorage.getItem("rf.format");

      if (api_key) setImageUrl(api_key);
      if (model) setImageUrl(model);
      if (format) setImageUrl(format);
    } catch (e) {
      console.error("Error retrieving local storage:", e);
    }
  };

  return (
    <div>
      <div>
        <button onClick={() => setInputType("file")}>Upload File</button>
        <button onClick={() => setInputType("url")}>Enter URL</button>
      </div>
      <form onSubmit={handleInfer}>
        {inputType === "file" && (
          <div id="fileSelectionContainer">
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          </div>
        )}
        {inputType === "url" && (
          <div id="urlContainer">
            <input
              type="text"
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Image URL"
            />
          </div>
        )}
        <button type="submit">Infer</button>
      </form>
      <div id="output">{output}</div>
      <ApexChart data={chartData} />
    </div>
  );
};

export default DetectionApp;
