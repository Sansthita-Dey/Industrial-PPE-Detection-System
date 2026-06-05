from ultralytics import YOLO

from compliance_engine import check_compliance


# Load trained model
model = YOLO("runs/detect/train-2/weights/best.pt")


image_path = input("Enter image path: ")

results = model(image_path)

detected_ppe = []

for result in results:

    for box in result.boxes:

        class_id = int(box.cls[0])

        class_name = model.names[class_id]

        if class_name not in ["Person", "none"]:
            detected_ppe.append(class_name)

detected_ppe = list(set(detected_ppe))

print("\nDetected PPE:")
print(detected_ppe)

department = input("\nEnter department: ")

compliance_result = check_compliance(
    department,
    detected_ppe
)

print("\nCompliance Result:")
print(compliance_result)