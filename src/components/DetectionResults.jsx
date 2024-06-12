import React from "react";

const DetectionResults = ({ detectionData }) => {
  if (!detectionData) return null;

  const { imageUrl, predictions, image } = detectionData;

  return (
    <div className="mt-8 relative">
      <h2 className="text-xl font-bold mb-4">Detection Results</h2>
      <div className="relative">
        <img
          src={imageUrl}
          alt="Dental X-Ray"
          className="w-full rounded-lg shadow-lg"
          style={{ maxHeight: "80vh", objectFit: "contain" }}
        />
        {predictions.map((prediction, index) => {
          const left = (prediction.x / image.width) * 100;
          const top = (prediction.y / image.height) * 100;
          const width = (prediction.width / image.width) * 100;
          const height = (prediction.height / image.height) * 100;

          return (
            <div
              key={index}
              className="absolute border-2 border-red-500"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                width: `${width}%`,
                height: `${height}%`,
              }}
            >
              <div
                className="bg-red-500 text-white text-xs rounded px-1"
                style={{
                  transform: "translateY(-100%)",
                  fontSize: "12px",
                  padding: "2px",
                  whiteSpace: "nowrap",
                }}
              >
                {prediction.class} ({(prediction.confidence * 100).toFixed(2)}%)
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DetectionResults;
