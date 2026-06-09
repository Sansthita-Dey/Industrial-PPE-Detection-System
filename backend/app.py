from fastapi import FastAPI, UploadFile, File, Form
from ultralytics import YOLO
import shutil
import os

from compliance_engine import check_compliance
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model once when server starts
model = YOLO("runs/detect/train-2/weights/best.pt")


@app.get("/")
def home():
    return {
        "message": "Industrial PPE Detection Backend Running"
    }


@app.get("/departments")
def get_departments():

    return {
        "departments": [
            "Steel Melting Shop",
            "Rolling Mill",
            "Blast Furnace",
            "Coke Oven Plant"
        ]
    }


@app.post("/analyze-image")
async def analyze_image(
    department: str = Form(...),
    file: UploadFile = File(...)
):

    file_path = f"backend/uploads/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    results = model(file_path)

    detected_ppe = []

    for result in results:

        for box in result.boxes:

            class_id = int(box.cls[0])

            class_name = model.names[class_id]

            if class_name not in ["Person", "none"]:
                detected_ppe.append(class_name)

    detected_ppe = list(set(detected_ppe))

    compliance_result = check_compliance(
        department,
        detected_ppe
    )

    return compliance_result