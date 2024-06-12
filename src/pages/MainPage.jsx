import React, { useState } from "react";
import ImageUploader from "../components/ImageUploader";
import DetectionResults from "../components/DetectionResults";
import DetectionApp from "../components/DetectionApp";

const MainPage = () => {
  const [detectionData, setDetectionData] = useState(null);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Dental Disease Detection
      </h1>
      {/* <ImageUploader setDetectionData={setDetectionData} />
      <DetectionResults detectionData={detectionData} /> */}
      <DetectionApp />
    </div>
  );
};

export default MainPage;
