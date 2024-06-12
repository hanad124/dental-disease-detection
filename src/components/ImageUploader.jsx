import React, { useState } from "react";

import {
  detectDentalDisease,
  detectDentalDiseaseFromURL,
} from "../api/dentalAPI";

const ImageUploader = ({ setDetectionData }) => {
  const [imageURL, setImageURL] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleURLChange = (event) => {
    setImageURL(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      let imageInfo;

      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
          const imageData = reader.result;
          const img = new Image();
          img.src = imageData;
          img.onload = async () => {
            imageInfo = { width: img.width, height: img.height };
            data = await detectDentalDisease(imageData);
            setDetectionData({
              ...data,
              imageUrl: URL.createObjectURL(file),
              image: imageInfo,
            });
          };
        };
      } else if (imageURL) {
        const img = new Image();
        img.src = imageURL;
        img.onload = async () => {
          imageInfo = { width: img.width, height: img.height };
          data = await detectDentalDiseaseFromURL(imageURL);
          setDetectionData({ ...data, imageUrl: imageURL, image: imageInfo });
        };
      }
    } catch (error) {
      console.error("Error submitting image:", error);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Upload or Enter Image URL</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Image URL"
          value={imageURL}
          onChange={handleURLChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ImageUploader;
