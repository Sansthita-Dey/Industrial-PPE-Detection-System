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
    person_count = 0

    for result in results:

        for box in result.boxes:

            class_id = int(box.cls[0])

            class_name = model.names[class_id]

            if class_name == "Person":
                person_count += 1

            elif class_name != "none":
                detected_ppe.append(class_name)

    detected_ppe = list(set(detected_ppe))

    # ---------- Person Validation ----------

    if person_count == 0:
        return {
            "error": "No person detected. Please upload an image containing one worker."
        }

    if person_count > 1:
        return {
            "error": "Multiple persons detected. Only one worker can be analyzed at a time."
        }

    # ---------- Department Mapping ----------

    department_map = {
        "steel_melting_shop": "Steel Melting Shop",
        "rolling_mill": "Rolling Mill",
        "blast_furnace": "Blast Furnace",
        "coke_oven_plant": "Coke Oven Plant"
    }

    department = department_map.get(
        department,
        department
    )

    # ---------- Compliance Check ----------
    department_mapping = {
        "Steel Melting Shop": "steel_melting_shop",
        "Rolling Mill": "rolling_mill",
        "Blast Furnace": "blast_furnace",
        "Coke Oven Plant": "coke_oven_plant"
    }

    department = department_mapping.get(department, department)
    compliance_result = check_compliance(
        department,
        detected_ppe
    )

    return compliance_result