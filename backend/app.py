from fastapi import FastAPI, UploadFile, File, Form
from ultralytics import YOLO
import shutil
import os
import cv2

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
model = YOLO("../runs/detect/train-2/weights/best.pt")


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

    file_path = f"uploads/{file.filename}"

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


@app.post("/analyze-video")
async def analyze_video(
    department: str = Form(...),
    file: UploadFile = File(...)
):

    # Save uploaded video
    video_path = f"uploads/{file.filename}"

    with open(video_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Open video
    cap = cv2.VideoCapture(video_path)

    frame_count = 0
    detected_ppe = set()

    multiple_person_found = False
    person_found = False

    while True:

        success, frame = cap.read()

        if not success:
            break

        frame_count += 1

        # Analyze every 10th frame
        if frame_count % 10 != 0:
            continue

        results = model(frame)

        current_person_count = 0

        for result in results:

            for box in result.boxes:

                class_id = int(box.cls[0])

                class_name = model.names[class_id]

                # Person detection
                if class_name == "Person":

                    current_person_count += 1
                    person_found = True

                # PPE detection
                elif class_name in [
                    "helmet",
                    "gloves",
                    "vest",
                    "boots",
                    "goggles"
                ]:

                    detected_ppe.add(class_name)

        # Reject if more than one worker appears
        if current_person_count > 1:

            multiple_person_found = True

    cap.release()

    # ---------- Person Validation ----------

    if not person_found:

        return {
            "error": "No person detected. Please upload a video containing one worker."
        }

    if multiple_person_found:

        return {
            "error": "Multiple persons detected. Only one worker can be analyzed at a time."
        }

    # ---------- Department Mapping ----------

    department_mapping = {
        "Steel Melting Shop": "steel_melting_shop",
        "Rolling Mill": "rolling_mill",
        "Blast Furnace": "blast_furnace",
        "Coke Oven Plant": "coke_oven_plant"
    }

    department = department_mapping.get(
        department,
        department
    )

    # ---------- Compliance Check ----------

    compliance_result = check_compliance(
        department,
        list(detected_ppe)
    )

    return compliance_result