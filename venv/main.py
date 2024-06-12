from fastapi import FastAPI, File, UploadFile
from fastapi.responses import FileResponse
import cv2
import numpy as np
import os

app = FastAPI()

def annotate_image(image_path: str, output_path: str):
    image = cv2.imread(image_path)
    annotations = [
        {'label': 'Horizontal Impacted tooth 0.59', 'bbox': (180, 100, 200, 50), 'color': (255, 255, 0)},
        {'label': 'Mesioangular Impacted tooth', 'bbox': (50, 250, 200, 50), 'color': (0, 140, 255)},
        {'label': 'Signs of caries 0.45', 'bbox': (150, 200, 250, 50), 'color': (50, 205, 50)},
        {'label': 'Class 2 cavity filling 0.52', 'bbox': (350, 200, 200, 50), 'color': (255, 228, 196)},
        {'label': 'Class 2 cavity filling', 'bbox': (150, 300, 200, 50), 'color': (255, 255, 224)},
    ]

    def add_annotation(image, annotation):
        label = annotation['label']
        bbox = annotation['bbox']
        color = annotation['color']

        cv2.rectangle(image, (bbox[0], bbox[1]), (bbox[0] + bbox[2], bbox[1] + bbox[3]), color, 2)
        (text_width, text_height), baseline = cv2.getTextSize(label, cv2.FONT_HERSHEY_SIMPLEX, 0.6, 1)
        cv2.rectangle(image, (bbox[0], bbox[1] - text_height - 10), (bbox[0] + text_width, bbox[1]), color, -1)
        cv2.putText(image, label, (bbox[0], bbox[1] - 5), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 0, 0), 2)

    for annotation in annotations:
        add_annotation(image, annotation)

    cv2.imwrite(output_path, image)

@app.post("/annotate-image/")
async def annotate_image_endpoint(file: UploadFile = File(...)):
    input_image_path = f"input_{file.filename}"
    output_image_path = f"output_{file.filename}"
    with open(input_image_path, "wb") as buffer:
        buffer.write(file.file.read())

    annotate_image(input_image_path, output_image_path)
    return FileResponse(output_image_path, media_type="image/jpeg")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
